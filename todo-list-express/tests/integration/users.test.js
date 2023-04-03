const request = require('supertest');
const createServer = require('../../server');
const { User } = require('../../users/model');

let server;

describe('/api/users', () => {
    beforeAll(() => {
        server = createServer();
    })

    afterEach(async () => {
        await User.deleteMany({});
    })

    describe('POST /', () => {
        it('should return a 400 with an invalid request body', async () => {
            const userPayload = {
                username: 'test1',
                passwrd: '12345'
            }
            const response = await request(server).post('/api/users').send(userPayload);
            expect(response.status).toBe(400);
        })

        it('should return a 409 when user with email already exists', async () => {
            const testUser = await (new User({email: 'test1@gmail.com', password: '123456789'})).save();
            const response = await request(server).post('/api/users').send({email: testUser.email, password: '123456789'});
            expect(response.status).toBe(409);
            expect(response.body.message.split(' ')).toContain('exists');
        })

        it('should return a 201 when user is successfully created', async () => {
            const email = 'test123@gmail.com';
            const password = 'sahmi12345698';
            const userPayload = { email, password };
            const response = await request(server).post('/api/users').send(userPayload);
            expect(response.status).toBe(201);
            expect(response.body).toMatchObject({ email })
        })
    })

    // describe('POST /auth', () => {

    // })
})