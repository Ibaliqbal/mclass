import CardSubjectMatter from "@/components/card/card-subject-matter";
import { TSubmission } from "@/lib/db/schema";
import { classService } from "@/services/class";
import { seo } from "@/utils/helper";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { code: string };
}): Metadata => {
  return seo(
    `Class ${params.code} - Explore materials and tasks related to this class`,
    `This page provides an overview of the class materials and tasks associated with code ${params.code}, including submission details and feedback.`,
    `/c/${params.code}`
  );
};

const page = async ({ params }: { params: { code: string } }) => {
  const { data } = await classService.forum(params.code);

  return (
    <div className="mt-4 flex flex-col gap-4 container max-w-6xl">
      {data.data.map(
        (
          task: Pick<
            TSubmission,
            "createdAt" | "id" | "title" | "type" | "updatedAt"
          > & {
            code: string;
          },
          i: number
        ) => (
          <CardSubjectMatter key={i} index={i} {...task} />
        )
      )}
    </div>
  );
};

export default page;
