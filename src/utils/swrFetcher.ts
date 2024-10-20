/**
 * swr fetcher
 * @template T return value type
 * @param key url
 * @returns fetcher
 */
export async function fetcher<T>(key: string) {
	const res = await fetch(key);
	if (!res.ok) {
		const error: FetcherErr = new Error(
			"An error occurred while fetching the data.",
		);
		// エラーオブジェクトに追加情報を付与します。
		error.info = await res.text();
		error.status = res.status;
		error.url = key;
		throw error;
	}

	return res.json() as Promise<T | null>;
}

export interface FetcherErr extends Error {
	status?: number;
	info?: string;
	url?: string;
}
