import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default function LoadingCard() {
	return (
		<Card className="h-full w-full">
			<CardHeader>
				<Skeleton className="scroll-m-20 h-14" />
			</CardHeader>

			<CardContent>
				<Skeleton
					style={{
						height: "90vw",
					}}
				/>
			</CardContent>
		</Card>
	);
}
