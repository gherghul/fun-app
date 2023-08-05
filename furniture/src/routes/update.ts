import {
  BadRequestError,
  NotAuthorizedError, NotFoundError,
  requireAuth, validateRequest
} from '@ghergtickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Furniture } from '../models/furniture';
const router = express.Router();

router.put(
  '/api/furniture/:id', 
  requireAuth, 
  [
    body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
    body('description')
    .not()
    .isEmpty()
    .withMessage('Description is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0'),
  body('furnitureType')
    .isEmpty(undefined)
    .withMessage('Furniture type cannot be changed.')
  ], 
  validateRequest,
  async (req: Request, res: Response) => {
    const furniture = await Furniture.findById(req.params.id);
    
    if (!furniture) {
      throw new NotFoundError();
    }

    if (furniture.orderId) {
      throw new BadRequestError('Cannot edit a reserved furniture');
    }

    if (furniture.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    furniture.set({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      
    });
    await furniture.save();

    
    res.send(furniture);
    
  }); 


export { router as updateFurnitureRouter };
