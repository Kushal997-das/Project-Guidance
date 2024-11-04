# Text Summarization Using Transformers

## Project Overview
The **Text Summarization Using Transformers** project aims to automatically generate concise summaries from larger text documents using state-of-the-art natural language processing (NLP) techniques. This project leverages the power of pre-trained transformer models, specifically BART and T5, to produce high-quality summaries that capture the essence of the original texts.

## Objectives
- To generate brief summaries of longer texts.
- To evaluate the quality of the generated summaries using quantitative metrics like ROUGE.

## Technologies Used
- **Programming Language**: Python
- **Libraries**: 
  - [Hugging Face Transformers](https://github.com/huggingface/transformers)
  - [NLTK](https://www.nltk.org/) (for text processing)
  - [ROUGE Score](https://github.com/google-research/google-research/tree/master/rouge) for evaluation
- **Platform**: Google Colab for seamless execution and resource management

## Dataset
- The dataset used for this project consists of articles and their corresponding summaries. You can use datasets from news articles or Wikipedia.
- Example datasets include:
  - [CNN/Daily Mail Dataset](https://cs.nyu.edu/~thaddeus/projects/cnn/)
  - [XSum Dataset](https://github.com/nyu-dl/dl4summarization)

## Key Steps
1. **Environment Setup**: 
   - Use Google Colab to set up your environment.

2. **Data Preprocessing**: 
   - Load the dataset, clean the text, and prepare it for summarization.

3. **Model Selection**: 
   - Choose a pre-trained transformer model (e.g., BART or T5) from the Hugging Face Transformers library.

4. **Summary Generation**: 
   - Apply the selected model to generate summaries from the input texts.

5. **Evaluation of Summary Quality**: 
   - Use the ROUGE metric to quantitatively evaluate the performance of the generated summaries against reference summaries.
# Text Summarization Using Transformers

## Example Results

### Original Article
![Original Article](https://github.com/user-attachments/assets/aa27dc2d-6897-45a8-875c-dc8087683d66)


### Generated Summary
![Generated Summary](https://github.com/user-attachments/assets/0e81c519-a2a5-4eb5-aa79-70abeb445fe6)


### Evaluation Scores
![Evaluation Scores](https://github.com/user-attachments/assets/f9634d8e-9f63-480a-a6d0-67adfb8192e1)



