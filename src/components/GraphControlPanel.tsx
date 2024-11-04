"use client";
import { CSSProperties } from "react";
import MultipleSelector, { Option } from "~/components/ui/multiple-selector"
import { cn } from "~/lib/utils";



export default function GraphControlPanel(
    {
        className,
        style,
        multipleSelectorDefaultOptions,
        multipleSelectorOnChange,
    }: {
        className?: string,
        style?: CSSProperties,
        multipleSelectorDefaultOptions: Option[]
        multipleSelectorOnChange: (options: Option[]) => void,
    }
) {
    return (
        <div className={cn(className)} style={style}>
            <div className="flex w-full flex-col gap-5 px-10">
                <MultipleSelector
                    onChange={multipleSelectorOnChange}
                    defaultOptions={multipleSelectorDefaultOptions}
                    placeholder="Select and focus words you like..."
                    emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                        </p>
                    }
                />
            </div>
        </div>

    )
}