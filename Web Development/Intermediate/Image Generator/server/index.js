import express from 'express';
import dotenv from 'dotenv';
import { generateImage } from './genrateImageController.js';

import cors from 'cors';


const app = express()
const port = 3000

app.use(cors());
app.use(express.static('public'))

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/generate-image', async (req,res)=>{
  const { prompt } = req.body; // Extract the prompt from the request body
  
  if (!prompt.length) {
    return res.status(400).send('Prompt is required');
  }
  
  await generateImage(prompt)
  res.send('http://localhost:3000/generated_image.jpg');

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})