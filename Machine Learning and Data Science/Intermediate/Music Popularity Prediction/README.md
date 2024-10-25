# Music Popularity Prediction using Machine Learning

This project involves building machine learning models to estimate the popularity of tracks based on their audio features. Accurately predicting music popularity can assist streaming platforms in better understanding user preferences, optimizing playlists, and enhancing recommendation systems, ultimately boosting user engagement and satisfaction. 
<br><br>
<img src="https://img.shields.io/badge/Project Level - Intermediate-yellow.svg"/>
![](https://img.shields.io/badge/Programming_Language-Python-blueviolet.svg)
![](https://img.shields.io/badge/Main_Tool_Used-Jupyter_Notebook-orange.svg)
![](https://img.shields.io/badge/Status-Complete-green.svg)

### Overview: 
<br>
Music popularity prediction means using regression techniques to forecast the popularity of songs based on various music features and metadata. Expected results include accurate predictions of a song’s future performance in terms of streams, downloads, and chart positions, which enable music producers, artists, and marketers to make informed decisions.

>### <strong>Dataset used :</strong> [Spotify_data.csv](https://statso.io/music-popularity-case-study/)

The given dataset contains various attributes related to individual music tracks. Key features include:

| Attributes | |
|:--:|:--:|
| **Energy:** | A measure of intensity and activity. |
| **Valence:** | A measure of the musical positiveness conveyed by a track. |
| **Danceability:** | Describes how suitable a track is for dancing. |
| **Loudness:** | Overall loudness of a track in decibels (dB). |
| **Acousticness:** | Confidence measure of whether the track is acoustic. |
| **Tempo:** | The speed or pace of a given piece, measured in beats per minute (BPM). |
| **Speechiness:** | Measures the presence of spoken words in a track. |
| **Liveness:** | Detects the presence of an audience in the recording. |
| **Popularity:** | The target variable indicating the popularity score of the track. |

The dataset includes 227 music tracks, each described by the above features along with additional metadata like track name, artists, album name, and release date.

### Problem Statement:

The objective is to develop a predictive model that can accurately estimate the popularity of music tracks based on their audio features. Accurate predictions of music popularity can assist music streaming platforms in better understanding user preferences, enhancing recommendation systems, and optimizing playlists to boost user engagement.

Specifically, the goal is to build a regression model using machine learning techniques to predict the popularity score of a track by finding the most relevant features.

### Outcome: 

![ActualVSpredictedPopularity](https://github.com/user-attachments/assets/c4a2aae8-4bec-45f0-94af-8a6ddf64a8e2)

The red line represents perfect predictions, where the predicted popularity exactly matches the actual popularity. Most points are clustered near this line, indicating that the model is making fairly accurate predictions. However, there are noticeable deviations, especially at lower popularity values, highlighting areas where the model's predictions are less accurate.

### Conclusion:

Predicting the popularity of music can help music streaming platforms understand user preferences, optimize playlists and enhance recommendation systems to improve user engagement and satisfaction.

<h3 align="center">Show some &nbsp;❤️&nbsp; by starring this repo! </h3>
