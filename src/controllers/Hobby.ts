// Dependencies
import { Request, Response } from 'express';

// Schemas
import User from "../schemas/User";
import Hobby from "../schemas/Hobby";

class HobbyController {
  public async create(req: Request, res: Response): Promise<Response> {
    const hobby = await Hobby.create({ ...req.body, user: req.params.userId })
      .then(async hobby => {
        const user = await User.findOne({ _id: req.params.userId })
        await user.update({ hobbies: [...user.hobbies, hobby._id] })
        return hobby
      })
      .catch(err => {
        console.log("Create hobby error: ", err)
        return res.status(500).json({ message: "Error while creating the hobby" })
      });

    return res.status(201).json(hobby);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    await Hobby.findByIdAndDelete(req.params.hobbyId)
      .catch(err => {
        console.log("Delete hobby error: ", err)
        return res.status(500).json({ message: "Error while removing the hobby" })
      });

    return res.send();
  }
}

export default new HobbyController();