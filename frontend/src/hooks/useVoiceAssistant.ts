import { getAIReplyOutput } from "@/services/AIVoiceAssistant";
import { useState } from "react";

const useVoiceAssistant = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [lastAIReplyURL, setLastAIReplyURL] = useState<string | undefined>(
		undefined
	);
	const handleUserVoiceRecorded = async (userAudioData: Blob) => {
		setIsLoading(true);
		const result = await getAIReplyOutput(userAudioData);

		if (result) {
			// Creating blob URL from the result of API call
			const url = URL.createObjectURL(result);
			setLastAIReplyURL(url);
		}

		setIsLoading(false);
	};

	const handleAudioPlayEnd = () => {
		setLastAIReplyURL(undefined);
	};

	return {
		handleUserVoiceRecorded,
		isLoading,
		lastAIReplyURL,
		handleAudioPlayEnd,
	};
};
export default useVoiceAssistant;
