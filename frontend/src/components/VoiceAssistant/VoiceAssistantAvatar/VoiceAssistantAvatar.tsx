import styles from "@/components/VoiceAssistant/VoiceAssistant.module.css";
import useVoiceAssistantAvatar, {
	CANVAS_ORB_ID,
	UseVoiceAssistantAvatarProps,
} from "@/hooks/useVoiceAssistantAvatar";

const VoiceAssistantAvatar = (props: UseVoiceAssistantAvatarProps) => {
	useVoiceAssistantAvatar(props);

	return (
		<div className={styles["voice-assistant-avatar-wrapper"]}>
			<canvas
				id={CANVAS_ORB_ID}
				className={styles["voice-assistant-avatar-canvas"]}
			/>
		</div>
	);
};
export default VoiceAssistantAvatar;
