//S3 アップロード
aws s3 cp --recursive --region ap-northeast-1 build s3://spa-20240302

//ビルド
docker build --platform amd64 -t akira0924/dall-e-3-app-backend:latest .
//プッシュ
docker push akira0924/dall-e-3-app-backend:latest

-----EC2------
//プル
sudo docker pull akira0924/dall-e-3-app-backend:latest

//run
sudo docker run -d -p 80:5000 akira0924/dall-e-3-app-backend:latest
