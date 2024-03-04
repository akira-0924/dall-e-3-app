FROM python:3.8-slim-buster
# FROM --platform=linux/amd64 python:3.8-slim-buster

# Docker Image内で実行される作業ディレクトリ(Path)を指定する: ない場合は作ってくれます。
WORKDIR /usr/src/app

# Flask環境変数: Dockerコンテナ内で、Flaskがアプリケーションを正しく検出し、起動できるようになります。
ENV FLASK_APP=app

# Hostマシンのディレクトリ・ファイル を Container側のPathに COPY(追加)する
COPY ./app ./

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

# RUNコマンド: Docker Image内で、コマンドを実行する
# pipを最新バージョンに更新する
RUN pip install --upgrade pip
RUN pip install openai
RUN pip install boto3
RUN pip install scikit-image
RUN pip install pip install --no-cache-dir -r requirements.txt

# パッケージをキャッシュせずにインストール & -rオプションで、依存パッケージを一括インストール
RUN pip install --no-cache-dir -r requirements.txt

# Flaskの起動コマンド
CMD ["flask", "run", "--host=0.0.0.0"]