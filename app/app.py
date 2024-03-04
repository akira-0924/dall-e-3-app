from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
from utils import generateImage
import boto3
from openai import OpenAI
from dotenv import load_dotenv
from skimage.metrics import structural_similarity as compare_ssim

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app) #Cross Origin Resource Sharing
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route("/", methods=['GET'])
def index():
    return "API Server"


@app.route("/api", methods=['GET', 'POST'])
def index2():
    return "API Server called"

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'name': 'tarou', 'age': 30, 'job': 'developer'}
    return jsonify(data)


@app.route("/api/generateImage", methods=['GET','POST'])
def parse():
    try:
        data = request.get_json()
        text = data['post_text']
        base_image = data['base_image']
        response = generateImage(text, base_image)
        return response
    except Exception as e:
        error_message = str(e)
        return make_response(jsonify({'error': error_message}), 500)

if __name__ == "__main__":
    app.debug = True
    app.run(host='127.0.0.1', port=5000)

