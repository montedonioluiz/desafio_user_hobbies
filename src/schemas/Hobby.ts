// Dependencies
import { Schema, model } from "mongoose";

// Interfaces
import { HobbyInterface } from '../interfaces';

const HobbySchema = new Schema({
  experienceLevel: String,
  name: String,
  year: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
})

export default model<HobbyInterface>('Hobby', HobbySchema)