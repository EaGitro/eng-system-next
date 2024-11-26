import type { JSX } from "react";

import { CircleHelp } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";

export function HelpDialog({
	children,
	desc,
	footer,
	title,
	titleClassName,
	triggerClassName,
}: {
	children: string | JSX.Element | JSX.Element[];
	desc?: string | JSX.Element;
	footer?: string | JSX.Element | JSX.Element[];
	title: string | JSX.Element;
	titleClassName?: string;
	triggerClassName?: string;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button type="button">
					<CircleHelp className={triggerClassName} />
				</button>
			</DialogTrigger>
			<DialogContent
				className="overflow-y-scroll"
				style={{
					maxHeight: "80vh",
					maxWidth: "75vw",
				}}
			>
				<DialogHeader>
					<DialogTitle className={titleClassName}>{title}</DialogTitle>
					<DialogDescription>{desc}</DialogDescription>
				</DialogHeader>
				{children}
				<DialogFooter>{footer}</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
