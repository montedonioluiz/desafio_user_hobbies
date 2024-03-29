// Dependencies
import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

export default {
  create: (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
      name: yup.string()
        .required("Mandatory field: name"),
    });

    return schema.validate(req.body, { abortEarly: false })
      .then(_ => next())
      .catch(err => res.status(400).json({ errors: err.errors }));
  },
}