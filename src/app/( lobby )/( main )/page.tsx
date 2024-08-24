import CardClass from "@/components/card/card-class";
import Sidebar from "@/layouts/side/sidebar";

export default function Home() {
  return (
    <div className="grid grid-cols-5 gap-4 w-full px-4 mt-4">
      <Sidebar />
      <main className="col-span-4 grid lg:grid-cols-3 md:grid-cols-2 gap-3 pb-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <CardClass key={i} i={i} />
        ))}
      </main>
    </div>
  );
}
