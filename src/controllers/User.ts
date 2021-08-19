// Dependencies
import { Request, Response } from 'express';

// Schemas
import User from "../schemas/User";

class UserController {
  /**
   * @swagger
   * /user:
   *   post:
   *     tags:
   *     - "User"
   *     summary: Create a new user
   *     description: Create a new user
   *     parameters:
   *     - in: "body"
   *       name: "User"
   *       required: true
   *       schema:
   *         $ref: "#/definitions/User"
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
    const user = await User.create(req.body)
      .catch(err => {
        console.log("Create user error: ", err)
        return res.status(500).json({ message: "Error while creating the user" })
      });

    return res.status(201).json(user);
  }

  /**
   * @swagger
   * /user:
   *   get:
   *     tags:
   *     - "User"
   *     summary: Retrieve all users
   *     description: Retrieve all users
   *     produces:
   *     - "application/json"
   *     responses:
   *       '200':
   *         description: Success
   *       '500':
   *         description: Internal Error
  */
  public async read(req: Request, res: Response): Promise<Response> {
    const users = await User.find().populate('hobbies')
      .catch(err => {
        console.log("Getall user error: ", err)
        return res.status(500).json({ message: "Error while fetching users" })
      });

    return res.json(users);
  }

  /**
   * @swagger
   * /user/{userId}:
   *   delete:
   *     tags:
   *     - "User"
   *     summary: Delete a user
   *     description: Delete a user
   *     parameters:
   *     - name: "userId"
   *       in: "path"
   *       description: "ID of user to delete"
   *       required: true
   *       type: "integer"
   *       format: "int64"
   *     responses:
   *       '200':
   *         description: Success
   *       '500':
   *         description: Internal Error
  */
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