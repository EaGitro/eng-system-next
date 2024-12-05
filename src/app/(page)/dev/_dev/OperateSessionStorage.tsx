"use client"

import { redirect } from "next/navigation"

import { SESSION_STORAGE_DEV_HASSESSION_KEY } from "~/app/(page)/dev/_dev/const"

export default function OperateSessionStorage() {
	const sessionStorageDate = sessionStorage.getItem(SESSION_STORAGE_DEV_HASSESSION_KEY)
	if (!sessionStorageDate){
		redirect("/dev/entry")
	}
	return (
		<>
		</>
	)
}