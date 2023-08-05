import request from 'supertest';
import { app } from '../../app';
import { Furniture } from '../../models/furniture';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening to /api/furniture for post requests', async () => {
  const response = await request(app)
    .post('/api/furniture')
    .send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app)
    .post('/api/furniture')
    .send({})
    .expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/furniture')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/furniture')
    .set('Cookie', global.signin())
    .send({
      title: '',
      description: 'some description',
      furnitureType: 'some furniture type',
      price: 1000
    })
    .expect(400);

    

});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/furniture')
    .set('Cookie', global.signin())
    .send({
      title: 'some title',
      description: 'some description',
      furnitureType: 'some furniture type',
      price: -1000
    })
    .expect(400);

  await request(app)
    .post('/api/furniture')
    .set('Cookie', global.signin())
    .send({
      title: 'some title'
    })
    .expect(400);

});

it('creates a furniture with valid inputs', async () => {
  let furniture = await Furniture.find({});
  expect(furniture.length).toEqual(0);
  await request(app)
    .post('/api/furniture')
    .set('Cookie', global.signin())
    .send({
      title: 'some title',
      description: 'some description',
      furnitureType: 'some furniture type',
      price: 1000
    })
    .expect(201);

  furniture = await Furniture.find({});
  expect(furniture.length).toEqual(1);
  expect(furniture[0].price).toEqual(1000);
  expect(furniture[0].title).toEqual('some title');
});
