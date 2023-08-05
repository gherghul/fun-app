import mongoose, { mongo } from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Furniture } from '../../models/furniture';
import { natsWrapper } from '../../nats-wrapper';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/furniture/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'Axionita 2',
      description: 'O piesa si mai deosebita care va atrage privirile tuturor enoriasilor',
      price: 60000
  })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/furniture/${id}`)
    .send({
      title: 'some title',
      description: 'some description',
      price: 1000
    })
    .expect(401);
});


it('returns a 401 if the user does not own the furniture', async () => {
  const response = await request(app)
    .post('/api/furniture')
    .set('Cookie', global.signin())
    .send({
      title: 'some title',
      description: 'some description',
      furnitureType: 'some furnitureType',
      price: 25
    });

  await request(app)
    .put(`/api/furniture/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'some title',
      description: 'some description',
      price: 1000
    })
    .expect(401);
});
it('returns a 400 if the user try to change furniture type', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/furniture')
    .set('Cookie', cookie)
    .send({
      title: 'some title',
      description: 'some description',
      furnitureType: 'some furniture type',
      price: 1000
    });

  await request(app)
    .put(`/api/furniture/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      description: 'some description',
      furnitureType: 'new furnitureType',
      price: 1000
    })
    .expect(400);

});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/furniture')
    .set('Cookie', cookie)
    .send({
      title: 'some title',
      description: 'some description',
      furnitureType: 'some furniture type',
      price: 1000
    });

  await request(app)
    .put(`/api/furniture/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      description: 'some description',
      price: 1000
    })
    .expect(400);

  await request(app)
  .put(`/api/furniture/${response.body.id}`)
  .set('Cookie', cookie)
  .send({
    title: 'some title',
    description: 'some description',
    price: -1000
  })
  .expect(400);

});


it('it updates the furniture with provided information', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/furniture')
    .set('Cookie', cookie)
    .send({
      title: 'some title',
      description: 'some description',
      furnitureType: 'some furniture type',
      price: 1000
    });

  await request(app)
    .put(`/api/furniture/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      description: 'some description',
      price: 5000
    })
    .expect(200);
  
  const ticketResponse = await request(app)
    .get(`/api/furniture/${response.body.id}`)
    .send();

    expect(ticketResponse.body.title).toEqual('new title');
    expect(ticketResponse.body.price).toEqual(5000);

});

// it('publishes an event', async () => {
//   const cookie = global.signin();
//   const response = await request(app)
//     .post('/api/furniture')
//     .set('Cookie', cookie)
//     .send({
//       title: 'some title',
//       price: 25
//     });

//   await request(app)
//     .put(`/api/furniture/${response.body.id}`)
//     .set('Cookie', cookie)
//     .send({
//       title: 'new title',
//       price: 100
//     })
//     .expect(200);

//   expect(natsWrapper.client.publish).toHaveBeenCalled();
  
// });

// it('rejects updates if the ticket is reserved', async () => {
//   const cookie = global.signin();
//   const response = await request(app)
//     .post('/api/furniture')
//     .set('Cookie', cookie)
//     .send({
//       title: 'some title',
//       price: 25
//     });

//   const ticket = await Ticket.findById(response.body.id);
//   ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
//   await ticket!.save();

//   await request(app)
//     .put(`/api/furniture/${response.body.id}`)
//     .set('Cookie', cookie)
//     .send({
//       title: 'new title',
//       price: 100
//     })
//     .expect(400);

  

// });

