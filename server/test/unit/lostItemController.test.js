const lostItemController = require('../../src/controllers/LostItemController');
const lostItem = require('../../src/models/LostItem');

jest.mock('../../src/models/LostItem');


describe('LostItemController', () => {

    describe('getAllLostItems', () => {
        it('should return all lost items', async () => {
            const mockItems = [
                { _id: '1', description: 'Wallet' },
                { _id: '2', description: 'Phone' }
            ];
            lostItem.find.mockResolvedValue(mockItems);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.getAllLostItems(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockItems);
        });

        it('should return 500 if there is an error fetching lost items', async () => {
            lostItem.find.mockRejectedValue(new Error('Database error'));

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.getAllLostItems(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching lost items' });
        });
    });

    describe('getItemById', () => {
        it('should return a lost item by ID', async () => {
            const mockItem = { _id: '1', description: 'Phone' };
            lostItem.findById.mockResolvedValue(mockItem);

            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.getItemById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockItem);
        });

        it('should return 404 if lost item not found by ID', async () => {
            lostItem.findById.mockResolvedValue(null);

            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.getItemById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Lost item not found' });
        });

        it('should return 500 if there is an error fetching the lost item by ID', async () => {
            lostItem.findById.mockRejectedValue(new Error('Database error'));

            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.getItemById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching the lost item' });
        });
    });

    describe('createLostItem', () => {
        it('should create a new lost item successfully', async () => {
            const newItem = { description: 'Bag', foundDate: '2024-09-18', location: 'Airport', status: 'Lost' };
            const savedItem = { ...newItem, _id: '1' };
            lostItem.prototype.save.mockResolvedValue(savedItem);

            const req = { body: newItem };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.createLostItem(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(savedItem);
        });

        it('should return 400 if required fields are missing', async () => {
            const req = { body: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.createLostItem(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Please provide all required fields' });
        });

        it('should return 500 if there is an error creating the lost item', async () => {
            lostItem.prototype.save.mockRejectedValue(new Error('Database error'));

            const req = { body: { description: 'Bag' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.createLostItem(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error creating the lost item' });
        });
    });

    describe('deleteLostItem', () => {
        it('should delete a lost item by ID', async () => {
            lostItem.findByIdAndDelete.mockResolvedValue({});

            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.deleteLostItem(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Lost item successfully deleted' });
        });

        it('should return 404 if lost item not found for deletion', async () => {
            lostItem.findByIdAndDelete.mockResolvedValue(null);

            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.deleteLostItem(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Lost item not found' });
        });

        it('should return 500 if there is an error deleting the lost item', async () => {
            lostItem.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.deleteLostItem(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting the lost item' });
        });
    });

    describe('searchLostItems', () => {
        it('should return lost items based on search criteria', async () => {
            const query = { description: 'Bag' };
            const mockItems = [{ _id: '1', description: 'Bag', foundDate: '2024-09-18', location: 'Airport', status: 'Lost' }];
            lostItem.find.mockResolvedValue(mockItems);

            const req = { query };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.searchLostItems(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockItems);
        });

        it('should return 500 if there is an error searching for lost items', async () => {
            lostItem.find.mockRejectedValue(new Error('Database error'));

            const req = { query: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await lostItemController.searchLostItems(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error searching for lost items' });
        });
    });
});
