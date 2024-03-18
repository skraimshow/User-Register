const createApp = require('./app')
const request = require('supertest')


//const mockedValidatePassword = jest.fn();
const mockedValidatePassword = jest.fn(password => password.length >= 8);
const mockedValidateUsername = jest.fn(username => username.length >= 6 && username.length <=30);


const app = createApp(mockedValidateUsername, mockedValidatePassword)

describe('given correct username and password', () => {
    test('return status 200', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.statusCode).toBe(200)
    })

    test('returns userId', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.userId).toBeDefined();
    })

    // test response content type?
    test('returns response content type', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.userId).toBe("1");
    })
    // test response message
    test('returns response message', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.message).toBeDefined();
    })
    // test response user id value
    test('returns response content type', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.userId).toBeDefined();
    })
    test('returns response message', async () => {
        const response = await request(app).post('/users').send({
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.message).toBe('Valid User');
    })
    // ...
  
})

describe('given incorrect or missing username and password', () => {
    test('return status 400', async () => {
        const response = await request(app).post('/users').send({
            username: 'user',
            password: 'password'
        })
        expect(response.statusCode).toBe(400)
    })

    // test response message
    test('returns response message', async () => {
        const response = await request(app).post('/users').send({
            username: 'sername',
            password: 'assword123'
        })
        expect(response.body.message).toBeUndefined();
    })
    // test that response does NOT have userId 
    test('returns response does not have userId', async () => {
        const response = await request(app).post('/users').send({
            username: '',
            password: 'Password123'
        })
        expect(response.body.error).toBeDefined();
    })
    // test incorrect username or password according to requirements
    test('returns response incorrect username or password', async () => {
        const response = await request(app).post('/users').send({
            username: 'username',
            password: 'Password'
        })
        expect(response.body.error).toBeDefined();
    })
    // test missing username or password
    test('returns response missing username or password', async () => {
        const response = await request(app).post('/users').send({
            username: '',
            password: ''
        })
        expect(response.body.error).toBe('Invalid User');
    })
    // ...
})