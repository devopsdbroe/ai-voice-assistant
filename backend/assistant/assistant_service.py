from utils.file_utils import persist_binary_file_locally, create_unique_tmp_file
from transcoding.transcoding_service import convert_file_to_readable_mp3
from audio_handling.audio_transcription_service import convert_audio_to_text
from chat.chat_service import handle_get_response_for_user
from audio_handling.audio_generation_service import convert_text_to_audio


# Persist the file on the local machine
def __get_transcoded_audio_file_path(data: bytes) -> str:
    local_file_path = persist_binary_file_locally(data, file_suffix="user_audio.mp3")
    local_output_file_path = create_unique_tmp_file(
        file_suffix="transcoded_user_audio.mp3"
    )
    convert_file_to_readable_mp3(
        local_input_file_path=local_file_path,
        local_output_file_path=local_output_file_path,
    )

    return local_output_file_path


async def handle_audio_from_user(file: bytes) -> str:
    """
    Entry point for generating AI audio
    """
    transcoded_user_audio_file_path = __get_transcoded_audio_file_path(file)
    transcript_content_text = convert_audio_to_text(transcoded_user_audio_file_path)
    text_content = transcript_content_text
    ai_text_reply = handle_get_response_for_user(text_content)
    generated_audio_ai = convert_text_to_audio(ai_text_reply)
    output_audio_local_file_path = persist_binary_file_locally(
        data=generated_audio_ai, file_suffix="ai_audio_reply.mp3"
    )

    return output_audio_local_file_path
