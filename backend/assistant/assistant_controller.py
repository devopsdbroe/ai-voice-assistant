from fastapi import APIRouter, UploadFile
from fastapi.responses import FileResponse
from assistant.assistant_service import handle_audio_from_user

controller = APIRouter(prefix="/voice-assistant")


@controller.post("/audio-message", status_code=200)

# Receive file from the frontend form
async def handle_receive_audio_data(file: UploadFile):
    print("file_data >> ", file)

    # Extract binary from file
    file_data = await file.read()

    # Pass binary to service layer
    generated_ai_audio_file_path = await handle_audio_from_user(file_data)
    return FileResponse(
        generated_ai_audio_file_path, media_type="audio/mpeg", filename="ai_output"
    )
