import { body } from 'express-validator/check';
import toTaxBracketModel from './mappers/taxBracket/toTaxBracketModel';
import handleError from './errorHandler';

export const validateTaxBracket = () => [
  body('lowerIncomeRange', 'Lower income range is required').isInt({ min: 0 }),
  body('upperIncomeRange', 'Upper income range is required').isInt({ min: 0 }),
  body('taxRate', 'Tax rate (between 0 and 1) is required').isFloat({ min: 0, max: 1 }),
];

export const addTaxBracket = (incomeTaxService, incomeTaxBracketRepository) => async (req, res) => {
  const errors = await req.getValidationResult();

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const id = await incomeTaxService.addTaxBracket(incomeTaxBracketRepository, req.body);

    res
      .status(201)
      .append('link', `${req.originalUrl}/${id}`)
      .send();
  } catch (e) {
    handleError(req, res, e);
  }
};

export const getTaxBracket = (incomeTaxService, incomeTaxBracketRepository) => async (req, res) => {
  try {
    const taxBracket = await incomeTaxService.getTaxBracket(incomeTaxBracketRepository, req.params.id);
    res
      .status(200)
      .json(toTaxBracketModel(taxBracket));
  } catch (e) {
    handleError(req, res, e);
  }
};

export const getAllTaxBrackets = (incomeTaxService, incomeTaxBracketRepository) => async (req, res) => {
  try {
    const taxBrackets = await incomeTaxService.getAllTaxBrackets(incomeTaxBracketRepository);
    res
      .status(200)
      .json(taxBrackets.map(toTaxBracketModel));
  } catch (e) {
    handleError(req, res, e);
  }
};

export const deleteTaxBracket = (incomeTaxService, incomeTaxBracketRepository) => async (req, res) => {
  try {
    await incomeTaxService.deleteTaxBracket(incomeTaxBracketRepository, req.params.id);
    res
      .status(200)
      .append('link', '/income/taxbrackets')
      .send();
  } catch (e) {
    handleError(req, res, e);
  }
};
