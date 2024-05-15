# Install required packages
# !pip install --upgrade diffusers transformers -q

from pathlib import Path
import tqdm
import torch
import pandas as pd
import numpy as np
from diffusers import StableDiffusionPipeline
from transformers import pipeline, set_seed
import matplotlib.pyplot as plt
import cv2

# Configuration class to hold constant values and parameters
class CFG:
    device = "cuda"  # Set device to GPU (cuda)
    seed = 42  # Seed for reproducibility
    generator = torch.Generator(device).manual_seed(seed)  # Generator for random number generation with seed
    image_gen_steps = 35  # Number of inference steps for image generation
    image_gen_model_id = "stabilityai/stable-diffusion-2"  # Model ID for the Stable Diffusion model
    image_gen_size = (400, 400)  # Size of the generated images
    image_gen_guidance_scale = 9  # Guidance scale for image generation
    prompt_gen_model_id = "gpt2"  # Model ID for the GPT-2 model
    prompt_dataset_size = 6  # Dataset size for prompt generation
    prompt_max_length = 12  # Maximum length for generated prompts

# Load the Stable Diffusion model using the specified parameters
image_gen_model = StableDiffusionPipeline.from_pretrained(
    CFG.image_gen_model_id, torch_dtype=torch.float16,
    revision="fp16", use_auth_token='your_huggingface_auth_token', guidance_scale=9
)
image_gen_model = image_gen_model.to(CFG.device)  # Move the model to the GPU

# Function to generate an image from a text prompt using the Stable Diffusion model
def generate_image(prompt, model):
    # Generate the image with the specified parameters
    image = model(
        prompt, num_inference_steps=CFG.image_gen_steps,
        generator=CFG.generator,
        guidance_scale=CFG.image_gen_guidance_scale
    ).images[0]

    # Resize the generated image to the specified size
    image = image.resize(CFG.image_gen_size)
    return image

# Example usage: Generate an image from the prompt "Apple on a tree"
generate_image("Apple on a tree", image_gen_model)