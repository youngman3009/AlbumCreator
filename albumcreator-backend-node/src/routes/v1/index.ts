import express from 'express';
import { genreRouter } from './genres';
import { artistRouter } from './artists';
import { trackRouter } from './tracks';
import { albumRouter } from './album';

const v1Router = express.Router();

v1Router.use('/genres', genreRouter);
v1Router.use('/artists', artistRouter);
v1Router.use('/tracks', trackRouter);
v1Router.use('/albums', albumRouter);

export default v1Router;
