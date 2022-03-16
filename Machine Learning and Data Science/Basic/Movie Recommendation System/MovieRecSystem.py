
import pandas as pd
import numpy as np
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer 
from sklearn.metrics.pairwise import cosine_similarity

"""feature extracion - #converting text to numbers
cosine similarity - #checking for similarities
"""

movies_dataset=pd.read_csv('F:\OpenSource\Project-Guidance\Machine Learning and Data Science\Basic\Movie Recommendation System\movies.csv')
movies_dataset.head()

movies_dataset.shape

#feature selection
selected_features=['genres', 'keywords', 'tagline', 'cast', 'director']
print(selected_features)

#replacing null values with null string
#replacing null values with string will help in easy understandi
for feature in selected_features:
  movies_dataset[feature]=movies_dataset[feature].fillna('')

#combining the 5 features
combined_parameters=movies_dataset['genres']+' '+movies_dataset['keywords']+' '+movies_dataset['tagline']+' '+movies_dataset['cast']+' '+movies_dataset['director']
print(combined_parameters)

#converting text to feature vectors
#models can understand only vectors(numbers)
# so it is necessary to featurize the text data to numerical data
#Tfid gives a numerical statistic to indicate how important a word is to 
# a document with respect to a collection of documents
#It is a weighting factor
#It also tells how often a word occurs/ or words that appear important and are common
vectorizer=TfidfVectorizer()
feature_vectors=vectorizer.fit_transform(combined_parameters)
print(feature_vectors)

#using cosine similarity function(compares with other values and recommends)
# Text Similarity has to determine how the two text documents close to each other in terms of their context or meaning.
# Cosine similarity is one of the metric to measure the text-similarity between two documents irrespective of their size in Natural language Processing. 
# A word is represented into a vector form. The text documents are represented in n-dimensional vector space.

# Mathematically, Cosine similarity metric measures the cosine of the angle between two n-dimensional vectors projected in a multi-dimensional space. 
# The Cosine similarity of two documents will range from 0 to 1. If the Cosine similarity score is 1, it means two vectors have the same orientation.
#  The value closer to 0 indicates that the two documents have less similarity.
similarity=cosine_similarity(feature_vectors)
print(similarity)

"""Recommendation System"""

#getting input from the user
movie_name=input("Enter your favorite movie")

list_of_alltitles=movies_dataset['title'].tolist()
print(list_of_alltitles)

#finding the close match - only 1
# get_close_matches(word, possibilities, n, cutoff) accepts four parameters:
# word - the word to find close matches for in our list
# possibilities - the list in which to search for close matches of word
# n (optional) - the maximum number of close matches to return. Must be > 0. Default is 3.
# cutoff (optional) - a float in the range [0, 1] that a possibility must score in order
#  to be considered similar to word.
#  0 is very lenient, 1 is very strict. Default is 0.6.
find_close_match=difflib.get_close_matches(movie_name,list_of_alltitles,1)
close_match=find_close_match[0]
print(close_match)

#find the index of the movie
index_of_the_movie=movies_dataset[movies_dataset.title==close_match]['index'].values[0]
print(index_of_the_movie)

similar_movies=list(enumerate(similarity[index_of_the_movie]))
print(similar_movies)

#sort based on similarity confidence
sorted_similar_movies=sorted(similar_movies,key=lambda x:x[1],reverse=True)
print(sorted_similar_movies)

print("Movies suggested:")
i=1
for movie in sorted_similar_movies:
  ind=movie[0]
  title_from_index=movies_dataset[movies_dataset.index==ind]['title'].values[0]
  if(i<=30):
    print(i,'.',title_from_index)
    i+=1