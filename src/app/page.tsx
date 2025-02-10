"use client";

import { useChat } from "ai/react";

export default function Home() {
	const { messages, input, isLoading, handleInputChange, handleSubmit } =
		useChat();

	return (
		<div className="max-w-2xl mx-auto p-4">
			<div className="space-y-4 mb-4">
				{messages.map(message => (
					<div
						key={message.id}
						className={`p-4 rounded-lg ${
							message.role === "assistant"
								? "bg-gray-100"
								: "bg-blue-100"
						}`}
					>
						{message.content}
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} className="flex gap-2">
				<input
					value={input}
					onChange={handleInputChange}
					className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="How many r's are in the word 'strawberry'?"
				/>
				<button
					type="submit"
					disabled={isLoading}
					className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
				>
					Send
				</button>
			</form>
		</div>
	);
}
