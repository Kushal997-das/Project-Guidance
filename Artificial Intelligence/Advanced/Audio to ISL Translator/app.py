import speech_recognition_file
import util
from flask import Flask, render_template, request, redirect, url_for, jsonify
from waitress import serve
import os

app = Flask(__name__)

sentence = ''
video_links = []


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('home.html')


@app.route('/sentences', methods=['GET', 'POST'])
def api_message():
    f = open('./file.wav', 'wb')
    f.write(request.data)
    f.close()
    print('recording saved')
    global sentence
    sentence = speech_recognition_file.convert_speech_to_text()
    message = {'sentence': sentence}
    return jsonify(message)


@app.route('/ChangeSentenceFunction', methods=['GET', 'POST'])
def change_sentence():
    global sentence
    print(str(request.data)[2:-1])
    sentence = str(request.data)[2:-1]

    message = {'sentence': sentence}
    return jsonify(message)


@app.route('/isl_gloss', methods=['GET', 'POST'])
def textToISLGloss():
    global sentence
    global video_links
    isl_gloss_list, video_links = util.getISL(sentence)
    isl_gloss = ' '.join(isl_gloss_list)
    print(isl_gloss)
    message = {'isl': isl_gloss}
    print(video_links)
    return jsonify(message)


@app.route('/videos', methods=['GET', 'POST'])
def glossToVideo():
    global video_links
    message = {
        'links': video_links
    }
    return jsonify(message)


@app.route('/text_to_isl', methods=['GET'])
def getISLFromText():
    text = str(request.args['query'])
    isl_gloss_list, links = util.getISL(text)
    isl_gloss = ' '.join(isl_gloss_list)
    return jsonify(links)


if __name__ == "__main__":
    app.run(debug=True)
    app.run()
    port = int(os.environ.get('PORT', 5000))
    print(port)
    serve(app, host='0.0.0.0', port=port)