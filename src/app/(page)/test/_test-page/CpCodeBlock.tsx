import React, { useState } from "react";

import { generateTimestamp } from "~/rules/clickdata";

interface CodeBlockProps {
	code: string;
	prePost: "pre" | "post"
}

const CpCodeBlock: React.FC<CodeBlockProps> = ({ code, prePost }) => {
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

	const handleDownload = () => {
		const blob = new Blob([code], { type: "text/plain" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = `test-result-${prePost}-${generateTimestamp()}.txt`;
		link.click()
		URL.revokeObjectURL(link.href)
	}

	return (
		<div>
			<button
				className="bg-blue-700 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
				onClick={handleDownload}
			>
				ダウンロード
			</button>
			<div className="relative bg-gray-900 text-white rounded-lg p-4 shadow-md">
				<pre className="overflow-x-auto text-sm whitespace-pre-wrap">{code}</pre>
				<button
					className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm"
					onClick={handleCopy}
				>
					{isCopied ? "コピー済み!" : "コピー"}
				</button>

			</div>
		</div>
	);
};

export default CpCodeBlock;
