import { UniqueKeyConflictError, NotFoundError, BadRequestError } from '../../exceptions/exceptions';

const handleError = (req, res, error) => {
  if (error instanceof UniqueKeyConflictError) {
    res
      .status(409)
      .append('link', `${req.originalUrl}/${error.resourceId}`)
      .send(error.message);
    return;
  }

  if (error instanceof NotFoundError) {
    res.status(404).send(error.message);
    return;
  }

  if (error instanceof BadRequestError) {
    res.status(400).send(error.message);
    return;
  }

  res.status(500).send('An internal error occurred.  Please contact the site administrator');
};

export default handleError;
