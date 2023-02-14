// const request = require("supertest");

//  const {db}= require('../server.js');
// // const register= require('./controllers/register');
// const {app} = require('../server');

// afterEach(async () => {
    
//     await db('users').where('email', "whyyy@gmail.com").del();
//     await db('login').where('email', "whyyy@gmail.com").del();
//     async () => {
//     await app.close(() => {
//         process.exit(1);
//     });
// }
// })

// describe('POST /signin', function() {
// it('responds with json', async function() {
//     jest.setTimeout(100000)
//   const response = await request(app)
//     .post('/signin')
//     .set('Accept', 'application/json')
//     .send ({
//                       email: "whyyy@gmail.com",
//                         password: 'anuj',
//                         name: "anuj"});
// //   expect(response.headers["Content-Type"]).toMatch(/json/);
// //   expect(response.status).toEqual(200);
// //   expect(response.body.name).toBe("anuj");
// //   expect(response.body.email).toEqual('foo@bar.com');
// console.log('hii',response);
// });
// });
