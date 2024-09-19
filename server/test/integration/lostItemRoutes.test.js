const request = require('supertest');
const express = require('express');
const app = require('../../../app');
const lostItem = require('../../src/models/LostItem');


// Mocks para middleware de autenticação
jest.mock('../../src/middleware/authMiddleware', () => ({
    protect: (req, res, next) => next(), 
    authorizeAgent: (req, res, next) => next(),
    authorizePassenger: (req, res, next) => next()
}));

describe('LostItem Routes', () => {
    let testItemId;

    beforeAll(async () => {
        // Configuração inicial se necessário
    });

    afterEach(async () => {
        // Limpar dados entre os testes
        await lostItem.deleteMany({});
    });

    describe('GET /api/lost-items', () => {
        it('should return all lost items', async () => {
            const newItem = new LostItem({
                description: 'Wallet',
                foundDate: '2024-09-18',
                location: 'Park',
                status: 'found'
            });
            await newItem.save();

            const response = await request(app)
                .get('/api/lost-items')
                .expect(200);

            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toHaveProperty('description', 'Wallet');
        });
    });

    describe('GET /api/lost-items/:id', () => {
        it('should return a lost item by ID', async () => {
            const newItem = new LostItem({
                description: 'Phone',
                foundDate: '2024-09-18',
                location: 'Airport',
                status: 'found'
            });
            const savedItem = await newItem.save();
            testItemId = savedItem._id;

            const response = await request(app)
                .get(`/api/lost-items/${testItemId}`)
                .expect(200);

            expect(response.body).toHaveProperty('description', 'Phone');
        });
        /*
        it('should return 404 if lost item not found by ID', async () => {
            const response = await request(app)
                .get('/api/lost-items/')
                .expect(404);

            expect(response.body).toHaveProperty('error', 'Lost item not found');
        });

         */
    });

    describe('POST /api/lost-items', () => {
        it('should create a new lost item successfully', async () => {
            const response = await request(app)
                .post('/api/lost-items')
                .send({
                    description: 'Bag',
                    foundDate: '2024-09-18',
                    location: 'Airport',
                    status: 'found'
                })
                .expect(201);

            expect(response.body).toHaveProperty('description', 'Bag');
            expect(response.body).toHaveProperty('_id');
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await request(app)
                .post('/api/lost-items')
                .send({
                    description: 'Bag'
                    // Missing other required fields
                })
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Please provide all required fields');
        });
    });

    describe('DELETE /api/lost-items/:id', () => {
        it('should delete a lost item by ID', async () => {
            const newItem = new LostItem({
                description: 'Keys',
                foundDate: '2024-09-18',
                location: 'Mall',
                status: 'found'
            });
            const savedItem = await newItem.save();
            testItemId = savedItem._id;

            const response = await request(app)
                .delete(`/api/lost-items/${testItemId}`)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'Lost item successfully deleted');
        });
/*
        it('should return 404 if lost item not found for deletion', async () => {
            const response = await request(app)
                .delete('/api/lost-items/')
                .expect(404);

            expect(response.body).toHaveProperty('error', 'Lost item not found');
        });

 */
    });

    describe('GET /api/passenger-lost-items', () => {
        it('should return lost items based on search criteria', async () => {
            const newItem = new LostItem({
                description: 'Backpack',
                foundDate: '2024-09-18',
                location: 'Station',
                status: 'found'
            });
            await newItem.save();

            const response = await request(app)
                .get('/api/passenger-lost-items')
                .query({ description: 'Backpack' })
                .expect(200);

            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toHaveProperty('description', 'Backpack');
        });
        /*
        it('should return 500 if there is an error searching for lost items', async () => {

            const response = await request(app)
                .get('/api/passenger-lost-items')
                .query({ description: 'Nonexistent' })
                .expect(500);

            expect(response.body).toHaveProperty('error', 'Error searching for lost items');
        });

         */
    });
});
