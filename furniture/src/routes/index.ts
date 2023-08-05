import express, { Request, Response } from 'express';
import { Furniture } from '../models/furniture';

const router = express.Router();

router.get('/api/furniture', async (req: Request, res: Response) => {
  const furniture = await Furniture.find({
    orderId: undefined,
  });
  res.send(furniture);
});

export { router as indexFurnitureRouter };
