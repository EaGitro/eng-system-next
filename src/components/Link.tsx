"use client";
import type { ComponentProps } from "react";

import NextLink from "next/link";

import { beforeunloadHandlerFunc } from "~/components/WatchUser";

interface CustomLinkProps extends ComponentProps<typeof NextLink> {
	userId?: string;
}
export default function Link({
	children,
	href,
	userId,
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
