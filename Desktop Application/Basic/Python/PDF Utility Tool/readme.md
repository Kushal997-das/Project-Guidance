# PDF Utility Tool

The PDF Toolkit is a Python application designed to provide various PDF manipulation functionalities offline. It allows users to merge multiple PDF files into one, convert PDF files to DOCX format, encrypt PDF files with passwords, and split PDF files into separate documents. The application offers a user-friendly graphical interface built using the Tkinter library.

## Features
1. **Merge PDF** allows you to select multiple files through file explorer window and merge them into one pdf.
2. **PDF to .docx** allows you to select a pdf file and convert it into an editable MS-Word Document.
3. **Encrypt PDF** allows you to select a file that you wish to lock and set a password for that file.
4. **Split PDF** allows you to input a page number from which the pdf is split into 2 pdfs.

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your_username/pdf-toolkit.git
   ```
2. Navigate to the project directory

   ```bash
   cd pdf-toolkit
   ```
3. Install Dependencies

   ```bash
   pip install -r requirements.txt
   ```
4. Run PDFToolkit.py

   ```bash
   python PDFToolkit.py
   ```

## Dependencies

The PDF Toolkit uses the following Python packages:

* Pillow (PIL): Image processing library used for handling images.
* PyPDF2: Library for working with PDF files, providing functionalities for merging, splitting, and encrypting PDFs.
* pdf2docx: Converter library used to convert PDF files to DOCX format.

## GUI
![GUI Interface](https://github.com/KJ173/Project-Guidance/assets/92749776/b3105e57-cdcd-4cad-9f6b-f235db4d2770)
