import { NotFoundError } from '@ghergtickets/common';
import express, { Request, Response } from 'express';
import { Furniture } from '../models/furniture';

const router = express.Router();

router.get('/api/furniture/:id', async (req: Request, res: Response) => {
  const furniture = await Furniture.findById(req.params.id);

  if (!furniture) {
    throw new NotFoundError();
  }

  res.send(furniture);
});


export { router as showFurnitureRouter };
