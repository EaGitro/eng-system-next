"use client"
import NextLink from "next/link"
import { ComponentProps, ReactNode } from "react"
import { Url } from "url"
import { beforeunloadHandlerFunc, watchVisibilityLoadFunc } from "~/components/WatchUser"



interface CustomLinkProps extends ComponentProps<typeof NextLink> {
    userId?: string
}
export default function Link({ userId, href, children, ...props }: CustomLinkProps) {

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
    )
}