import Hero from "@/components/Hero";
import landingimg from "@/assets/landing.png";
import appdownload from "@/assets/appdownload.png";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="container flex flex-col gap-12 flex-1 min-md:px-24">
        <div className="bg-white rounded-md shadow-md py-8 flex flex-col gap-5 text-center -mt-12">
          <h1 className="text-4xl text-orange-600 tracking-wide font-header font-small-caps">
            Tuck into a takeaway today
          </h1>
          <span className="text-lg text-slate-600  font-content">
            Food is now just one click away
          </span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5 my-10">
        <img src={landingimg} />
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster
          </span>
          <span>Download our Android / IOS app for faster orders</span>
          <img src={appdownload} className="w-3/5" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
