from utils.file_utils import persist_binary_file_locally, create_unique_tmp_file
from transcoding.transcoding_service import convert_file_to_readable_mp3


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
