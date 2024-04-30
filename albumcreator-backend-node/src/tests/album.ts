// import * as request from 'supertest';
// import createApp from '../app'; // Path to your app module
// import { getAlbums } from '../controllers/album'; // Path to your controller
// import { Application } from 'express';
// import { Album } from 'models/album';
// import { Mock } from 'typemoq';
// import { BaseEntity } from 'typeorm';

// // Interface for mocking the Album entity
// interface AlbumMock extends BaseEntity {
//   find(): Promise<Album[]>; 
// }

// describe('AlbumController', () => {
//   let app: Application;

//   beforeEach(async () => {
//     app = createApp(); 
//   });

//   it('should return a list of albums', async () => {
//     // Mock Album.find() directly
//     const mockAlbumRepository = Mock.ofType<typeof Album>(); // Mock the Album module
//     mockAlbumRepository.setup(x => x.find) // Note: Accessing find directly
//                       .returns(() => Promise.resolve([
//                         { id: 1, name: 'Album 1' },
//                         { id: 2, name: 'Album 2' }
//                       ]));

//     // Temporarily replace the Album module with the mock
//     jest.mock('../models/album', () => mockAlbumRepository.object);

//     // Make the request
//     const response = await request(app.getServer())
//       .get('/albums'); 

//     // Assertions
//     expect(response.status).toBe(200);
//     // ... rest of your assertions
//   });

//   afterEach(() => {
//     jest.resetModules(); // Reset the mock after each test
//   });
// });