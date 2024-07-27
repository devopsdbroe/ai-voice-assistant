import useAudioBarsVisualizer, {
	UseAudioBarsVisualizerProps,
	AUDIO_BARS_CANVAS_ID,
} from "@/hooks/useAudioBarsVisualizer";
import styles from "@/components/VoiceAssistant/VoiceAssistant.module.css";

const AudioBarsVisualizer = (props: UseAudioBarsVisualizerProps) => {
	const { audioFileUrl } = props;
	useAudioBarsVisualizer(props);

	if (!audioFileUrl) return null;

	return (
		<canvas
			id={AUDIO_BARS_CANVAS_ID}
			className={styles["voice-assistant-audio-visualizer-canvas"]}
		/>
	);
};

export default AudioBarsVisualizer;
