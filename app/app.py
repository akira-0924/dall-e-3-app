from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
from utils import generateImage
import boto3
from openai import OpenAI
from dotenv import load_dotenv
from skimage.metrics import structural_similarity as compare_ssim
import json

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

@app.route("/api/upload", methods=['POST'])
def upload_to_s3():
    try:
        # POSTリクエストからJSONデータを取得
        data = request.json
        json_data = data.get('json')
        team = data.get('team')
        filename = data.get('filename')

        # 必要な情報がない場合はエラーメッセージを返す
        if not (json_data and team and filename):
            return jsonify(message='リクエストに必要な情報が含まれていません'), 400

        # JSONデータをS3にアップロード
        s3_dir = f'team{team}'
        file_name = f'q{filename}.json'
        key = f'{s3_dir}/{file_name}'
        s3 = boto3.client('s3', region_name='ap-northeast-1')
        json_string = json.dumps(json_data).encode('utf-8')
        response = s3.put_object(
            Body=json_string,
            Bucket="wordlist-json-20240306",
            Key=key
        )

        # アップロードが成功したかどうかをチェックし、適切なレスポンスを返す
        if response['ResponseMetadata']['HTTPStatusCode'] != 200:
            return jsonify(message='S3へのアップロードでエラーが発生しました'), 500
        
        return "アップロードに成功しました"

    except Exception as e:
        # エラーが発生した場合はエラーメッセージを返す
        return jsonify(message='サーバーエラーが発生しました'), 500

# @app.route("/api/upload", methods=['GET', 'POST'])
# def index3():
#     print("called Flask")
#     if request.method == 'POST':
#         json_data = request.json['json']
#         team = request.json['team']
#         filename = request.json['filename'] 
#         json_data = json.dumps(json_data).encode('utf-8')
#         s3_dir = f'team{team}'
#         file_name = f'q{filename}.json'
#         key = f'{s3_dir}/{file_name}'
#         s3 = boto3.client('s3', region_name = 'ap-northeast-1')
#         response = s3.put_object(
#             Body = json_data,
#             Bucket = "wordlist-json-20240306",
#             Key = key
#         )
#         if response['ResponseMetadata']['HTTPStatusCode'] != 200:
#             return jsonify(message='S3へのアップロードでエラーが発生しました'), 500
#         return "アップロードに成功しました"


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
        ssm = boto3.client('ssm', region_name='ap-northeast-1')
        ssm_response = ssm.get_parameters(
            Names=[
                '/openapi/API_KEY',
            ],
            WithDecryption=True
        )
        ssm_api_key =  ssm_response['Parameters'][0]['Value']
        response = generateImage(text, base_image)
        return response
    except Exception as e:
        error_message = str(e)
        return make_response(jsonify({'error': error_message}), 500)

if __name__ == "__main__":
    app.debug = True
    app.run(host='127.0.0.1', port=5000)

