import requests
# === importing libraries =====

def news_form_bbc():
    # ===== bbc api news =====
    main_url = "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=4dbc17e007ab436fb66416009dfb59a8"
    # ===== fetch the data with json ====
    open_bbc_page = requests.get(main_url).json()
    article = open_bbc_page["articles"]
    # ==== results data =====
    results = []
    # ======= for print the news results ========
    for i in article:
        print(f''' auther:{i['author']}
                   title:{i['title']}
                   description:{i['description']}
                   url:{i['url']} ''')

    for i in range(len(results)):
        print(i+1, results[i])

# ===== main function calling ========
if __name__ == '__main__':
    news_form_bbc()













