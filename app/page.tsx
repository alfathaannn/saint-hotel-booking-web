import Hero from "@/components/hero/hero";
import Main from "@/components/main/main";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <Hero />
      {/* Room & Estate */}
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Room & Estate</h1>
          <p className="py-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, officiis.</p>
        </div>
        <Main/>
      </div>
    </div>
  );
}
