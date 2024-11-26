import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

import { cn } from "~/lib/utils";

const RadioGroupvalueContext = createContext("");
const RadioGroupsetValueContext = createContext<(value: string) => void>(() => undefined)
const RadioGroupNameContext = createContext("")

export const RadioGroupContainer = (
	{ children, defaultValue, globalName, onValueChange }:
	PropsWithChildren<{
		defaultValue?: string,
		globalName: string,
		onValueChange: (value: string) => void
	}>
) => {
	const [value, setValue] = useState(defaultValue ?? "");
	const setSelectedValue = (value: string) => {
		console.log("RadioGroupContainer setSelectedValue")
		setValue(value);
		onValueChange(value)
	}
	return (
		<RadioGroupNameContext.Provider value={globalName}>
			<RadioGroupsetValueContext.Provider value={setSelectedValue}>
				<RadioGroupvalueContext.Provider value={value}>
					{children}
				</RadioGroupvalueContext.Provider>
			</RadioGroupsetValueContext.Provider>
		</RadioGroupNameContext.Provider>
	)
}

export const RadioGroupItem = ({ className, disabled, id, value }: { className?:string, disabled?: boolean, id?: string, value: string }) => {
	const name = useContext(RadioGroupNameContext);
	const setValue = useContext(RadioGroupsetValueContext);
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log("RadioGroupItem onChange")
		setValue(event.target.value)
	}

	return (
		<input
			className={disabled?cn("disabled:cursor-not-allowed disabled:opacity-50",className):className}
			disabled={disabled}
			id={id}
			name={name}
			onChange={onChange}
			type="radio"
			value={value}
		/>
	)
}
