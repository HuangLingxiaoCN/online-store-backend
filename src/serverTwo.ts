import mongoose from 'mongoose'

import appTwo from './appTwo'
// import { MONGODB_URI } from './util/secrets'

const mongoUrl = 'mongodb://localhost:27017/product'

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    appTwo.listen(appTwo.get('port'), () => {
      console.log(
        '  App is running at http://localhost:%d in %s mode',
        appTwo.get('port'),
        appTwo.get('env')
      )
      console.log('  Press CTRL-C to stop\n')
    })
  })
  .catch((err) => err.message)
