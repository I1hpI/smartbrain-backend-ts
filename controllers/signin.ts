// const handleSignin=(db,bcrypt)=>(req,res)=> {
//   const{email,password}=req.body;
//   if(!email ||  !password){
//     return res.status(400).json('incorect form submission');
//   }
  
//     db.select('email','hash').from('login')
//     .where('email','=', email)
//     .then(data=>{
//       // compare if the above received data matches with the hashed password created by bycrypt
//       const isValid = bcrypt.compareSync(password, data[0].hash);
//       if (isValid)
//       {
//        return db.select('*').from('users')
//         .where('email','=',email)
//         .then(user=>{
//           res.json(user[0])
//         })
//         .catch(err=>res.status(400).json('unable to get user'))
//       }
//       else{
//         res.status(400).json('wrong credentials')
//       }
//     })
//     .catch(err=>res.status(400).json('wrong credentials'))
// }
// // const signinAuthentication = (db,bycrypt) => (req,res) =>{
// //   const{authorization} = req.headers; 


// module.exports={
//     handleSignin:handleSignin}

// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
import { Request,Response } from "express";



const signToken = (username:any) => {
  const jwtPayload = { username };
  return jwt.sign(jwtPayload, 'JWT_SECRET_KEY');
};

const createSession = (user:any) => {
  const { email, id } = user as {
    email:string,
    id:number
  };
  const token = signToken(email);
  
      return { success: 'true', userId: id, token, user }
    
    
};

const handleSignin = (db:any, bcrypt:any, req:Request, res:Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then((data:any) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then((user:any) => user[0])
          .catch((err:any) => Promise.reject('unable to get user'))
      } else {
        return Promise.reject('wrong credentials');
      }
    })
    .catch((err:any) => err)
}

const getAuthTokenId = (req:Request, res:Response) => {
  const { authorization } = req.headers;
  
}

/**
* Controller to signin admin
 *
 * @param {express.Request} req - contains the data from the request body of input data
 * @param {express.Response} res - send the response back to the client
 * @param {express.Response} db - dependency injected from server.js
 * @param {express.Response} bcrypt - dependency injected from server.js
 
 */
const signinAuthentication = (db:any, bcrypt:any) => (req:Request, res:Response) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res)
    : handleSignin(db, bcrypt, req, res)
    .then((data:any )=>
      data.id && data.email ? createSession(data) : Promise.reject(data))
    .then((session:any) => res.json(session))
    .catch((err:any) => res.status(400).json(err));
}

export { signinAuthentication};