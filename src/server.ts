import mongoose from 'mongoose'
import dotenv from 'dotenv'

import app from './app'

dotenv.config()
const host: any = process.env.MONGODB_URI_LOCAL

mongoose
  .connect(host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(app.get('port'), () => {
      console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
      )
      console.log('  Press CTRL-C to stop\n')
    })
  })
  .catch((err) => err.message)
