
const request = require('supertest');
const createServer = require('../server');
const { Todo } = require('../todos/model');

let server;

describe('/api/todos', () => {
    beforeAll(() => {
        server = createServer();
    })

    afterEach(async () => {
        await Todo.deleteMany({});
    })

    describe('/post', () => {
         it('should respond with validation error', async () => {
            const data = {
                'active': true
            };
            const response = await request(server).post('/api/todos').send(data);
            expect(response.status).toBe(400);
        })

        it('should respond with 201 success', async () => {
            const data = {
                'title': 'Test todo title',
            };
            const response = await request(server).post('/api/todos').send(data);
            expect(response.status).toBe(201);
            expect(response.body).toMatchObject(data);
        })
    })

    describe('/get', () => {
        it('should return with a 200 status', async () => {
            await Todo.collection.insertMany([
                {title: 'Task1'},
                {title: 'Task2'}
            ]);
            const response = await request(server).get('/api/todos');
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
            expect(response.body.some(t => t.hasOwnProperty('title'))).toBeTruthy()
        })
    })

    describe('/put/:id', () => {
        it('should return a 400 status with an invalid id', async () => {
            const response = await request(server).put(`/api/todos/${1}`);
            expect(response.status).toBe(400);
        })

        it('should return a 400 status with an invalid payload', async () => {
            const newTodo = await (new Todo({title: 'Test1'})).save();
            const response = await request(server).put(`/api/todos/${newTodo._id}`).send({
                time: '10:45Am',
            });
            expect(response.status).toBe(400);
        })

        it('should return a 404 status with absent id', async () => {
            const newTodo = await (new Todo({title: 'test2'})).save();
            const id = newTodo._id;
            await Todo.deleteOne({ _id: id });

            const response = await request(server).put(`/api/todos/${id}`).send({ title: 'Test2 updated' });
            expect(response.status).toBe(404);
        })

        it('should return 200 status with valid id and payload', async () => {
            const newTodo = await (new Todo({title: 'test2'})).save();
            const id = newTodo._id;

            const payload = { title: 'Test2 updated' };
            const response = await request(server).put(`/api/todos/${id}`).send(payload);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(payload);
        })
    })

    describe('/delete/:id', () => {
        it('should return with a 404 if id absent', async () => {
            const response = await request(server).delete(`/api/todos/${1}`);
            expect(response.status).toBe(400);
        })
        
        it('should return with a 200 status with valid id', async () => {
            const todo = new Todo({ title: 'To be Deleted Task'});
            await todo.save();

            const response = await request(server).delete(`/api/todos/${todo._id}`);
            expect(response.status).toBe(200);
        });
    })
})