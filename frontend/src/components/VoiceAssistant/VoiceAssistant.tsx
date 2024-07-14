"use client";

import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";
import VoiceAssistantAvatar from "./VoiceAssistantAvatar";
import styles from "./VoiceAssistant.module.css";
import useVoiceAssistant from "@/hooks/useVoiceAssistant";
import ReactLoading from "react-loading";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

const VoiceAssistant = () => {
	const {
		handleUserVoiceRecorded,
		isLoading,
		lastAIReplyURL,
		handleAudioPlayEnd,
	} = useVoiceAssistant();

	return (
		<div className={styles["voice-assistant-component"]}>
			<VoiceAssistantAvatar />
			<VoiceRecorder onAudioRecordingComplete={handleUserVoiceRecorded} />
			{isLoading && (
				<ReactLoading
					type={"bars"}
					color={"#4287f5"}
					width={200}
				/>
			)}

			<AudioPlayer
				audioFileUrl={lastAIReplyURL}
				onAudioPlayEnd={handleAudioPlayEnd}
			/>
		</div>
	);
};
export default VoiceAssistant;
