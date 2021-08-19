// Dependencies
import { Request, Response } from 'express';

// Schemas
import User from "../schemas/User";

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    const user = await User.create(req.body)
      .catch(err => {
        console.log("Create user error: ", err)
        return res.status(500).json({ message: "Error while creating the user" })
      });

    return res.status(201).json(user);
  }
}

export default new UserController();