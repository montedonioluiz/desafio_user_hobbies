// Dependencies
require('dotenv-flow').config();
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export default {
  connect: async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      poolSize: 10,
      useUnifiedTopology: true
    });
  },
  closeDatabase: async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  },
  clearDatabase: async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}