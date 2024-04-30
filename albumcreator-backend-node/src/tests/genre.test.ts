import { Request, Response } from 'express';
import { Genre } from '../models/genre';
import { getGenres } from '../controllers/genre';

jest.mock('typeorm', () => {
  const actualTypeOrm = jest.requireActual('typeorm');

  return {
      ...actualTypeOrm,
      Entity: jest.fn().mockImplementation(() => ({
          find: jest.fn().mockResolvedValue([
              { id: 1, name: 'Rock' },
              { id: 2, name: 'Pop' },
          ]),
      })),
  };
});

describe('getGenres', () => {
  it('should successfully return a list of genres', async () => {
    const mockRequest = {} as Request; 
    const mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(), 
    } as unknown as Response;

    await getGenres(mockRequest, mockResponse);

    expect(Genre.find).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([
      { id: 1, name: 'Rock' },
      { id: 2, name: 'Pop' },
    ]);
  });
});