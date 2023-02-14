import { Request,Response } from "express"

/**
 * Controller to register admin
 *
 * @param {express.Request} req - contains the data from the request body of input data
 * @param {express.Response} res - send the response back to the client
 * @param {express.Response} db - dependency injected from server.js
 * @param {express.Response} bcrypt - dependency injected from server.js
 
 */
const handleRegister = (req:Request,res:Response,db:any,bcrypt:any) => {
    const { email, password, name } = req.body as {
      email:string,
      password:any,
      name:string
    };
   
   if(!email || !name || !password){
     return res.status(400).json('incorect form submission');
   }
  //  hashing the password 
    const hash = bcrypt.hashSync(password);
    // creating transaction to insert the hash and email into the login table
    // using transcation inorder for the below steps be a part of same transaction
    db.transaction((trx:any) => {
      trx
        .insert({
          hash: hash,
          email: email
        })
        .into("login")
        .returning("email")
        .then((loginEmail:any) => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
            })
            .then((user:any) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .then(trx.rollback)
    }).catch((err:any) => res.status(400).json("unable to register"));
  }

 export {handleRegister};