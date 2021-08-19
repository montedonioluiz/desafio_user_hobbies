import { Document } from 'mongoose';


export interface HobbyInterface extends Document {
  experienceLevel: string,
  name: string,
  year: number,
  user: UserInterface
}

export interface UserInterface extends Document {
  name: string,
  hobbies?: HobbyInterface[]
}