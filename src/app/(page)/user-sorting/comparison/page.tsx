import SortingPage from "~/app/(page)/user-sorting/_user-sorting/SortingPage";
import { USER_GROUP } from "~/rules/prisma";

export default function Page() {
	return (
		<div>
			<SortingPage group={USER_GROUP.COMPARISON} />
		</div>
	)
}