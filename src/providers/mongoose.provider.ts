import * as mongoose from 'mongoose'
import 'dotenv-defaults/config'
import { Provider } from '@nestjs/common'

export const MongooseProvider: Provider = {
  provide: 'MONGOOSE',
  useFactory: async () => {
    const { DB_URI } = process.env
    console.log('Establishing connection with the database.')
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connection established.')
  },
}
