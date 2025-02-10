import { createOpenAI } from "@ai-sdk/openai";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { streamText } from "ai";
import dotenv from "dotenv";

dotenv.config();

async function main() {
	const openai = createOpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const deepseek = createDeepSeek({
		apiKey: process.env.DEEPSEEK_API_KEY,
	});

	const result = streamText({
		model: openai("o1-mini"), // deepseek("deepseek-reasoner"),
		prompt: "How many r's are in the word 'strawberry'?",
		onChunk: (chunk) => {
			if (chunk.chunk.type === "reasoning") {
				console.log("reasoning part", chunk.chunk.textDelta);
			}
			console.log(chunk);
		},
	});

	return result.toDataStream({
		sendReasoning: true,
		sendUsage: true,
	});
}

main()
	.then(async (stream) => {
		for await (const chunk of stream) {
			const streamDataChunk = new TextDecoder().decode(chunk);
			console.log({ streamChunk: streamDataChunk });
		}
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
