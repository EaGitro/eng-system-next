import type { PropsWithChildren } from "react";

import { cn } from "~/lib/utils";

export function ShadcnH1({
	children,
	className,
	style,
}: {
	children: string | JSX.Element | React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<h1
			className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
			style={style}
		>
			{children}
		</h1>
	);
}

export function ShadcnH2({
	children,
	className,
	style,
}: {
	children: string | JSX.Element | React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<h2
			className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
			style={style}
		>
			{children}
		</h2>
	);
}

export function ShadcnH3({
	children,
	className,
	style,
}: {
	children: string | JSX.Element | React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<h3
			className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
			style={style}
		>
			{children}
		</h3>
	);
}

export function ShadcnH4({
	children,
	className,
	style,
}: {
	children: string | JSX.Element | React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<h4
			className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
			style={style}
		>
			{children}
		</h4>
	);
}

export function ShadcnP({
	children,
	className,
	style,
}: {
	children: string | JSX.Element | React.ReactNode | string[] | JSX.Element[];
	className?: string;
	style?: React.CSSProperties;
}) {
	if (Array.isArray(children)) {
		return (
			<>
				{children.map((p, i) => {
					return (
						<p
							className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}
							key={`ShadcnP-${i}`}
							style={style}
						>
							{p}
						</p>
					);
				})}
			</>
		);
	}
	return (
		<p
			className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}
			style={style}
		>
			{children}
		</p>
	);
}

export function ShadcnBlockquote({
	children,
	className,
	style,
}: {
	children: string | JSX.Element | React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<blockquote
			className={`mt-6 border-l-2 pl-6 italic ${className}`}
			style={style}
		>
			{children}
		</blockquote>
	);
}

// export function ShadcnList({ children, key }: { children: (string | JSX.Element | JSX.Element[] | string[])[], key: string }) {
//     const cssClass = "my-6 ml-6 list-disc [&>li]:mt-2";
//     let Lists: JSX.Element;
//     const rfunc = (li: (string | JSX.Element | JSX.Element[] | string[])[], key: string) => {
//         let elm = <ul className={cssClass}>{

//         }</ul>;
//     }
//     return (
//         <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
//             {children.map((item, index) => (
//                 <li key={String(index) + "-li"}>
//                     {Array.isArray(item) ? (
//                         <ShadcnList children={item} /> // 再帰
//                     ) : (
//                         item
//                     )}
//                 </li>
//             ))}
//         </ul>
//     );
// }
export const ShadcnListCss = "my-6 ml-6 list-disc [&>li]:mt-2";

export function ShadcnMuted({
	children,
	className,
	style,
}: {
	children: string | JSX.Element | React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<p className={`text-sm text-muted-foreground ${className}`} style={style}>
			{children}
		</p>
	);
}


export function ShadcnInlinecode({
	children, className, style
}: PropsWithChildren<{ className?: string, style?: React.CSSProperties }>) {
	return (
		<code 
			className={cn(`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`, className)}
			style={style}
		>
			{children}
		</code>
	)
}