// Dependencies
import { Request, Response } from 'express';

// Schemas
import User from "../schemas/User";
import Hobby from "../schemas/Hobby";

class HobbyController {
  /**
   * @swagger
   * /user/{userId}/hobby:
   *   post:
   *     tags:
   *     - "Hobby"
   *     summary: Create a new hobby for a user
   *     description: Create a new hobby for a user
   *     parameters:
   *     - in: "body"
   *       name: "Hobby"
   *       required: true
   *       schema:
   *         $ref: "#/definitions/Hobby"
   *     - in: "path"
   *       name: "userId"
   *       description: "ID of hobby's user"
   *       required: true
   *       type: "string"
   *     consumes:
   *     - "application/json"
   *     produces:
   *     - "application/json"
   *     responses:
   *       '201':
   *         description: Success
   *       '400':
   *         description: Bad request; Parameters sent incorrectly
   *       '500':
   *         description: Internal Error
  */
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

  /**
   * @swagger
   * /user/{userId}/hobby/{hobbyId}:
   *   delete:
   *     tags:
   *     - "Hobby"
   *     summary: Delete a hobby
   *     description: Delete a hobby
   *     parameters:
   *     - in: "path"
   *       name: "userId"
   *       description: "ID of user"
   *       required: true
   *       type: "string"
   *     - in: "path"
   *       name: "hobbyId"
   *       description: "ID of hobby to delete"
   *       required: true
   *       type: "string"
   *     responses:
   *       '200':
   *         description: Success
   *       '500':
   *         description: Internal Error
  */
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