import { useEffect, useState } from "react";

import { Timer as LucideTimer } from "lucide-react";

export default function TimerTimeLeft({
	handleSubmit,
	totalSec,
}: { handleSubmit: () => void; totalSec: number }) {
	const [timeLeft, setTimeLeft] = useState(totalSec);
	const formatTime = (seconds: number) => {
		const mins = (seconds / 60) | 0;
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};
	useEffect(() => {
		if (timeLeft <= 0) {
			handleSubmit();
			return;
		}

		const timer = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft]);
	return (
		<div className="sticky w-fit bottom-4 left-full right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg flex items-center gap-2 text-indigo-600 border border-indigo-100">
			<LucideTimer className="w-4 h-4" />
			<span className="font-mono text-base">{formatTime(timeLeft)}</span>
		</div>
	);
}
