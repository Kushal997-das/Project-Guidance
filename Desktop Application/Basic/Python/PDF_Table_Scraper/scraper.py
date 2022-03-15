import tabula
import sys
import os
import re

def check_stock_directory():
	stock_directory = "./PDFs/"
	pattern = "\.pdf$"
	if os.path.isdir(stock_directory):
		pdfs = [pdf for pdf in os.listdir(stock_directory) if re.search(pattern, pdf, flags=re.IGNORECASE)]
		if pdfs:
			return (pdfs, len(pdfs))
		else:
			print("[-] Couldn't find any PDF files. Add at least 1 file to start extracting tables.")		
	else:
		print("[-] Couldn't find 'PDFs' folder, Creating one...")
		try:
			os.mkdir("PDFs")
			print("[+] 'PDFs' folder created. Add PDF files inside, then run the program again to start extracting tables.")
			sys.exit(0)
		except Exception as e:
			print("[-] Couldn't create 'PDFs' folder, please check directory permissions.")
			raise e


def check_output_directory():
	output_directory = "./tables/"
	if os.path.isdir(output_directory):
		return True
	else:
		try:
			os.mkdir("tables")
		except Exception as e:
			print("[-] Couldn't create 'tables' folder to extract tables. please check directory permissions.")
			raise e


def tables_extractor(pdfs):
	stock_directory = "./PDFs/"
	output_directory = "./tables/"
	succeded = 0
	failed_names = []
	# ****************************************************************
	for index, pdf_file in enumerate(pdfs):
		try:
			print("*******************")
			print(f"Converting pdf {index+1}\n{pdf_file}")
			pdf_file_dir = stock_directory.split("/")+[pdf_file]
			table_output_dir = f"{output_directory+pdf_file.rstrip('.pdf')}.csv".split("/")
			tabula.convert_into(os.path.join(*pdf_file_dir), os.path.join(*table_output_dir), pages="all")
			print("[+] Done")
			succeded +=1
		except:
			print("[-] Failed")
			failed_names.append(pdf_file)
		finally:
			print("*******************")
	# ****************************************************************
	print(f"[+] Finished: converted {succeded} out of {len(pdfs)}.")
	if failed_names:
		print("*******************")
		print("Failed PDFs to convert:")
		print("\n".join(failed_names))


if __name__ == "__main__":
	pdf_list = check_stock_directory()
	print(f"[+] Found {pdf_list[1]} PDFs.")
	check_output_directory()
	tables_extractor(pdf_list[0])
	input("Press Enter key to exit...")

