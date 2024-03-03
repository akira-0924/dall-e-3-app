from flask import Flask
from flask import request, make_response, jsonify
import boto3
from openai import OpenAI
from PIL import Image
from io import BytesIO
import os
import re
import requests
from skimage.metrics import structural_similarity as compare_ssim
import numpy as np

def generateImage(text):

    print("---------------")
    images = []
    client = OpenAI(api_key='sk-xxx')
    response = client.images.generate(
        model="dall-e-3",
        prompt=text,
        size="1024x1024"
    )
    try:
        # 画像のURLを取得
        image_url = response.data[0].url
        image_response = requests.get(image_url)
        print("---------image request.get--------")
        print(image_response)
        if image_response.status_code == 200:
            print('----------status200-----------')
            file_name = re.sub(r'\W+', '_', text)[:20] + '.png'
            print("---------image open--------")
            generated_img = Image.open(BytesIO(image_response.content))
            img = Image.open(BytesIO(image_response.content))

            # 画像をリサイズ
            print("---------image resize--------")
            img = img.resize((150, 150))

            print("---------image gray--------")
            # 画像をグレースケールに変換
            img = img.convert('L')

            print("---------file path--------")
            # 保存パスの設定
            file_path = os.path.join('generated_images', file_name)
            print("---------image save--------")
            # img.save(file_path)

            # SSIMの計算
            # ssim = compare_ssim(np.array(groundtruth_img), np.array(img))
            ssim = 0.1 #

            print("-------------response data-----------")
            # レスポンスの作成
            response_data = {
                'image': image_url,
                'ssim': ssim
            }
            print(response_data)
            return jsonify(response_data)
        else:
            print('--------------err-------------')
            return jsonify({'error': 'Failed to download image'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500
