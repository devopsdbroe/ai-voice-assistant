import Image from "next/image";
import styles from "./page.module.css";
import VoiceAssistant from "@/components/VoiceAssistant/VoiceAssistant";

export default function Home() {
	return (
		<main className={styles.main}>
			<VoiceAssistant />
		</main>
	);
}
