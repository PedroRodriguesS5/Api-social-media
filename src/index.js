import express from 'express';
import routes from './routes/routes.js';
import Cors from 'cors'

const app = express();

app.use(Cors());
app.use(express.json());

app.use(routes);

app.listen(3000);

