import request from 'supertest';
import { app } from '../../app';

const createFurniture = () => {
  return request(app)
  .post('/api/furniture')
  .set('Cookie', global.signin())
  .send({
    title: 'Axionita',
    description: 'O piesa deosebita care va atrage privirile tuturor enoriasilor',
    furnitureType: 'Mobilier bisericesc',
    price: 50000
});
  
}

it('can fetch a list of tickets', async () => {
  await createFurniture();
  await createFurniture();
  await createFurniture();

  const response = await request(app)
    .get('/api/furniture')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});

