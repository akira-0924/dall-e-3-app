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
import pykakasi
from dotenv import load_dotenv
import random
import string

def generateImage(text, base_image):
    load_dotenv()
    os.makedirs('../ai-front/public/generated_images', exist_ok=True)

    images = []
    s3_client = boto3.client('s3')
    s3_object = s3_client.get_object(
    Bucket='image-20240304', Key='theme1.png')
    image_data = BytesIO(s3_object['Body'].read())
    Image.open(image_data)
    groundtruth_img = Image.open(image_data)
    groundtruth_img = groundtruth_img.convert('L')
    groundtruth_img = groundtruth_img.resize((150, 150))

    ssm = boto3.client('ssm', region_name='ap-northeast-1')
    ssm_response = ssm.get_parameters(
        Names=[
            '/openapi/API_KEY',
        ],
        WithDecryption=True
    )
    ssm_api_key =  ssm_response['Parameters'][0]['Value']
    client = OpenAI(api_key=ssm_api_key)

    # client = OpenAI(api_key=os.getenv('OPEN_AI_API_KEY'))
    response = client.images.generate(
        model="dall-e-3",
        prompt=text,
        size="1024x1024"
    )
    try:
        # 画像のURLを取得
        image_url = response.data[0].url
        image_response = requests.get(image_url)
        if image_response.status_code == 200:
            kks = pykakasi.kakasi()
            text_list = [text]
            result = kks.convert(text_list[0])
            file_name = ''.join(random.choices(string.ascii_uppercase, k=5))
            path = os.path.join('../ai-front/public/generated_images', file_name + '.png')
            with open(path, "wb") as f:
                f.write(image_response.content)
            img = Image.open(BytesIO(image_response.content))

            img = img.resize((150, 150))
            img = img.convert('L')

            # SSIMの計算
            ssim = compare_ssim(np.array(groundtruth_img), np.array(img))

            response_data = {
                'image': image_url,
                'ssim': ssim,
                'prompt': text
            }
            return jsonify(response_data)
        else:
            return jsonify({'error': 'Failed to download image'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500
