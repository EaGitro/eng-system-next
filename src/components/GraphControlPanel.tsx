"use client";
import { CircleHelp } from "lucide-react";
import { CSSProperties } from "react";
import { HelpDialog } from "~/components/HelpDialog";
import { ShadcnH2, ShadcnH3, ShadcnMuted, ShadcnP } from "~/components/shadcnCustomized/Typography";
import MultipleSelector, { Option } from "~/components/ui/multiple-selector"
import { cn } from "~/lib/utils";
import Image from "next/image";
import { shadcnH2, shadcnList } from "~/components/shadcnCustomized/TypographyClassName";
import GraphHelp from "~/components/GraphHelp";
import { Select, SelectContent, SelectTrigger, SelectValue } from "~/components/ui/select";


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
            <div className="flex  flex-col gap-5 px-5 items-end">
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
                <GraphHelp/>
            </div>
                    {/* <MultipleSelector/> */}
        </div>

    )
}