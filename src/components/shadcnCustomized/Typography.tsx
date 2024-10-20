export function ShadcnH1({
	children,
}: { children: string | JSX.Element | React.ReactNode }) {
	return (
		<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{children}
		</h1>
	);
}

export function ShadcnH2({
	children,
}: { children: string | JSX.Element | React.ReactNode }) {
	return (
		<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
			{children}
		</h2>
	);
}

export function ShadcnH3({
	children,
}: { children: string | JSX.Element | React.ReactNode }) {
	return (
		<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
			{children}
		</h3>
	);
}

export function ShadcnH4({
	children,
}: { children: string | JSX.Element | React.ReactNode }) {
	return (
		<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
			{children}
		</h4>
	);
}

export function ShadcnP({
	children,
}: { children: string | JSX.Element | React.ReactNode }) {
	return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

export function ShadcnBlockquote({
	children,
}: { children: string | JSX.Element | React.ReactNode }) {
	return (
		<blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
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
}: { children: string | JSX.Element | React.ReactNode }) {
	return <p className="text-sm text-muted-foreground">{children}</p>;
}
