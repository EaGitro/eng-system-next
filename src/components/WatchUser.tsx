"use client";
import { useEffect } from "react";

import type {
	WatchClickData,
	WatchClickProp,
	WatchClickType,
	WatchVisibilityProp,
} from "~/app/types/windowObject";

import {
	watchClickPropKey,
	watchUserLoaded,
	watchVisibilityPropKey,
} from "~/rules/windowObject";
import { isMobile } from "~/utils/isMobile";

declare global {
	interface Window {
		[watchVisibilityPropKey]: WatchVisibilityProp;
		[watchClickPropKey]: WatchClickProp<WatchClickType, object>;
		[watchUserLoaded]: boolean;
	}
}

export const watchVisibilityLoadFunc = (userId: string) => {
	console.log("watchVisibilityLoadFunc=========", location.pathname);
	const mobile = isMobile();
	const t = Date.now();
	const key = location.pathname;
	if (
		!(watchVisibilityPropKey in window) ||
		window[watchVisibilityPropKey] === undefined
	) {
		(window as any)[watchVisibilityPropKey] = {
			data: {
				[key]: [
					{
						e: t,
						s: t,
					},
				],
			},
			isMobile: mobile,
			userId: userId,
		} as WatchVisibilityProp;
	} else if (!window[watchVisibilityPropKey].data[key]) {
		window[watchVisibilityPropKey].data[key] = [
			{
				e: t,
				s: t,
			},
		];
	} else {
		window[watchVisibilityPropKey].data[key].push({
			e: t,
			s: t,
		});
	}
};

const watchVisibilityVisibilitychangeFunc = (userId: string) => {
	const mobile = isMobile();
	const t = Date.now();
	const key = location.pathname;
	if (
		!(watchVisibilityPropKey in window) ||
		window[watchVisibilityPropKey] === undefined
	) {
		(window as any)[watchVisibilityPropKey] = {
			data: {
				[key]: [
					{
						e: t,
						s: t,
					},
				],
			},
			isMobile: mobile,
			userId: userId,
		} as WatchVisibilityProp;
	} else if (!window[watchVisibilityPropKey].data[key]) {
		window[watchVisibilityPropKey].data[key] = [
			{
				e: t,
				s: t,
			},
		];
	}
	if (document.visibilityState === "visible") {
		console.log("visible", t);
		window[watchVisibilityPropKey].data[key].push({
			e: t,
			s: t,
		});
	} else {
		console.log("hidden", t);
		window[watchVisibilityPropKey].data[key][
			window[watchVisibilityPropKey].data[key].length - 1
		].e = t;
	}

	console.log(
		"visibilitychanged==========",
		document.visibilityState,
		window[watchVisibilityPropKey],
	);
};

const watchVisibilityBeforeunloadFunc = async (userId: string) => {
	const key = location.pathname;
	const t = Date.now();
	if (
		!(watchVisibilityPropKey in window) ||
		window[watchVisibilityPropKey] === undefined
	) {
		return;
	}
	if (window[watchVisibilityPropKey].data[key] !== undefined) {
		window[watchVisibilityPropKey].data[key][
			window[watchVisibilityPropKey].data[key].length - 1
		].e = t;
	}
	console.log(
		"watchVisibilityBeforeunloadFunc==========",
		key,
		window[watchVisibilityPropKey],
	);

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_USER_WATCHING_URL}/post/visibility/${userId}`,
		{
			body: JSON.stringify(window[watchVisibilityPropKey]),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		},
	);

	(window as any)[watchVisibilityPropKey] = undefined;

	return res;
};

const watchClickBeforeunloadFunc = async (userId: string) => {
	if (!window[watchClickPropKey]) {
		return;
	}
	console.log(
		"watchClickBeforeunloadFunc==============",
		window[watchClickPropKey],
	);
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_USER_WATCHING_URL}/post/click/${userId}`,
		{
			body: JSON.stringify(window[watchClickPropKey]),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		},
	);

	(window as any)[watchClickPropKey] = undefined;

	return res;
};

export const beforeunloadHandlerFunc = async (userId: string) => {
	console.log("popstate or beforeunload");
	const visi = watchVisibilityBeforeunloadFunc(userId);
	const click = watchClickBeforeunloadFunc(userId);

	const r = await Promise.all([visi, click]);

	return r;
};

export const watchClick = <T extends WatchClickType>(
	userId: string,
	type: T,
	data: WatchClickData<T>,
) => {
	const key = location.pathname;
	const t = Date.now();
	const mobile = isMobile();
	if (!window[watchClickPropKey]) {
		(window as any)[watchClickPropKey] = {
			data: {
				[key]: [
					{
						data: data,
						time: t,
						type: type,
					},
				],
			},
			isMobile: mobile,
			userId: userId,
		} as WatchClickProp<typeof type, typeof data>;
	} else if (!(key in (window as any)[watchClickPropKey].data)) {
		(window as any)[watchClickPropKey].data[key] = [
			{
				data: data,
				time: t,
				type: type,
			},
		];
	} else {
		(window as any)[watchClickPropKey].data[key].push({
			data: data,
			time: t,
			type: type,
		});
	}
};

const beforeunload_test = () => {
	window.alert("beforeunload_test");
};

const pageshow_test = () => {
	window.alert("pageshow_test");
};

export default function WatchUser({
	key,
	userId,
}: { key?: string; userId: string }) {
	// const key_ = key || usePathname()
	const watchVisibilityLoadHandler = () => {
		watchVisibilityLoadFunc(userId);
	};
	const watchVisibilityVisibilitychangeHandler = () => {
		watchVisibilityVisibilitychangeFunc(userId);
	};

	const beforeunloadHandler = async () => {
		console.log("popstate or beforeunload");
		const r = beforeunloadHandlerFunc(userId);
		console.log(r);
	};

	useEffect(() => {
		if (!(watchUserLoaded in window)) {
			watchVisibilityLoadFunc(userId);
			(window as any)[watchUserLoaded] = true;
		}
		document.addEventListener("load", watchVisibilityLoadHandler);

		document.addEventListener(
			"visibilitychange",
			watchVisibilityVisibilitychangeHandler,
		);

		document.addEventListener("beforeunload", beforeunloadHandler);
		// document.addEventListener("popstate", beforeunloadHandler)

		// ===========
		document.addEventListener("beforeunload", beforeunload_test);
		document.addEventListener("pageshow", pageshow_test);

		return () => {
			document.removeEventListener("load", watchVisibilityLoadHandler);
			document.removeEventListener(
				"visibilitychange",
				watchVisibilityVisibilitychangeHandler,
			);
			document.removeEventListener("beforeunload", beforeunloadHandler);
			// document.removeEventListener("popstate", beforeunloadHandler)

			document.removeEventListener("beforeunload", beforeunload_test);
			document.removeEventListener("pageshow", pageshow_test);
		};
	}, []);

	return <></>;
}
