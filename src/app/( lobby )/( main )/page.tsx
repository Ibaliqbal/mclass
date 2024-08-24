import CardClass from "@/components/card/card-class";
import LayoutStudent from "@/layouts/student/layout-student";

export default function Home() {
  return (
    <LayoutStudent className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
      {Array.from({ length: 20 }).map((_, i) => (
        <CardClass key={i} i={i} />
      ))}
    </LayoutStudent>
  );
}
