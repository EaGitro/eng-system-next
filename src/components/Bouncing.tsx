import type { MouseEventHandler } from "react";
import { useState } from "react";

import { cn } from "~/lib/utils";

export default function Bouncing({ children, className, defaultBouncing = true, onClick = function(){} }: {
	children: React.ReactNode,
	className?: string,
	defaultBouncing?: boolean,
	onClick?: MouseEventHandler<HTMLDivElement>
}) {
	const [bouncing, setBouncing] = useState(defaultBouncing)


	return (
		<div className={cn((bouncing && "animate-bounce"), className)} onClick={(e) => { setBouncing(false); onClick(e) }}>
			{children}
		</div>
	);
}