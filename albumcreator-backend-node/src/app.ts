import express from 'express';
import v1Routes from './routes/v1';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

// Define routes

app.use('/api/v1', v1Routes);

export { app };