import boto3
from openai import OpenAI
def generateImage(text):

    # ssm = boto3.client('ssm', region_name="ap-northeast-1")
    # ssm_response = ssm.get_parameters(
    #     Names=[
    #         "/openapi/API_KEY",
    #     ],
    #     WithDecryption=True
    # )
    # print(ssm_response['Parameters'][0]['Value'])
    # ssm_api_key = ssm_response['Parameters'][0]['Value']
    # client = OpenAI(api_key=ssm_api_key)

    # response = client.images.generate(
    #     model="dall-e-3",
    #     prompt=prompt,
    #     size="1024x1024"
    # )
    return "ssm_api_key"