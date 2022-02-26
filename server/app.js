const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./src/routes/routes')
const  { errorHandler } = require('./src/middleware/errors')

dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())

app.use('/', router)
app.use((req, res, next) => {
    next('Page not found')
})

const port = process.env.PORT || 8000
app.use(errorHandler)

app.listen(port, () => console.log('Server listening'))