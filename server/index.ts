import { config } from 'dotenv';
import { join } from 'path'
import express, { Application, Request, Response, json } from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import { connect as connectAPI } from './api/connect'

config();

const app: Application = express();

app.use(json())
app.use(cors())

connectAPI(app, '/api');

app.get('*', function (req: Request, res: Response) {
    res.status(404).send()
})

app.listen(process.env.PORT, () => {
    connect(process.env.DB_CONNECTION_STRING as string, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Server listening on port ${process.env.PORT}`))
        .catch(err => console.log(err))
})
