from openai import OpenAI
import dotenv

dotenv.load_dotenv()

openai = OpenAI()


def convert_audio_to_text(local_input_file_path: str) -> str:
    response = openai.audio.transcriptions.create(
        model="whisper-1", file=open(local_input_file_path, "rb")
    )

    # Debugging line to inspect the response object
    print(type(response))
    print(response)

    # Accessing the text from the response
    return response.text
