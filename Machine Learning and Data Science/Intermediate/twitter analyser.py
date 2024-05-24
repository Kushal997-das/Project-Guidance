import re
import nltk
import numpy as np
import pandas as pd
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.metrics import classification_report
import tkinter as tk
from tkinter import scrolledtext
from sklearn.preprocessing import LabelEncoder
from textblob import TextBlob

# nltk.download('punkt')
# nltk.download('stopwords')


tweets_df = pd.read_csv('tweets.csv')

# Drop rows with NaN values
tweets_df.dropna(inplace=True)

# Drop rows with missing values in the 'text' column
tweets_df.dropna(subset=['text', 'location'], inplace=True)

# Reset the index after dropping rows
tweets_df.reset_index(drop=True, inplace=True)


# Data preprocessing
def preprocess_text(text):
    # Remove URLs
    text = re.sub(r'http\S+', '', text)
    # Remove mentions and hashtags
    text = re.sub(r'@\w+|\#\w+', '', text)
    # Convert to lowercase
    text = text.lower()
    # Remove punctuation
    text = re.sub(r'[^\w\s]', '', text)
    return text

tweets_df['clean_text'] = tweets_df['text'].apply(preprocess_text)

# Tokenization and removing stop words
stop_words = set(stopwords.words('english'))
tweets_df['tokenized_text'] = tweets_df['clean_text'].apply(word_tokenize)
tweets_df['filtered_text'] = tweets_df['tokenized_text'].apply(lambda tokens: [word for word in tokens if word not in stop_words])

# Target variable - 'location' as the target variable
X = tweets_df['clean_text']
y = tweets_df['location']

# Encode target variable
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)

# Feature extraction
tfidf_vectorizer = TfidfVectorizer(max_features=1000)
X_tfidf = tfidf_vectorizer.fit_transform(X)

# Splitting the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y, test_size=0.2, random_state=42)

svm_classifier = SVC(kernel='linear')
svm_classifier.fit(X_train, y_train)

y_pred = svm_classifier.predict(X_test)
unique_labels = label_encoder.classes_
classification_rep = classification_report(y_test, y_pred, labels=np.unique(y_test), target_names=unique_labels)

# Sentiment analysis
def analyze_sentiment(text):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    if polarity > 0:
        return "Positive"
    elif polarity < 0:
        return "Negative"
    else:
        return "Neutral"

# Trend analysis
def trend_analysis():
    all_words = ' '.join(tweets_df['clean_text'])
    all_words = word_tokenize(all_words)
    word_freq = nltk.FreqDist(all_words)
    
    # Remove special characters, numbers, prepositions, and some common verbs
    stopwords_custom = set(stopwords.words('english')) | {'rt', 'via', 'amp', 'im'}
    filtered_words = [word for word in all_words if word.isalpha() and word not in stopwords_custom]
    
    word_freq_filtered = nltk.FreqDist(filtered_words)
    most_common_word = word_freq_filtered.most_common(1)[0][0]
    
    return f"Most Common Word: {most_common_word}"

def display_classification_report():
    report_window = tk.Toplevel(root)
    report_window.title("Classification Report")
    
    scrollbar_x = tk.Scrollbar(report_window, orient=tk.HORIZONTAL)
    scrollbar_y = tk.Scrollbar(report_window)
    
    report_text = scrolledtext.ScrolledText(report_window, wrap=tk.WORD, xscrollcommand=scrollbar_x.set, yscrollcommand=scrollbar_y.set)
    report_text.pack(expand=True, fill='both')
    report_text.insert(tk.END, classification_rep)
    
    scrollbar_x.config(command=report_text.xview)
    scrollbar_y.config(command=report_text.yview)
    scrollbar_x.pack(fill=tk.X)
    scrollbar_y.pack(fill=tk.Y)

def analyze_sentiments():
    sentiments = tweets_df['clean_text'].apply(analyze_sentiment)
    positive_count = sentiments[sentiments == 'Positive'].count()
    negative_count = sentiments[sentiments == 'Negative'].count()
    neutral_count = sentiments[sentiments == 'Neutral'].count()
    
    sentiment_result = f"Positive: {positive_count}\nNegative: {negative_count}\nNeutral: {neutral_count}"
    
    sentiment_window = tk.Toplevel(root)
    sentiment_window.title("Sentiment Analysis")
    
    sentiment_label = tk.Label(sentiment_window, text=sentiment_result, font=("Arial", 12), bg="#f0f0f0")
    sentiment_label.pack()

def analyze_location_sentiments():
    sentiments = tweets_df['clean_text'].apply(analyze_sentiment)
    tweets_df['sentiment'] = sentiments
    location_sentiments = tweets_df.groupby('location')['sentiment'].value_counts().unstack().fillna(0)
    most_positive = location_sentiments.idxmax(axis=0)['Positive']
    most_negative = location_sentiments.idxmax(axis=0)['Negative']
    most_neutral = location_sentiments.idxmax(axis=0)['Neutral']
    
    sentiment_result = f"Most Positive Sentiment Location: {most_positive}\nMost Negative Sentiment Location: {most_negative}\nMost Neutral Sentiment Location: {most_neutral}"
    
    location_window = tk.Toplevel(root)
    location_window.title("Location Sentiment Analysis")
    
    location_label = tk.Label(location_window, text=sentiment_result, font=("Arial", 12), bg="#f0f0f0")
    location_label.pack()

def display_trend_analysis():
    trend_result = trend_analysis()
    
    trend_window = tk.Toplevel(root)
    trend_window.title("Trend Analysis")
    
    trend_label = tk.Label(trend_window, text=trend_result, font=("Arial", 12), bg="#f0f0f0")
    trend_label.pack()

root = tk.Tk()
root.title("Tweet Analysis Tool")
root.geometry("800x600")
root.configure(bg="#f0f0f0")

info_label = tk.Label(root, text="Tweet Analysis Tool", font=("Arial", 24, "bold"), bg="#f0f0f0", fg="#333")
info_label.pack(pady=20)

info_text = tk.Label(root, text="This tool provides analysis of tweets, including classification based on location and sentiment analysis", font=("Arial", 12), bg="#f1f1f0", fg="#365")
info_text.pack()

# Buttons
button_frame1 = tk.Frame(root, bg="#f0f0f0")
button_frame1.pack(pady=10)

classification_button = tk.Button(button_frame1, text="View Classification Report", command=display_classification_report, bg="#4CAF50", fg="white", font=("Arial", 14))
classification_button.grid(row=0, column=0, padx=10)

location_button = tk.Button(button_frame1, text="Location Sentiment Analysis", command=analyze_location_sentiments, bg="#FF5733", fg="white", font=("Arial", 14))
location_button.grid(row=0, column=1, padx=10)

button_frame2 = tk.Frame(root, bg="#f0f0f0")
button_frame2.pack(pady=10)

sentiment_button = tk.Button(button_frame2, text="Analyze Sentiments", command=analyze_sentiments, bg="#008CBA", fg="white", font=("Arial", 14))
sentiment_button.grid(row=0, column=0, padx=10)

trend_button = tk.Button(button_frame2, text="Trend Analysis", command=display_trend_analysis, bg="#FFA500", fg="white", font=("Arial", 14))
trend_button.grid(row=0, column=1, padx=10)

root.mainloop()
