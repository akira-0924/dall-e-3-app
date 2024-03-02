# import os
# from pathlib import Path
# from typing import Generator, List
# #import matplotlib
# #import librosa
# #from librosa import display
# import streamlit as st
# import streamlit.components.v1 as stc
# import click
# from spleeter.separator import Codec
# #import matplotlib.pyplot as plt

# from utils import (ProcessingMode, SpleeterMode, SpleeterSettings,
#                    get_split_audio)

# UPLOAD_DIR = Path("./upload_files/")
# OUTPUT_DIR = Path("./output/")

# if 'audio_files' not in st.session_state:
#     st.session_state.audio_files = []
# if 'output_files' not in st.session_state:
#     st.session_state.output_files = []
# if 'spleeter_settings' not in st.session_state:
#     st.session_state.spleeter_settings = None
# if 'selected_music_file' not in st.session_state:
#     st.session_state.selected_music_file = None
# if 'selected_music_files' not in st.session_state:
#     st.session_state.selected_music_files = None


# def add_audio_files(audio_file: Path):
#     if(audio_file not in st.session_state.audio_files):
#         st.session_state.audio_files.append(audio_file)


# def save_uploaded_file(upload_file) -> Path:
#     os.makedirs(UPLOAD_DIR, exist_ok=True)
#     escaped_file_path = Path(upload_file.name)

#     if(escaped_file_path.stem[-1] == " "):
#         escaped_file_path = escaped_file_path.parent / \
#             f"{escaped_file_path.stem[:-1]}{escaped_file_path.suffix}"

#     file_path = UPLOAD_DIR / escaped_file_path
#     print(f"upload file:{file_path}")
#     with open(file_path, 'wb') as f:
#         f.write(upload_file.read())

#     return file_path


# st.title("Stem Player")

# # audio file uploader
# upload_files = st.file_uploader("Upload audio from local file", type=[
#     "wav", "mp3"], accept_multiple_files=True)

# for audio_file in upload_files:
#     upload_path = save_uploaded_file(audio_file)
#     add_audio_files(upload_path)

# current_mode = ProcessingMode.SINGLE
# selected_music: Path
# select_stems: SpleeterMode
# select_codec: Codec
# select_bitrate: int
# output_files_generator: Generator[Path, None, None]

# if(current_mode == ProcessingMode.SINGLE):
#     with st.form("single_mode"):
#         st.subheader("Mode: "+current_mode.value)
#         selected_music = st.selectbox(
#             "Select an audio file", st.session_state.audio_files,
#             format_func=lambda x: x.name)

#         select_stems = SpleeterMode.FIVESTEMS
#         select_codec = Codec.MP3
#         select_bitrate = 192
#         duaration_minutes = 60
#         use_16kHz = True
#         use_mwf = True

#         if st.form_submit_button("Split"):
#             if(selected_music == None or select_stems == None):
#                 st.error("Please select an audio file")

#             else:
#                 current_settings = SpleeterSettings(
#                     select_stems,
#                     select_codec,
#                     select_bitrate,
#                     use_mwf,
#                     use_16kHz,
#                     duaration_minutes*60
#                 )
#                 st.session_state.spleeter_settings = current_settings
#                 st.session_state.selected_music_file = selected_music
#                 st.session_state.output_files = []
#                 with st.spinner('Processing...'):
#                     output_files_generator, is_exist = get_split_audio(
#                         st.session_state.spleeter_settings,
#                         selected_music,
#                         OUTPUT_DIR)
#                     for x in output_files_generator:
#                         st.session_state.output_files.append(x)
#                 st.success("Done!")

#     with st.container():
#         st.subheader("Output")
#         if(st.session_state.selected_music_file != None and select_stems != None):
#             st.caption("Original: " +
#                        st.session_state.selected_music_file.name)
#             st.audio(str(selected_music))

#             for i, audio_file in enumerate(st.session_state.output_files):
#                 st.caption(audio_file.name)
#                 st.audio(str(audio_file))

#                 # wav, sr = librosa.load(audio_file)
#                 # fig, ax = plt.subplots()
#                 # librosa.display.waveplot(wav, sr=sr, x_axis="time", ax=ax)
#                 # st.pyplot(fig)




import streamlit as st
from openai import OpenAI
import requests
import os
import re
from PIL import Image
from io import BytesIO
from skimage.metrics import structural_similarity as compare_ssim
import numpy as np
from dotenv import load_dotenv
import logging
import pickle
import time
import boto3

load_dotenv(verbose=True)

st.set_page_config(
    page_title="MAD-DAY test App",
    page_icon="🧊",
    layout="wide",
    initial_sidebar_state="expanded",
    menu_items={
        'Get Help': 'https://www.extremelycoolapp.com/help',
        'Report a bug': "https://www.extremelycoolapp.com/bug",
        'About': "# This is a header. This is an *extremely* cool app!"
    }
)


st.title('MAD-Day用画像生成アプリ')

# 画像を保存するディレクトリの作成
os.makedirs('generated_images', exist_ok=True)

# 複数のプロンプト入力とボタンを設置
col_input, col_image = st.columns([1, 1])
with col_input:

    # groundtruth_path = 'base_image/shibuya.png'
    s3_client = boto3.client('s3')
    s3_object = s3_client.get_object(
    Bucket='image-bucket-20240228', Key='theme.png')
    image_data = BytesIO(s3_object['Body'].read())
    if image_data.getvalue():
        # 基準画像の読み込み
        st.header('お題')
        Image.open(image_data)
        groundtruth_img = Image.open(image_data)
        # お題画像
        st.image(image_data, width=500)
        groundtruth_img = groundtruth_img.convert('L')  # グレースケールに変換
        groundtruth_img = groundtruth_img.resize((150, 150))
    else:
        st.error('基準画像が見つかりません。')


    state_file = 'state.pkl'

    # imagesとimages_ssimの状態を保存
    def save_state(images, images_ssim, prompts):
        with open(state_file, 'wb') as f:
            pickle.dump((images, images_ssim, prompts), f)

    # imagesとimages_ssimの状態を読み込む
    def load_state():
        try:
            with open(state_file, 'rb') as f:
                print("参照")
                return pickle.load(f)
        except FileNotFoundError:
            print("エラー")
            return [], [], []

    # 起動時に状態を読み込む
    images, images_ssim, prompts = load_state()
    feature_image = []
    feature_image_ssim = []


    # 生成された画像とSSIMスコアを保持するリスト
    print(st.session_state)
    images = images
    images_ssim = images_ssim


RANGE = 2
st.title('')
for i in range(RANGE):
# with col_input:
    st.title('')
    prompt = st.text_area(f'プロンプト {i+1}')
    print(prompt)
    button = st.button(f'画像 {i+1} を生成する')

    # with col_images:

    # ボタンが押されたときに画像を生成
    if button and prompt:
        with st.spinner('画像生成中...'):
            prompts.append(prompt)
            print(images)
            print(images_ssim)
            print("---------------")
            # ファイル名をプロンプトから生成
            file_name = re.sub(r'\W+', '_', prompt)[:20] + '.png'

            # OpenAI APIを使用して画像を生成
            try:
                ssm = boto3.client('ssm', region_name='ap-northeast-1')
                response = ssm.get_parameters(
                    Names=[
                        '/openapi/API_KEY',
                    ],
                    WithDecryption=True
                )
                ssm_api_key =  response['Parameters'][0]['Value']
                client = OpenAI(api_key=ssm_api_key)

                response = client.images.generate(
                    model="dall-e-3",
                    prompt=prompt,
                    size="1024x1024"
                )
                # 画像のURLを取得
                image_url = response.data[0].url

                # 画像をダウンロードして保存
                response = requests.get(image_url)
                print(image_url)
                #images.append(image_url)

                if response.status_code == 200:
                    path = os.path.join('generated_images', file_name)
                    with open(path, "wb") as f:
                        f.write(response.content)

                    # PILを使用して画像サイズを調整
                    img = Image.open(BytesIO(response.content))
                    images.append(img)
                    feature_image.append(img)
                    # st.image(img, use_column_width=True, clamp=True,output_format='PNG')
                    img = img.resize((150, 150))

                    # 画像をリストに追加
                    img = img.convert('L')  # グレースケールに変換

                    # SSIM計算
                    ssim = compare_ssim(np.array(groundtruth_img), np.array(img))
                    images_ssim.append(ssim)
                    feature_image_ssim.append(ssim)
                    print(images)
                    print(images_ssim)
                    print(prompts)
                    save_state(images, images_ssim, prompts)

                message = st.success('画像生成成功')
                time.sleep(3)
                message.empty()

            except Exception as e:
                logging.exception("An error occurred:")
                st.error('Error message')
                print(e)
        
        st.text("")

with col_image:
    # 生成された画像と類似度を表示(履歴なし)
    for i in range(0, len(feature_image_ssim), RANGE):
        # cols = st.columns(RANGE)
        for j in range(RANGE):
            if i + j < len(feature_image_ssim):
                # with cols[j]:
                print(feature_image[j])
                st.header(f'生成画像{j + 1}')
                st.image(feature_image[i + j], width=500, clamp=True,output_format='PNG')
                st.subheader(f'類似度：{feature_image_ssim[i + j]}')


# 生成された画像と類似度を表示(履歴あり)
st.title('')
st.title('')
st.header('履歴')
for i in range(0, len(images_ssim), RANGE):
    cols = st.columns(RANGE)
    for j in range(RANGE):
        if i + j < len(images_ssim):
            with cols[j]:
                print(images[j])
                st.text(f'生成画像{j + 1}')
                st.image(images[i + j], width=300, clamp=True,output_format='PNG', caption=f'類似度: {images_ssim[i + j]}')
                st.text_area(value=prompts[i + j], disabled=True, label=f'プロンプト{i + j + 1}')

def clear_state():
    os.remove(state_file)

if st.button('履歴を削除する'):
    clear_state()
    st.success('履歴を削除しました')
