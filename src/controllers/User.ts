// Dependencies
import { Request, Response } from 'express';

// Schemas
import User from "../schemas/User";

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user = await User.create(req.body)
      .catch(err => {
        console.log("Create user error: ", err)
        return res.status(500).json({ message: "Error while creating the user" })
      });

    return res.status(201).json(user);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const users = await User.find().populate('hobbies')
      .catch(err => {
        console.log("Getall user error: ", err)
        return res.status(500).json({ message: "Error while fetching users" })
      });

    return res.json(users);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    await User.findByIdAndDelete(req.params.userId)
      .catch(err => {
        console.log("Delete user error: ", err)
        return res.status(500).json({ message: "Error while removing the user" })
      });

    return res.send();
  }
}

export default new UserController();