import { createOpenAI } from "@ai-sdk/openai";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { createDataStreamResponse, streamText } from "ai";
import type { NextRequest } from "next/server";

// This works
// export async function POST(req: NextRequest) {
// 	const { messages } = await req.json();

// 	const openai = createOpenAI({
// 		apiKey: process.env.OPENAI_API_KEY,
// 	});

// 	const deepseek = createDeepSeek({
// 		apiKey: process.env.DEEPSEEK_API_KEY,
// 	});

// 	const result = streamText({
// 		onError: (error) => {
// 			console.error(error);
// 		},
// 		model: deepseek("deepseek-reasoner"), // deepseek("deepseek-reasoner"),
// 		messages: messages,
// 		onChunk: (chunk) => {
// 			if (chunk.chunk.type === "reasoning") {
// 				console.log("reasoning part", chunk.chunk.textDelta);
// 			}
// 			console.log(chunk);
// 		},
// 	});

// 	return result.toDataStreamResponse({
// 		sendReasoning: true,
// 		sendUsage: true,
// 	});
// }

// This does not
export async function POST(req: NextRequest) {
	const { messages } = await req.json();

	return createDataStreamResponse({
		execute: (dataStream) => {
			const openai = createOpenAI({
				apiKey: process.env.OPENAI_API_KEY,
			});

			const deepseek = createDeepSeek({
				apiKey: process.env.DEEPSEEK_API_KEY,
			});

			const result = streamText({
				onError: (error) => {
					console.error(error);
				},
				model: deepseek("deepseek-reasoner"), // deepseek("deepseek-reasoner"),
				messages: messages,
				onChunk: (chunk) => {
					if (chunk.chunk.type === "reasoning") {
						console.log("reasoning part", chunk.chunk.textDelta);
					}
					console.log(chunk);
				},
			});

			result.mergeIntoDataStream(dataStream, {
				sendReasoning: true,
				sendUsage: true,
			});
		},
	});
}
