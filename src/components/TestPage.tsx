import { ShadcnH2, ShadcnP } from "~/components/shadcnCustomized/Typography"

export default function TestPage(
    {
        count,
    }: {
        count: 1 | 2
    }
) {
    return (
        <div>
            <ShadcnH2>
                {count}回目テスト
            </ShadcnH2>

            <ShadcnP>
                {[
                    <>これからテストを始めます。</>,
                ]}
            </ShadcnP>
        </div>
    )
}