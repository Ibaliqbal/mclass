import CardPeople from "@/components/card/card-people";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { classService } from "@/services/class";

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
