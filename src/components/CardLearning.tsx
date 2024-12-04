import Link from "~/components/Link";
import {
	ShadcnH2,
	ShadcnMuted,
	ShadcnP,
} from "~/components/shadcnCustomized/Typography";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { WORD_LIST_ORDERED } from "~/rules/wordlist";

export default function CardLearning({
	userId,
}: {
	userId: string;
}) {
	// 100 個の単語があるので 10個づつの section に分ける
	const sections: (readonly string[])[] = WORD_LIST_ORDERED.map(
		(sec) => sec.words,
	);
	return (
		<Accordion className="p-2" type="multiple">
			{sections.map((section, i) => (
				<AccordionItem className="px-6 "  key={`section-${i + 1}`} value={section.join(", ")}>
					<AccordionTrigger className="py-0">
						<ShadcnH2 className={"pt-12 pb-16 text-left border-0"}>
							Section {i + 1}
							<ShadcnMuted
								className={
									"block text-ellipsis whitespace-nowrap overflow-hidden px-3"
								}
							>
								{section.join(", ")}
							</ShadcnMuted>
						</ShadcnH2>
					</AccordionTrigger>
					<AccordionContent
						className={"flex justify-between items-center ps-2"}
					>
						<ShadcnP>ここでは {section.join(", ")} を勉強します</ShadcnP>
						<Button asChild>
							<Link href={`/learning/words/${i}`} userId={userId}>
								Start!
							</Link>
						</Button>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
