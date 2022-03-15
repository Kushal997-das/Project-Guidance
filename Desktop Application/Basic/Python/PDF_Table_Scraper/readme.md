# PDF Table Scraper

A program that auto-extracts tables from multiple PDFs and saves the tables from each scrapped PDF into a seperate CSV file.

## Required modules

* tabula-py
```bash
pip3 install tabula-py
```

* Make sure Java is installed as there is a wrapper is used in the scrapping process
```bash
sudo apt install default-jre
```

## Usage

1) First time use (run once): Running the script for the first time will deploy the required folder `PDFs` in which you put the PDFs meant to scrap and the other will have the extracted tables.
```bash
python3 scraper.py
```

2) Copy the PDFs you want to scrap into `PDFs` folder.

3) Re-run the script and wait for it to finish. A folder `tables` will be created containing the scrapped tables.
```bash
python3 scraper.py
```

4) A small summary will be included in the terminal window recalling the successful and failed PDFs scrapped.

## Demonstration [Video](https://drive.google.com/file/d/1aZwUFKibkn0M4ENc226pytRINRqkzLHk/view?usp=sharing)