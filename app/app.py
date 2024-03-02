from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
from utils import generateImage

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app) #Cross Origin Resource Sharing

@app.route("/", methods=['GET'])
def index():
    return "text parser:)"

@app.route("/generateImage", methods=['POST'])
def parse():
    #print(request.get_json()) # -> {'post_text': 'テストテストテスト'}
    data = request.get_json()
    # text = data['post_text']

    # print(text)

    res = generateImage("text")
    print(res)
    response = {'result': res}
    #print(response)
    return make_response(jsonify(response))

if __name__ == "__main__":
    app.debug = True
    app.run(host='127.0.0.1', port=5000)

