import express from 'express';
import { genreRouter } from './genre';

const v1Router = express.Router();

v1Router.use('/genre', genreRouter);

export default v1Router;
