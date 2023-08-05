import { currentUser, errorHandler, NotFoundError } from '@ghergtickets/common';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { indexFurnitureRouter } from './routes';
import { createFurnitureRouter } from './routes/new';
import { showFurnitureRouter } from './routes/show';
import { updateFurnitureRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUser);

app.use(indexFurnitureRouter);
app.use(createFurnitureRouter);
app.use(showFurnitureRouter);
app.use(updateFurnitureRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);


export { app };


