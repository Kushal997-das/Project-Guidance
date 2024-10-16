import express from 'express';
import dotenv from 'dotenv';
import { generateImage } from './genrateImageController.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors({
  origin: process.env.FRONTEND_URL, 
  methods: ['GET', 'POST'],
  credentials: true 
}));

app.use(express.static('public')); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body; 
  
  if (!prompt || !prompt.length) {
    return res.status(400).send('Prompt is required');
  }

  try {
    await generateImage(prompt); 
    
    const imageUrl = `https://${req.get('host')}/generated_image.jpg`;
    res.send(imageUrl); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating image'); 
  }
});



app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
