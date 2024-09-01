import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { classService } from "@/services/class";

const page = async ({ params }: { params: { code: string } }) => {
  const { data } = await classService.people(params.code);

  console.log(data);
  return (
    <div className="mt-4 flex flex-col gap-6 max-w-6xl container">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Pengajar</h2>
        <div className="flex items-center gap-3 pb-2 border-b border-gray-500">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={
                data.instructor.avatar
                  ? data.data.instructor.avatar
                  : `https://ui-avatars.com/api/?name=${data.instructor.name}&background=random&color=#000`
              }
              alt="Avatar"
              width={100}
              height={100}
              className="object-cover object-center rounded-full"
            />
          </Avatar>
          <h4>{data.instructor.name}</h4>
        </div>
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
              <div
                className="flex items-center gap-3 pb-2 border-b border-gray-500"
                key={i}
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={
                      student.avatar
                        ? student.avatar
                        : `https://ui-avatars.com/api/?name=${student.name}&background=random&color=#000`
                    }
                    alt="Avatar"
                    width={100}
                    height={100}
                    className="object-cover object-center rounded-full"
                  />
                </Avatar>
                <h4>{student.name}</h4>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default page;
