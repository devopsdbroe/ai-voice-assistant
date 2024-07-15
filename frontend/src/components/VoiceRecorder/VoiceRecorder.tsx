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
		const checkMicrophone = async () => {
			try {
				const devices = await navigator.mediaDevices.enumerateDevices();
				const hasMicrophone = devices.some(
					(device) => device.kind === "audioinput"
				);
				setMicAvailable(hasMicrophone);

				if (hasMicrophone && !micAvailable) {
					// Trigger page reload if a mic is detected and wasn't previously available
					window.location.reload();
				} else if (!hasMicrophone) {
					setError(
						"No Microphone detected. Please connect a microphone and try again."
					);
				}
			} catch (err: any) {
				setMicAvailable(false);
				setError("Error accessing media devices: " + err.message);
			}
		};

		const interval = setInterval(checkMicrophone, 3000);

		return () => clearInterval(interval);
	}, [micAvailable]);

	return (
		<div>
			{error && <div style={{ color: "red" }}>{error}</div>}
			{!error && (
				<AudioRecorder
					onRecordingComplete={onAudioRecordingComplete}
					recorderControls={recorderControls}
				/>
			)}
		</div>
	);
};
export default VoiceRecorder;
