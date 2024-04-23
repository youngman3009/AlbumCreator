import express from 'express';
import v1Routes from './routes/v1';

const app = express();
app.use(express.json());

// Define routes

app.use('/api/v1', v1Routes);

export { app };