import React, { useState } from "react";

interface CodeBlockProps {
	code: string;
}

const CpCodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000); 
		} catch (error) {
			console.error("コピーに失敗しました", error);
		}
	};

	return (
		<div className="relative bg-gray-900 text-white rounded-lg p-4 shadow-md">
			<pre className="overflow-x-auto text-sm whitespace-pre-wrap">{code}</pre>
			<button
				className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm"
				onClick={handleCopy}
			>
				{isCopied ? "コピー済み!" : "コピー"}
			</button>
		</div>
	);
};

export default CpCodeBlock;
