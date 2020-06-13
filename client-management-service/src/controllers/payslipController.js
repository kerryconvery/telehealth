import { body } from 'express-validator/check';
import handleError from './errorHandler';
import toPayslipsModel from './mappers/payslip/toPayslipModel';
import payslipCalculator from '../../payslipCalculators/payslipCalculator';

export const validateEmployee = () => [
  body('employees', 'Employees is required and must be an array with atleast 1 item').isArray().isLength({ min: 1 }),
  body('employees.*.firstName', 'First name is required').isString(),
  body('employees.*.lastName', 'Last name is required').isString(),
  body('employees.*.annualSalary', 'Annual salary is required').isInt({ min: 0 }),
  body('employees.*.superRate', 'Super rate (between 0 and 0.5) is required').isFloat({ min: 0, max: 0.5 }),
  body('employees.*.paymentStartDate', 'Payment start date required').isString(),
];

export const generatePayslips = (payslipService, incomeTaxBracketRepository) => async (req, res) => {
  const errors = await req.getValidationResult();

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const payslipData = await payslipService.generatePayslips(incomeTaxBracketRepository, payslipCalculator, req.body.employees);

    res
      .status(200)
      .send(toPayslipsModel(payslipData));
  } catch (e) {
    handleError(req, res, e);
  }
};
