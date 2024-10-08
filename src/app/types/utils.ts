type Expand_<T> = T extends object
  ? T extends infer O
  ? { [K in keyof O]: Expand<O[K]> }
  : never
  : T


export type Expand<T> =
  T extends number | string | boolean | bigint | symbol | null | undefined
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends object
  ? T extends infer O
  ? { [K in keyof O]: Expand<O[K]> }
  : never
  : T;
