const createApp = require('./app')
const request = require('supertest')
const validateUsername = require('./validation/validateUsername')
const validatePassword = require('./validation/validatePassword')

const app = createApp(validateUsername, validatePassword)

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
    // test('returns response content type', async () => {
    //     const response = await request(app).post('/users').send({
    //         username: 'Username',
    //         password: 'Password123'
    //     })
    //     expect(response.body.)
    // })
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
            username: 'Username',
            password: 'Password123'
        })
        expect(response.body.message).toBeDefined();
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
    // ...
})