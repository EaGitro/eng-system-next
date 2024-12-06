import { type Dispatch, type SetStateAction, useState } from "react";

import type { TEST_DATA } from "~/app/(page)/test/_test-page/type";

import { RadioGroupContainer, RadioGroupItem } from "~/app/(page)/test/_test-page/RadioGroup";
import { SENTENCE_MATCH_USER_CHOICE_TABLE } from "~/app/(page)/test/_test-page/const";
import { CustomTableHead } from "~/components/shadcnCustomized/CustomTable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export default function MatchingTable({
	className,
	secData,
	setMatch
}: {
	className?: string;
	secData: TEST_DATA[number];
	setMatch: Dispatch<SetStateAction<Record<string, number>>>
}) {
	const [validateCol, setValidateCol] = useState<Record<`${number}`, string>>({});
	const onSelectionChange = (val: string) => {
		const [word, num_] = val.split("-");
		const num = Number(num_);
		setMatch((pre) => {
			const newmatch = { ...pre };
			newmatch[word] = num;
			return newmatch;
		});
		setValidateCol((pre) => {
			const newV = Object.fromEntries((
				Object.entries(pre)
					.filter(([, vword]) => (word !== vword))
					.map(([vnum, vword]) => (word == vword) ? [] : [vnum, vword])
			));
			newV[`${num}`] = word;
			console.log("validateCol====", newV)
			return newV;
		});
		console.log("word - num", word, num)
	};
	return (
		<div className={className}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Word\choice</TableHead>
						{secData.choices.flatMap((choice) =>
							choice ? <CustomTableHead key={`choice-${choice}`}>{choice}</CustomTableHead> : [],
						)}
						<CustomTableHead>None fo the above</CustomTableHead>
						<TableHead>わからない</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{secData.words.map((word) => (
						<TableRow className={""} key={`word-${word}`}>
							<RadioGroupContainer
								defaultValue={`${word}-${0}`}
								globalName={`MatchingTable-${word}`}
								onValueChange={onSelectionChange}
							>
								<TableCell>{word}</TableCell>
								{secData.choices.flatMap((choice, i) => {
									if (!choice) {
										return [];
									}
									const radiogroupId = `MatchingTable-radio-${word}-${i}`
									const disabled = (
										validateCol[`${i}`] == word ||
										validateCol[`${i}`] == undefined
									) ? false
										: true
									return (
										<TableCell className="hover:bg-muted/100 p-0" key={`${word}-${i}`}>
											{/* <div className={cn("w-full h-full") }> */}
											<label className={`w-full h-full flex items-center justify-center py-2 ${disabled?"cursor-not-allowed":"cursor-pointer"}`} htmlFor={radiogroupId}>
												<RadioGroupItem
													className={"scale-150"}
													disabled={disabled}
													id={radiogroupId}
													value={`${word}-${i}`}
												/>
											</label>
											{/* </div> */}
										</TableCell>
									);
								})}
								<TableCell className="hover:bg-muted/100">
									<div className="w-full h-full">
										<label className="w-full h-full block cursor-pointer" >
											<RadioGroupItem 
												className="scale-150" 
												value={`${word}-${SENTENCE_MATCH_USER_CHOICE_TABLE.NONE_OF_ABOVE}`}
											/>
										</label>
									</div>
								</TableCell>
								<TableCell className="hover:bg-muted/100">
									<div className="w-full h-full">
										<label className="w-full h-full block cursor-pointer" >
											<RadioGroupItem 
												className="scale-150" 
												value={`${word}-${SENTENCE_MATCH_USER_CHOICE_TABLE.I_DONT_KNOW}`}
											/>
										</label>
									</div>
								</TableCell>
							</RadioGroupContainer>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
