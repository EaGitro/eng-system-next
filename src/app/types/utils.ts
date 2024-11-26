type Expand_<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: Expand<O[K]> }
		: never
	: T;

export type Expand<T> = T extends
	| number
	| string
	| boolean
	| bigint
	| symbol
	| null
	| undefined
	? T
	: T extends (...args: infer A) => infer R
		? (...args: Expand<A>) => Expand<R>
		: T extends object
			? T extends infer O
				? { [K in keyof O]: Expand<O[K]> }
				: never
			: T;

type Builtin = Function | Date | Error | RegExp;

export type DeepReadonly<T> = T extends Builtin
	? T
	: { readonly [key in keyof T]: DeepReadonly<T[key]> };

export type Year = `${number}${number}${number}${number}`;
export type Month = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`;
export type Day =
	| `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
	| `${1 | 2}${number}`
	| `3${0 | 1}`;

export type YYYYMMDD = `${Year}-${Month}-${Day}`;
export type ObjectEntriesOf<T> = ([keyof T, T[keyof T]])[]