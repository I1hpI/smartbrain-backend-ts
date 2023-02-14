// const {makeFetch}= require('node-fetch');
// const {makeFetch}= require('supertest-fetch') ;
// const {makeFetch}= require('supertest') ;
// const register= require('./controllers/register');
// const http = require ('http');

// const { registerUser } = require("./userController");

//const { server } = require("../index"); // Link to your server file


// const server = http.createServer(app)
//     (req, res) => {
//     res.setHeader('content-type', 'application/json');
//     res.end(JSON.stringify({ greeting: 'Hello!' }));
// });

// const fetch = makeFetch(server);

// describe('Register user',()=>
// {  it("Should save user to database", async () => {
//     jest.setTimeout(10000)
//     const res = await request("localhost:3000").post("/register").send ({

//               email: "a@gmail.com",
//                 password: 'anuj',
//                 name: "anuj"});
    // const res = await request("localhost:3000").post("/register").send(
    //     JSON.stringify({

    //         email: "a@gmail.com",
    //         password: 'anuj',
    //         name: "anuj"})
        // )
    // const res = await fetch('http://localhost:3000/register', {
    //     method: 'post',
    //     headers: { 'Content-Type': 'application/json' },
    //     body:  JSON.stringify({

    //                 email: "a@gmail.com",
    //                 password: 'anuj',
                    // name: "anuj"})
    //             ,
    // });
  
    
    
    // expect(res.body[0].name).toBe(user.name);
    // expect(res.body[0].id).toBeTruthy();
    // expect(res.body[0].created_at).toBeTruthy();
    // expect(res.body[0].updated_at).toBeTruthy()
// }) 

// })

const request = require("supertest");

 const {db}= require('../server.js');

const {app} = require('../server');
afterEach(async () => {
    
    await db('users').where('email', "veen@gmail.com").del();
    await db('login').where('email', "veen@gmail.com").del();
    async () => {
    await app.close(() => {
        process.exit(1);
    });
}
})

describe('POST /register', function() {
it('responds with json', async function() {
    jest.setTimeout(100000)
  const response = await request(app)
    .post('/register')
    .set('Accept', 'application/json')
    .send ({
                      email: "veen@gmail.com",
                        password: 'anuj',
                        name: "anuj"});
//   expect(response.headers["Content-Type"]).toMatch(/json/);
  expect(response.status).toEqual(200);
//   expect(response.body.name).toBe("anuj");
//   expect(response.body.email).toEqual('foo@bar.com');
console.log('hii',response);
});
});
