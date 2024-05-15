from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
import torch
from PIL import Image

# Load the pre-trained Vision-Encoder-Decoder model, feature extractor, and tokenizer
model = VisionEncoderDecoderModel.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
feature_extractor = ViTImageProcessor.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
tokenizer = AutoTokenizer.from_pretrained("nlpconnect/vit-gpt2-image-captioning")

# Set the device to GPU if available, otherwise fallback to CPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)  # Move the model to the appropriate device

# Define the maximum length of the generated captions and the number of beams for beam search
max_length = 16
num_beams = 4
gen_kwargs = {"max_length": max_length, "num_beams": num_beams}

def predict_step(image_paths):
    # List to store PIL images
    images = []
    for image_path in image_paths:
        i_image = Image.open(image_path)  # Open the image
        if i_image.mode != "RGB":  # Ensure the image is in RGB mode
            i_image = i_image.convert(mode="RGB")
        images.append(i_image)  # Add the processed image to the list

    # Extract pixel values from the images and prepare them for the model
    pixel_values = feature_extractor(images=images, return_tensors="pt").pixel_values
    pixel_values = pixel_values.to(device)  # Move pixel values to the appropriate device

    # Generate captions for the images
    output_ids = model.generate(pixel_values, **gen_kwargs)

    # Decode the generated ids to obtain the captions
    preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True)
    preds = [pred.strip() for pred in preds]  # Clean up the predictions
    return preds

# Call the function with the path to the image
caption = predict_step(['G:\OpenSource\Project-Guidance\GenerativeAI\Basic\images\images.jpeg'])
print(caption)
