export const CLICK_V2_BASEURL = `${process.env.NEXT_PUBLIC_USER_WATCHING_URL}/post/click-v2`;
export const CLICK_TYPE = {
	graph: "graph-click",
	startWordCard: "start-wordcard-click",
	wordCard: "wordcard-click"
} as const 
export type WordCardClick = {
	baseWord: string,
	clickedWord: string,
	date: Timestamp,
	path: string,
	synsetid: string,
	type: "wordcard-click",
}

export type GraphClick = {
	date: Timestamp,
	path: string,
	type: "graph-click",
	word: string
}

export type Timestamp = `${number}-${number}-${number}-${number}-${number}-${number}`;

export function generateTimestamp(): Timestamp {
	const now = new Date();
	const pad = (num: number) => num.toString().padStart(2, '0');
  
	const year = now.getFullYear();
	const month = pad(now.getMonth() + 1); 
	const day = pad(now.getDate());
	const hour = pad(now.getHours());
	const minute = pad(now.getMinutes());
	const second = pad(now.getSeconds());

	return `${year}-${month}-${day}-${hour}-${minute}-${second}` as Timestamp;
}