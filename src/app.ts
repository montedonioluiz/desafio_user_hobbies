require('dotenv').config();

// Dependencies
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

// Routes
import userRoutes from './routes/User';

class App {
  public express: express.Application;

  constructor() {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database(): void {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  private routes(): void {
    this.express.get('/', (req, res) => {
      return res.send('Hello, World!')
    })
    
    this.express.use('/user', userRoutes);
  }
}

export default new App().express;