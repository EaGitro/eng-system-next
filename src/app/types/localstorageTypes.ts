import type { WordData } from "~/app/types/wordnet";

type Prefix = "eng-system_";

export type LocalstorageWordinfoKey = `${Prefix}wordinfo+${number}`;

export type LocalStorageAllWordinfoKeysKey = `${Prefix}wordinfoKeys`;

export type LocalStorageObject<K extends string | number, V> = Record<K, V>;

export type LocalStorageWordinfoObject = LocalStorageObject<
	LocalstorageWordinfoKey,
	WordData[0]
>;

export type LocalStorageAllWordinfoKeys = LocalStorageObject<
	LocalStorageAllWordinfoKeysKey,
	number[]
>;
