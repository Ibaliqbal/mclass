import CardClass from "@/components/card/card-class";

export default async function Home() {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
      {Array.from({ length: 20 }).map((_, i) => (
        <CardClass key={i} i={i} />
      ))}
    </div>
  );
}
