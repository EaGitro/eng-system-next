import { CircleHelp } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

export function HelpDialog(
    {
        triggerClassName,
        titleClassName,
        title,
        desc,
        children,
        footer
    }: {
        triggerClassName?: string,
        titleClassName?: string
        title: string | JSX.Element,
        desc?: string | JSX.Element,
        children: string | JSX.Element | JSX.Element[],
        footer?: string | JSX.Element | JSX.Element[],
    }
) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button">
                    <CircleHelp className={triggerClassName} />
                </button>
            </DialogTrigger>
            <DialogContent
                className="overflow-y-scroll"
                style={{
                    maxHeight: "80vh",
                    maxWidth: "75vw"
                }}
            >
                <DialogHeader>
                    <DialogTitle className={titleClassName}>{title}</DialogTitle>
                    <DialogDescription>
                        {desc}
                    </DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    {footer}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
