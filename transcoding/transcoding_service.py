import os


# This function will call ffmpeg to transcode the file
def convert_file_to_readable_mp3(
    local_input_file_path: str, local_output_file_path: str
):
    os.system(f"ffmpeg -i {local_input_file_path} {local_output_file_path}")
