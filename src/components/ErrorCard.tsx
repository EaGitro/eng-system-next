import { ShadcnH2 } from "~/components/shadcnCustomized/Typography";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export function ErrorCard({
	errmsg,
	info,
	status,
	url,
}: {
	errmsg: string;
	info?: string;
	status?: number;
	url: string;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<ShadcnH2>{errmsg}</ShadcnH2>
				</CardTitle>
				<CardDescription>
					<p> url/endpoint: {url} </p>
					{status ? <p>status: {status}</p> : ""}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{info ?? ""}</p>
			</CardContent>
		</Card>
	);
}
