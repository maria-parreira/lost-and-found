const request = require('supertest');
const express = require('express');
const app = require('../../../app');
const lostItem = require('../../src/models/LostItem');


jest.mock('../../src/middleware/authMiddleware', () => ({
    protect: (req, res, next) => next(), 
    authorizeAgent: (req, res, next) => next(),
    authorizePassenger: (req, res, next) => next()
}));

describe('LostItem Routes', () => {


    beforeAll(async () => {});
    afterEach(async () => {await lostItem.deleteMany({});});

    describe('GET /api/lost-items', () => {

       it('should return all lost items', async () => {
           //Arrange
            const newItem = new lostItem({
                description: 'Wallet',
                foundDate: '2024-09-18',
                location: 'Park',
                status: 'found'
            });
            await newItem.save();

            //Act
            const response = await request(app)
                .get('/api/lost-items')
                .expect(200);

            //Assert
            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toHaveProperty('description', 'Wallet');
        });

    });

    describe('GET /api/lost-items/:id', () => {

        it('should return a lost item by ID', async () => {

            // Arrange
            const newItem = new lostItem({
                description: 'Phone',
                foundDate: '2024-09-18',
                location: 'Airport',
                status: 'found'
            });
            const savedItem = await newItem.save();
            testItemId = savedItem._id;
            // Act
            const response = await request(app)
                .get(`/api/lost-items/${testItemId}`)
                .expect(200);
            // Assert
            expect(response.body).toHaveProperty('description', 'Phone');
        });

    });

    describe('POST /api/lost-items', () => {

        it('should create a new lost item successfully', async () => {
            //Act
            const response = await request(app)
                .post('/api/lost-items')
                .send({
                    description: 'Bag',
                    foundDate: '2024-09-18',
                    location: 'Airport',
                    status: 'found'
                })
                .expect(201);
            //Assert
            expect(response.body).toHaveProperty('description', 'Bag');
            expect(response.body).toHaveProperty('_id');
        });

        it('should return 400 if required fields are missing', async () => {
            //Act
            const response = await request(app)
                .post('/api/lost-items')
                .send({
                    description: 'Bag'
                })
                .expect(400);
            //Assert
            expect(response.body).toHaveProperty('error', 'Please provide all required fields');
        });
    });

    describe('DELETE /api/lost-items/:id', () => {

        it('should delete a lost item by ID', async () => {
            //Arrange
            const newItem = new lostItem({
                description: 'Keys',
                foundDate: '2024-09-18',
                location: 'Mall',
                status: 'found'
            });
            const savedItem = await newItem.save();
            testItemId = savedItem._id;
            //Act
            const response = await request(app)
                .delete(`/api/lost-items/${testItemId}`)
                .expect(200);
            //Assert
            expect(response.body).toHaveProperty('message', 'Lost item successfully deleted');
        });
    });

    describe('GET /api/passenger-lost-items', () => {
        it('should return lost items based on search criteria', async () => {
            //Arrange
            const newItem = new lostItem({
                description: 'Backpack',
                foundDate: '2024-09-18',
                location: 'Station',
                status: 'found'
            });
            await newItem.save();
            //Act
            const response = await request(app)
                .get('/api/passenger-lost-items')
                .query({ description: 'Backpack' })
                .expect(200);
            //Assert
            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toHaveProperty('description', 'Backpack');
        });
    });
});
