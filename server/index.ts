import { config } from 'dotenv';
import express, { Application, Request, Response, json } from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import { join } from 'path'
import { connect as connectAPI } from './api/connect';

config();

const app: Application = express();

app.use(json());
app.use(cors());

const feBuild = join(process.cwd(), '../', 'client', 'build');
const client = join(feBuild);
app.use(express.static(client));

connectAPI(app, '/api');

app.get('/', (req, res) => {
    res.sendFile(join(feBuild, '/index.html'));
});

app.get('/*', (req, res) => {
    res.sendFile(join(feBuild, '/index.html'));
});

app.get('*', function (req: Request, res: Response) {
    res.status(404).send()
})


app.listen(process.env.PORT || 3001, () => {
    connect(process.env.DB_CONNECTION_STRING as string, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Server listening on port ${process.env.PORT}`))
        .catch(err => console.log(err))
})
