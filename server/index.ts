import { config } from 'dotenv';
import express, { Application, Request, Response, json } from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import { connect as connectAPI } from './api/connect';
import fileUpload from 'express-fileupload';

config();

const app: Application = express();

app.use(json());
app.use(cors());
app.use(fileUpload());

connectAPI(app, '/api');

app.get('*', function (req: Request, res: Response) {
    res.status(404).send()
})

app.listen(process.env.PORT, () => {
    connect(process.env.DB_CONNECTION_STRING as string, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Server listening on port ${process.env.PORT}`))
        .catch(err => console.log(err))
})
