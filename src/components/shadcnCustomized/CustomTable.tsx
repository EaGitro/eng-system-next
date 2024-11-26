import React from "react"

import { TableHead } from "~/components/ui/table"
import { cn } from "~/lib/utils"

export const CustomTableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<th
		className={cn(
			"h-12 px-4 text-left align-middle font-bold [&:has([role=checkbox])]:pr-0",
			className
		)}
		ref={ref}
		{...props}
	/>
))
TableHead.displayName = "TableHead"