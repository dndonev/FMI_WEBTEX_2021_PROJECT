// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath('.env');
// const __dirname = dirname(__filename);

import * as dotenv from 'dotenv';
import express from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import { connect as connectAPI } from './api/connect.js'

dotenv.config();

const app: express.Application = express();

app.use(express.json())
app.use(cors())

connectAPI(app, '/api');

app.get('*', function (req: express.Request, res: express.Response) {
    res.status(404).send()
})

app.listen(process.env.PORT, () => {
    connect(process.env.DB_CONNECTION_STRING as string, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Server listening on port ${process.env.PORT}`))
        .catch(err => console.log(err))
})
