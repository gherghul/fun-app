import { requireAuth, validateRequest } from '@ghergtickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
// import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { Furniture } from '../models/furniture';
// import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/furniture', requireAuth, [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
    body('description')
    .not()
    .isEmpty()
    .withMessage('Description is required'),
    body('furnitureType')
    .not()
    .isEmpty()
    .withMessage('Furniture type is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0')  
], validateRequest, async (req: Request, res: Response) => {

  const { title, price, description, furnitureType } = req.body;

  const furniture = Furniture.build({
    title,
    description,
    price,
    furnitureType,
    userId: req.currentUser!.id
  });
  await furniture.save();

  res.status(201).send(furniture)
  
});


export { router as createFurnitureRouter };
