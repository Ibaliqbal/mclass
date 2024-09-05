import CardPeople from "@/components/card/card-people";
import { classService } from "@/services/class";
import { seo } from "@/utils/helper";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { code: string };
}): Metadata => {
  return seo(
    `Class ${params.code} - Overview of Students and Instructors`,
    `This page provides a complete list of all students and instructors for class ${params.code}, including their roles and contact information.`,
    `/c/${params.code}/people`
  );
};

const page = async ({ params }: { params: { code: string } }) => {
  const { data } = await classService.people(params.code);

  console.log(data);
  return (
    <div className="mt-6 flex flex-col gap-6 max-w-6xl container">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Pengajar</h2>
        <CardPeople {...data.instructor} withBorder={false} />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Siswa</h2>
        <div className="flex flex-col gap-4">
          {data.students.map(
            (
              student: {
                name: string;
                avatar: string;
              },
              i: number
            ) => (
              <CardPeople key={i} {...student} withBorder />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default page;
