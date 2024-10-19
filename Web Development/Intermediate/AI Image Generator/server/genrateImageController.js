
import { HfInference } from '@huggingface/inference'; // Ensure you import HfInference
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
export async function generateImage(prompt) {

const __filename = fileURLToPath(import.meta.url); // Get the current file name
const __dirname = path.dirname(__filename); // Get the directory name
dotenv.config(); // Load the environment variables from the .env file


const hf = new HfInference(process.env.HUGGING_FACE_API); // Replace with your Hugging Face API key

  try {
    const result = await hf.textToImage({
      model: 'CompVis/stable-diffusion-v1-4', // Use the Stable Diffusion model
      inputs: prompt,
    });
    
    // Convert Blob to ArrayBuffer
    const arrayBuffer = await result.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    
    const publicFolderPath = path.join(__dirname, 'public', 'generated_image.jpg');
    
    
    fs.writeFileSync(publicFolderPath, buffer);
    console.log('Image saved as generated_image.jpg in the public folder : ',prompt);
    
    return result; 
  } catch (error) {
    console.error('Error generating image:', error);
  }
}














