import express from 'express';
import { genreRouter } from './genres';
import { artistRouter } from './artists';

const v1Router = express.Router();

v1Router.use('/genres', genreRouter);
v1Router.use('/artists', artistRouter);

export default v1Router;
