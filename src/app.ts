// Dependencies
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

// Routes
import userRoutes from './routes/User'

class App {
  public express: express.Application;

  constructor() {
    this.express = express()

    this.middlewares()
    this.swagger()
    this.routes()

    if (process.env.NODE_ENV !== 'test')
      this.database()
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
      .then(_ => console.log("Mongodb connection setup successfully"))
      .catch(err => console.log('Error while connecting to Mongodb: ', err))
  }

  private routes(): void {
    this.express.get('/', (req, res) => {
      return res.send('Hello, World!')
    })

    this.express.use('/user', userRoutes)
  }

  private swagger(): void {
    const options: swaggerJSDoc.Options = {
      swaggerDefinition: {
        info: {
          title: "Paketá NodeJS Challenge API",
          description: "Documentation auto-generated using the swagger-jsdoc and swagger-ui-express NPM libs.",
          contact: {
            name: "Luiz Oliveira Montedônio"
          },
          servers: [`http://localhost:${process.env.PORT || 8000}`],
          version: "1.0.0"
        },
        tags: [
          {
            name: "User",
            description: "User routes"
          },
          {
            name: "Hobby",
            description: "Hobby routes"
          },
        ],
        definitions: {
          User: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                required: true,
              },
            }
          },
          Hobby: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                required: true,
              },
              experienceLevel: {
                type: 'string',
                required: true,
                enum: ["Low", "Medium", "High", "Very High"]
              },
              year: {
                type: 'integer',
                format: 'int64',
                required: true,
              },
            }
          },
        }
      },
      apis: ["./src/controllers/*.ts"]
    }

    this.express.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)))
  }
}

export default new App().express;