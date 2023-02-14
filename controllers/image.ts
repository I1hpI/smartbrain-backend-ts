const Clarifai = require ('clarifai');
// import Clarifai from 'clarifai';
// import json from 'express';


const app = new Clarifai.App({apiKey: "34328149c0364c63836c81223ed30c4d"});
import { Request,Response } from "express";

/**
 * Controller to handleapicall 
 *
 * @param {express.Request} req - contains the data from the request body of input data
 * @param {express.Response} res - send the response back to the client
 
 
 */
const handleApiCall =(req:Request,res:Response)=>{
//   app.models
//   .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
//   .then(data=>{
//     res.json(data);
//   })
//   .catch(err=>res.status(400).json('unable to work with API'))
// }
app.models
.predict(
  {
    id: 'face-detection',
    name: 'face-detection',
    version: '6dc7e46bc9124c5c8824be4822abe105',
    type: 'visual-detector',
  }, req.body.input)
.then((data:any) => {
  res.json(data);
})
.catch((err:any) => res.status(400).json('unable to work with API'))
}
// if the id matches the database id then increase entries
/**
 * Controller to handleimage
 *
 * @param {express.Request} req - contains the data from the request body of input data
 * @param {express.Response} res - send the response back to the client
 * @param {express.Response} db - using db which was passed as dependency injection to increase entries
 
 
 */
const handleImage=(req:Request , res:Response,db:any) => {
    const { id } = req.body;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries:any) => {
        res.json(entries[0].entries);
      })
      .catch((err:any) => res.status(400).json("unable to get entries"));
  }
 export {  handleImage,
  handleApiCall }