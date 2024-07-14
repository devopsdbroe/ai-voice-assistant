import os
import boto3
from dotenv import load_dotenv

load_dotenv()

aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
aws_region = os.getenv("AWS_REGION")

polly_client = boto3.client(
    "polly",
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=aws_region,
)


def convert_text_to_audio(text_content: str):
    response = polly_client.synthesize_speech(
        Engine="standard",
        LanguageCode="en-US",
        OutputFormat="mp3",
        Text=text_content,
        VoiceId="Matthew",
    )

    return response["AudioStream"].read()
