import { useEffect } from "react";
import { AUDIO_ELEMENT_ID } from "@/components/AudioPlayer/AudioPlayer";

const getAudioContext = (): AudioContext => {
	return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export interface UseAudioBarsVisualizerProps {
	audioFileUrl?: string;
}

const MAX_DECIBELS = -90;
const MIN_DECIBELS = -10;
const SMOOTHING_TIME_CONSTANT = 0.85; // The larger the number, the smoother the animation
const FFT_SIZE = 256; // Must be power of 2. The larger the number, the more bars that are drawn on screen

export const AUDIO_BARS_CANVAS_ID = "visualizer";

// Helper function to map a value from one range to another
function map(
	value: number,
	inMin: number,
	inMax: number,
	outMin: number,
	outMax: number
) {
	return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const useAudioBarsVisualizer = ({
	audioFileUrl,
}: UseAudioBarsVisualizerProps) => {
	const init = async () => {
		const audioCtx = getAudioContext();

		let source: MediaElementAudioSourceNode | undefined;

		const audioElement = document.querySelector(`#${AUDIO_ELEMENT_ID}`);

		if (!audioElement) {
			console.error("audioElement not found");
			return;
		}

		source = audioCtx.createMediaElementSource(
			audioElement as HTMLMediaElement
		);

		const analyser = audioCtx.createAnalyser();
		analyser.minDecibels = MAX_DECIBELS;
		analyser.maxDecibels = MIN_DECIBELS;
		analyser.smoothingTimeConstant = SMOOTHING_TIME_CONSTANT;

		const canvas: HTMLCanvasElement | null = document.querySelector(
			`#${AUDIO_BARS_CANVAS_ID}`
		);

		if (!canvas) return;

		const canvasCtx = canvas.getContext("2d");

		// Fix for blurry bars on screen
		canvas.setAttribute("width", window.innerWidth + "px");

		visualize();

		function visualize() {
			if (!canvas || !canvasCtx) return;

			const WIDTH = canvas.width;
			const HEIGHT = canvas.height;

			analyser.fftSize = FFT_SIZE;

			const bufferLengthAlt = analyser.frequencyBinCount;

			const dataArrayAlt = new Uint8Array(bufferLengthAlt);

			canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

			const drawAlt = function () {
				if (!source) {
					console.log("Source is undefined when drawing");
					return;
				}

				source.connect(analyser);
				source.connect(audioCtx.destination);

				requestAnimationFrame(drawAlt);

				analyser.getByteFrequencyData(dataArrayAlt);

				canvasCtx.canvas.style.imageRendering = "auto";

				canvasCtx.fillStyle = "rgb(0, 0, 0)";
				canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

				const barWidth = (WIDTH / bufferLengthAlt) * 2.5;
				let barHeight;
				let x = 0;

				// Draw the bars
				for (let i = 0; i < bufferLengthAlt; i++) {
					barHeight = dataArrayAlt[i];

					// Map barHeight to a hue value between 0 (green) and 60 (red/orange)
					// Smaller bars will be green, while taller bars will be red/orange
					const hue = map(barHeight, 0, HEIGHT, 120, 30);
					canvasCtx.fillStyle = "hsl(" + hue + ",100%,50%";
					canvasCtx.fillRect(
						x,
						HEIGHT - barHeight / 2,
						barWidth,
						barHeight / 2
					);

					x += barWidth + 1;
				}
			};

			drawAlt();
		}
	};

	useEffect(() => {
		if (audioFileUrl) {
			init();
		}
	}, [audioFileUrl]);

	return null;
};

export default useAudioBarsVisualizer;
