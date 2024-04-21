import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

// Define routes

export { app };