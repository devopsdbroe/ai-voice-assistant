import tempfile
import os
from uuid import uuid4

TMP_FOLDER_NAME = "voice_assistant"


# Function to create folder if it doesn't already exist
def create_if_not_exists(path: str):
    if not os.path.exists(path):
        os.makedirs(path)


# Get temp file path from local machine
def get_tmp_folder_path():
    path = tempfile.gettempdir()
    path = os.path.join(path, TMP_FOLDER_NAME)
    create_if_not_exists(path)
    return path


# Create another temp file path inside parent temp folder
def get_unique_tmp_file_path():
    file_path = os.path.join(get_tmp_folder_path(), str(uuid4()))
    return file_path


def create_unique_tmp_file(file_suffix: str):
    return f"{get_unique_tmp_file_path()}_{file_suffix}"


def persist_binary_file_locally(data: bytes, file_suffix: str) -> str:
    file_path = create_unique_tmp_file(file_suffix)
    with open(file_path, "wb") as f:
        f.write(data)

    return file_path


if __name__ == "__main__":
    print(get_tmp_folder_path())
