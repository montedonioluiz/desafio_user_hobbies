// Dependencies
import { Schema, model } from "mongoose";

// Interfaces
import { UserInterface } from '../interfaces';

const UserSchema = new Schema({
  name: String,
  hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobby' }],
}, {
  timestamps: true
})

export default model<UserInterface>('User', UserSchema)