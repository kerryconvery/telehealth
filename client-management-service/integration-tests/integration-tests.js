import fetch from 'node-fetch';
import config from './../config.json';

const baseUrl = config.env.sit;

const cleanDatabase = async () => {
  const taxbrackets = await fetch(`${baseUrl}/income/taxbrackets`).then(res => res.json());

  const requests = taxbrackets.map(taxbracket => (
    fetch(`${baseUrl}${taxbracket._links.self.href}`, { method: 'delete' })
  ));

  await Promise.all(requests);
};

describe('Tax Brackets', () => {
  beforeEach(cleanDatabase);

  it('should add a tax bracket and get back a link to the newly added tax bracket', async () => {
    const taxbracket = {
      lowerIncomeRange: 0,
      upperIncomeRange: 100,
      taxRate: 0,
    };

    const response = await fetch(`${baseUrl}/income/taxbrackets`, {
      method: 'post',
      body: JSON.stringify(taxbracket),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status).toBe(201);
    expect(response.headers.get('link')).toBe('/income/taxbrackets/00000');
  });

  it('should add a tax bracket and get the tax bracket back again', async () => {
    const newTaxbracket = {
      lowerIncomeRange: 0,
      upperIncomeRange: 100,
      taxRate: 0,
    };

    const postResponse = await fetch(`${baseUrl}/income/taxbrackets`, {
      method: 'post',
      body: JSON.stringify(newTaxbracket),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(`${baseUrl}${postResponse.headers.get('link')}`);
    const taxbracket = await response.json();

    expect(response.status).toBe(200);
    expect(taxbracket).toMatchObject(newTaxbracket);
  });

  it('should add a tax bracket and get a list of tax brackets', async () => {
    const taxbracket = {
      lowerIncomeRange: 0,
      upperIncomeRange: 100,
      taxRate: 0,
    };

    await fetch(`${baseUrl}/income/taxbrackets`, {
      method: 'post',
      body: JSON.stringify(taxbracket),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(`${baseUrl}/income/taxbrackets`);
    const taxbrackets = await response.json();

    expect(response.status).toBe(200);
    expect(taxbrackets.length).toBe(1);
    expect(taxbrackets[0]).toMatchObject(taxbracket);
  });

  it('should delete a tax bracket', async () => {
    const taxbracket = {
      lowerIncomeRange: 0,
      upperIncomeRange: 100,
      taxRate: 0,
    };

    const postResponse = await fetch(`${baseUrl}/income/taxbrackets`, {
      method: 'post',
      body: JSON.stringify(taxbracket),
      headers: { 'Content-Type': 'application/json' },
    });

    const deleteResponse = await fetch(`${baseUrl}${postResponse.headers.get('link')}`, { method: 'delete' });

    expect(deleteResponse.status).toBe(200);
  });

  it('should return a 409 if we try to add a tax breaket for a tax rate that already exists', async () => {
    const taxbracket = {
      lowerIncomeRange: 0,
      upperIncomeRange: 100,
      taxRate: 0.09,
    };

    await fetch(`${baseUrl}/income/taxbrackets`, {
      method: 'post',
      body: JSON.stringify(taxbracket),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await fetch(`${baseUrl}/income/taxbrackets`, {
      method: 'post',
      body: JSON.stringify(taxbracket),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status).toBe(409);
    expect(response.headers.get('link')).toBe('/income/taxbrackets/00900');
  });

  it('should return a 404 if we try to get a tax breaket that does not exist', async () => {
    const response = await fetch(`${baseUrl}/income/taxbrackets/00000`);

    expect(response.status).toBe(404);
  });

  it('should return a 404 if we try to delete tax breaket that does not exist', async () => {
    const response = await fetch(`${baseUrl}/income/taxbrackets/00000`, { method: 'delete' });

    expect(response.status).toBe(404);
  });

  it('should return a 200 and an empty list try to get tax breakets from an empty database', async () => {
    const response = await fetch(`${baseUrl}/income/taxbrackets`);
    const taxbrackets = await response.json();

    expect(response.status).toBe(200);
    expect(taxbrackets).toEqual([]);
  });
});

describe('Generate payslips', () => {
  const taxbrackets = [
    {
      lowerIncomeRange: 0,
      upperIncomeRange: 18200,
      taxRate: 0,
    },
    {
      lowerIncomeRange: 18201,
      upperIncomeRange: 37000,
      taxRate: 0.19,
    },
    {
      lowerIncomeRange: 37001,
      upperIncomeRange: 80000,
      taxRate: 0.325,
    },
    {
      lowerIncomeRange: 80001,
      upperIncomeRange: 180000,
      taxRate: 0.37,
    },
    {
      lowerIncomeRange: 180001,
      upperIncomeRange: 200000,
      taxRate: 0.45,
    },
  ];

  const addTaxBrackets = async () => {
    await cleanDatabase();

    const requests = taxbrackets.map(taxbracket => (
      fetch(`${baseUrl}/income/taxbrackets`, {
        method: 'post',
        body: JSON.stringify(taxbracket),
        headers: { 'Content-Type': 'application/json' },
      })
    ));

    await Promise.all(requests);
  };

  beforeAll(addTaxBrackets);

  it('should return 200 and a payslip when there is at least one matching tax bracket for the salary amount', async () => {
    const data = {
      employees: [
        {
          firstName: 'John',
          lastName: 'Smith',
          annualSalary: 60050,
          superRate: 0.09,
          paymentStartDate: '01 March - 31 March',
        },
      ],
    };

    const payslipResponse = await fetch(`${baseUrl}/payslips/bulk`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    const payslips = await payslipResponse.json();

    expect(payslipResponse.status).toBe(200);
    expect(payslips[0]).toEqual({
      firstName: data.employees[0].firstName,
      lastName: data.employees[0].lastName,
      payPeriod: data.employees[0].paymentStartDate,
      grossIncome: 5004,
      incomeTax: 922,
      netIncome: 4082,
      superContribution: 450,
    });
  });

  it('should return 200 and a payslip when the first tax bracket matches the annual salary amount', async () => {
    const data = {
      employees: [
        {
          firstName: 'John',
          lastName: 'Smith',
          annualSalary: 10000,
          superRate: 0,
          paymentStartDate: '01 March - 31 March',
        },
      ],
    };

    const payslipResponse = await fetch(`${baseUrl}/payslips/bulk`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    const payslips = await payslipResponse.json();

    expect(payslipResponse.status).toBe(200);
    expect(payslips[0]).toEqual({
      firstName: data.employees[0].firstName,
      lastName: data.employees[0].lastName,
      payPeriod: data.employees[0].paymentStartDate,
      grossIncome: 833,
      incomeTax: 0,
      netIncome: 833,
      superContribution: 0,
    });
  });

  it('should return 400 when there are no tax brackets defined', async () => {
    await cleanDatabase();

    const data = {
      employees: [
        {
          firstName: 'John',
          lastName: 'Smith',
          annualSalary: 1000000,
          superRate: 0,
          paymentStartDate: '01 March - 31 March',
        },
      ],
    };

    const response = await fetch(`${baseUrl}/payslips/bulk`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status).toBe(400);
  });
});
