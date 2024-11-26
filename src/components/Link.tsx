"use client";
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { beforeunloadHandlerFunc } from "~/components/WatchUser";

interface CustomLinkProps extends ComponentProps<typeof NextLink> {
	userId?: string;
}
export default function Link({
	userId,
	href,
	children,
	...props
}: CustomLinkProps) {
	if (userId)
		return (
			<NextLink
				href={href}
				onClick={() => {
					beforeunloadHandlerFunc(userId);
				}}
				{...props}
			>
				{children}
			</NextLink>
		);

	return (
		<NextLink href={href} {...props}>
			{children}
		</NextLink>
	);
}
