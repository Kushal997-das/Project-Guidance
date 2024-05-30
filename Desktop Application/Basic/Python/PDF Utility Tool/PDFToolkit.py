import tkinter as tk
from tkinter import filedialog, messagebox, simpledialog
from PIL import Image, ImageTk
import PyPDF2
from pdf2docx import Converter
import os

class Application(tk.Tk):
    def __init__(self):
        tk.Tk.__init__(self)
        self.resizable(1, 1)
        self.geometry("600x400")
        self.title("PDF Toolkit")
        self.create_widgets()
    def create_widgets(self):
        button_width = 160
        button_height = 120
        font_family = "Roboto"
        font_size = 14
        text_color = "#333333"
        button_bg = "#F7E98D"
        image_size = (64, 64)

        self.merge_img = Image.open("./icons/merge_icon.png").resize(image_size)
        self.merge_icon = ImageTk.PhotoImage(self.merge_img)
        self.merge_btn = tk.Button(self, text="Merge PDF", font=(font_family, font_size), width=button_width,height=button_height,padx=30, pady=30, compound=tk.TOP, command=self.merge, fg=text_color, bg=button_bg, image=self.merge_icon)
        self.merge_btn.grid(row = 2, column = 2,  padx = 10, pady = 20)

        self.pdf_to_docx_img = Image.open("./icons/pdf_to_docx_icon.png").resize(image_size)
        self.pdf_to_docx_icon = ImageTk.PhotoImage(self.pdf_to_docx_img)
        self.pdf_to_docx_btn = tk.Button(self, text="PDF to DOCX", font=(font_family, font_size), width=button_width,height=button_height, padx=25, pady=30, compound=tk.TOP, command=self.convert_pdf_to_docx, fg=text_color, bg=button_bg, image=self.pdf_to_docx_icon)
        self.pdf_to_docx_btn.grid(row = 2, column = 4,  padx = 10, pady = 20)

        self.encrypt_img = Image.open("./icons/encrypt_icon.png")
        self.encrypt_icon = ImageTk.PhotoImage(self.encrypt_img)
        self.encrypt_btn = tk.Button(self, text="Encrypt PDF", font=(font_family, font_size), width=button_width,height=button_height, padx=40, pady=30, compound=tk.TOP, command=self.encrypt_pdf, fg=text_color, bg=button_bg, image=self.encrypt_icon)
        self.encrypt_btn.grid(row = 4, column = 2,  padx = 10, pady = 20)

        self.split_img = Image.open("./icons/split_icon.png").resize(image_size)
        self.split_icon = ImageTk.PhotoImage(self.split_img)
        self.split_btn = tk.Button(self, text="Split PDF", font=(font_family, font_size), width=button_width,height=button_height, padx=25, pady=30, compound=tk.TOP, command=self.split_pdf, fg=text_color, bg=button_bg, image=self.split_icon)
        self.split_btn.grid(row = 4, column = 4,  padx = 10, pady = 20)


    def merge(self):
        pdf_files = filedialog.askopenfilenames(title="Select PDF files to merge")
        if pdf_files:
            merged_pdf = PyPDF2.PdfFileMerger()
            for pdf_file in pdf_files:
                merged_pdf.append(pdf_file)

            save_path = filedialog.asksaveasfilename(defaultextension=".pdf", filetypes=[("PDF files", "*.pdf")])
            if save_path:
                merged_pdf.write(save_path)
                merged_pdf.close()
                messagebox.showinfo("Success", "PDFs merged successfully.")
            else:
                messagebox.showwarning("Warning", "Save path not provided.")
        else:
            messagebox.showwarning("Warning", "No PDF files selected.")

    def convert_pdf_to_docx(self):
        pdf_file = filedialog.askopenfilename(title="Select PDF file to convert")
        if pdf_file:
            save_path = filedialog.asksaveasfilename(defaultextension=".docx", filetypes=[("Word files", "*.docx")])
            if save_path:
                cv = Converter(pdf_file)
                cv.convert(save_path)
                cv.close()
                messagebox.showinfo("Success", "PDF converted to DOCX successfully.")
            else:
                messagebox.showwarning("Warning", "Save path not provided.")
        else:
            messagebox.showwarning("Warning", "No PDF file selected.")

    def encrypt_pdf(self):
        pdf_file = filedialog.askopenfilename(title="Select PDF file to encrypt")
        if pdf_file:
            password = simpledialog.askstring("Password", "Enter password for encryption:", show='*')
            if password:
                save_path = filedialog.asksaveasfilename(defaultextension=".pdf", filetypes=[("PDF files", "*.pdf")])
                if save_path:
                    with open(pdf_file, 'rb') as file:
                        pdf_reader = PyPDF2.PdfReader(file)
                        pdf_writer = PyPDF2.PdfWriter()
                        for page in pdf_reader.pages:
                            pdf_writer.add_page(page)
                        pdf_writer.encrypt(password)
                        with open(save_path, 'wb') as output_file:
                            pdf_writer.write(output_file)
                            messagebox.showinfo("Success", "PDF encrypted successfully.")
                else:
                    messagebox.showwarning("Warning", "Save path not provided.")
            else:
                messagebox.showwarning("Warning", "Password not provided.")
        else:
            messagebox.showwarning("Warning", "No PDF file selected.")

    def split_pdf(self):
        pdf_file = filedialog.askopenfilename(title="Select PDF file to split")
        if pdf_file:
            split_point = simpledialog.askinteger("Split Point", "Enter page number to split from:")
            if split_point:
                save_path = filedialog.asksaveasfilename(defaultextension=".pdf", filetypes=[("PDF files", "*.pdf")])
                if save_path:
                    pdf_reader = PyPDF2.PdfReader(pdf_file)
                    pdf_writer1 = PyPDF2.PdfWriter()
                    pdf_writer2 = PyPDF2.PdfWriter()
                    for page_num in range(len(pdf_reader.pages)):
                        if page_num < split_point:
                            pdf_writer1.add_page(pdf_reader.pages[page_num])
                        else:
                            pdf_writer2.add_page(pdf_reader.pages[page_num])
                    with open(save_path, 'wb') as output_file:
                        pdf_writer1.write(output_file)
                    with open(os.path.splitext(save_path)[0] + "_split.pdf", 'wb') as output_file2:
                        pdf_writer2.write(output_file2)
                    messagebox.showinfo("Success", "PDF split successfully.")
                else:
                    messagebox.showwarning("Warning", "Save path not provided.")
            else:
                messagebox.showwarning("Warning", "Split point not provided.")
        else:
            messagebox.showwarning("Warning", "No PDF file selected.")


root = Application()
root.mainloop()
