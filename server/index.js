import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from 'dotenv';
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { connect } from './api/index.js'

dotenv.config({ path: __dirname + '/.env' });

const app = express()

app.use(express.json())
app.use(cors())

connect(app, '/api');

app.get('*', function (req, res) {
    res.status(404).send()
})

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Server listening on port ${process.env.PORT}`))
        .catch(err => console.log(err))
})
