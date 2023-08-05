import { Furniture } from "../furniture";

it('implements optimistic concurrency control', async () => {
  // create an instance of a Furniture
  const furniture = Furniture.build({
    title: 'some title',
    description: 'some description',
    furnitureType: 'some furniture type',
    price: 1000,
    userId: '123'
  });

  // save the Furniture to the databse
  await furniture.save();

  // fetch the Furniture twice
  const firstInsance = await Furniture.findById(furniture.id);
  const secondInsance = await Furniture.findById(furniture.id);
  
  // make two separate changes to the Furniture we fetched
  firstInsance!.set({ price: 10 });
  secondInsance!.set({ price: 15 });
  
  // save the first fetched Furniture
  await firstInsance!.save();

  // save the second fetched Furniture and expect an error
  try{
    await secondInsance!.save();
  } catch(err) {
    return;
  }

  throw new Error('Should not reach this point');

});


it('increments the version number on multiple saves',async () => {
  const furniture = Furniture.build({
    title: 'some title',
    description: 'some description',
    furnitureType: 'some furniture type',
    price: 1000,
    userId: '123'
  });

  await furniture.save();
  expect(furniture.version).toEqual(0);
  await furniture.save();
  expect(furniture.version).toEqual(1);
  await furniture.save();
  expect(furniture.version).toEqual(2);
});