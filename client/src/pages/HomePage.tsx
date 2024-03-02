import Hero from "@/components/Hero";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="container flex flex-col gap-12 flex-1 px-24">
        <div className="bg-white rounded-md shadow-md py-8 flex flex-col gap-5 text-center -mt-12">
          <h1 className="text-5xl text-orange-600 tracking-wide font-header font-small-caps">
            Tuck into a takeaway today
          </h1>
          <span className="text-lg text-slate-600  font-content">
            Food is now just one click away
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
