import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the furniture is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .get(`/api/furniture/${id}`)
    .send()
    .expect(404);
  
});


it('returns the furniture if the furniture is found', async () => {
  const title = 'some title';
  const description = 'some description';
  const furnitureType = 'some furnitureType';
  const price = 1000;

  const response = await request(app)
    .post('/api/furniture')
    .set('Cookie', global.signin())
    .send({
      title, description, furnitureType, price
    })
    .expect(201);

  const furnitureResponse = await request(app)
    .get(`/api/furniture/${response.body.id}`)
    .send()
    .expect(200);

    expect(furnitureResponse.body.title).toEqual(title);
    expect(furnitureResponse.body.description).toEqual(description);
    expect(furnitureResponse.body.furnitureType).toEqual(furnitureType);
    expect(furnitureResponse.body.price).toEqual(price);

});