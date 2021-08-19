// Dependencies
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

class App {
  public express: express.Application;

  constructor() {
    this.express = express()

    this.middlewares()
    // this.database()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database(): void {
    mongoose.connect(`mongodb://${process.env.MONGO_URL}`, {
      useNewUrlParser: true
    })
  }

  private routes(): void {
    this.express.get('/', (req, res) => {
      return res.send('Hello, World!')
    })
    // this.express.use()
  }
}

export default new App().express;