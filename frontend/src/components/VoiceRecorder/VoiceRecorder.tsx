"use client";

import { useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

export interface VoiceRecorderProps {
	onAudioRecordingComplete: (audioData: Blob) => void;
}

const VoiceRecorder = ({ onAudioRecordingComplete }: VoiceRecorderProps) => {
	const recorderControls = useAudioRecorder();
	const [micAvailable, setMicAvailable] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Check for mic availability
	useEffect(() => {
		navigator.mediaDevices
			.enumerateDevices()
			.then((devices) => {
				const hasMicrophone = devices.some(
					(device) => device.kind === "audioinput"
				);
				setMicAvailable(hasMicrophone);

				if (!hasMicrophone) {
					setError(
						"No microphone detected. Please connect a microphone and try again."
					);
				}
			})
			.catch((err) => {
				setMicAvailable(false);
				setError("Error accessing media devices: " + err.message);
			});
	}, []);

	const startRecording = () => {
		if (micAvailable) {
			recorderControls.startRecording();
		} else {
			setError(
				"No microphone detected. Please connect a microphone and try again."
			);
		}
	};

	return (
		<div>
			{error && <div style={{ color: "red" }}>{error}</div>}
			{!error && (
				<>
					<AudioRecorder
						onRecordingComplete={onAudioRecordingComplete}
						recorderControls={recorderControls}
					/>
					{recorderControls.isRecording && (
						<button onClick={recorderControls.stopRecording}>
							Stop recording
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default VoiceRecorder;
