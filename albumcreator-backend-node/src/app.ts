import express from 'express';
import v1Routes from './routes/v1';
import cors from 'cors';
import * as path from 'path';
import { docsRouter } from './routes/docs';

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api-docs', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));
app.use('/api/docs', docsRouter);

app.use('/api/v1', v1Routes);

export { app };