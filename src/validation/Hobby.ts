// Dependencies
import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

export default {
  create: (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
      name: yup.string()
        .required("Mandatory field: name"),
      experienceLevel: yup.string()
        .required("Mandatory field: experienceLevel")
        .oneOf(["Low", "Medium", "High", "Very High"], ({ values }) => `ExperienceLevel must be one of the following values: ${values}`),
      year: yup.number()
        .required("Mandatory field: year")
        .typeError("Year must be a valid number")
        .integer("Year must be a valid integer")
    });

    return schema.validate(req.body, { abortEarly: false })
      .then(_ => next())
      .catch(err => res.status(400).json({ errors: err.errors }));
  },
}