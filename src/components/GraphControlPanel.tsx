"use client";
import type { CSSProperties } from "react";

import GraphHelp from "~/components/GraphHelp";
import MultipleSelector, {
	type Option,
} from "~/components/ui/multiple-selector";
import { cn } from "~/lib/utils";

export default function GraphControlPanel({
	className,
	multipleSelectorDefaultOptions,
	multipleSelectorOnChange,
	style,
}: {
	className?: string;
	multipleSelectorDefaultOptions: Option[];
	multipleSelectorOnChange: (options: Option[]) => void;
	style?: CSSProperties;
}) {
	return (
		<div className={cn(className)} style={style}>
			<div className="flex  flex-col gap-5 px-5 items-end">
				<MultipleSelector
					defaultOptions={multipleSelectorDefaultOptions}
					emptyIndicator={
						<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
							no results found.
						</p>
					}
					onChange={multipleSelectorOnChange}
					placeholder="Select and focus words you like..."
				/>
				<GraphHelp />
			</div>
			{/* <MultipleSelector/> */}
		</div>
	);
}
