import express from 'express';
import { genreRouter } from './genres';

const v1Router = express.Router();

v1Router.use('/genres', genreRouter);

export default v1Router;
