import LazyImage from "../components/LazyImage";
import { useImagePreloader } from "../utils/preloader";
import homeBackgroundLandscape from "../assets/Home Background Landscape.png";
import homeBackgroundPortrait from "../assets/Home Background Potrait.png";
import core_logo from "../assets/core_logo.png";
import ieee_logo from "../assets/ieee_logo.png";
import vcet_logo from "../assets/vcet_logo.png";
import codezync_logo from "../assets/CodeZyng_Logo.png";
import core_text from "../assets/core_text.svg";

const Home = () => {
  // Preload critical images for the Home section
  const criticalImages = [homeBackgroundLandscape, homeBackgroundPortrait, core_text];
  const { isLoading } = useImagePreloader(criticalImages);

  // Show minimal loading state for critical assets
  if (isLoading) {
    return (
      <div className="relative min-h-screen h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-[#E8B88A] text-2xl" style={{ fontFamily: "Inter" }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen h-screen overflow-hidden bg-black">
      {/* Background image - mobile version */}
      <img
        src={homeBackgroundPortrait}
        alt="Background"
        className="absolute inset-0 w-full h-screen object-cover sm:hidden"
      />
      {/* Background image - tablet/desktop version with shrinking mechanism */}
      <img
        src={homeBackgroundLandscape}
        alt="Background"
        className="hidden sm:block absolute inset-0 w-full h-screen sm:object-cover object-top"
        style={{ objectFit: "fill" }}
      />

      <div className="absolute top-0 right-0 flex flex-col sm:flex-row items-end sm:items-start gap-2 sm:gap-4 md:gap-6 pt-2 sm:pt-3 md:pt-4 pr-2 sm:pr-4 md:pr-6 z-10">
        <div className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden flex items-start sm:-translate-y-6 md:-translate-y-8 lg:-translate-y-10 sm:translate-x-10 md:translate-x-14 lg:translate-x-16">
          <LazyImage
            src={core_logo}
            className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover"
            alt="CoRE Logo"
            priority={true}
          />
        </div>
        <div className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden flex items-start sm:-translate-y-4 md:-translate-y-6 lg:-translate-y-8 sm:translate-x-1 md:translate-x-2 lg:translate-x-3">
          <LazyImage
            src={ieee_logo}
            className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover"
            alt="IEEE Logo"
            priority={true}
          />
        </div>
        <LazyImage
          src={vcet_logo}
          className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover -translate-x-2 sm:-translate-x-1"
          alt="VCET Logo"
          priority={true}
        />
        <LazyImage
          src={codezync_logo}
          className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover -translate-x-3 sm:-translate-x-2"
          alt="CodeZyng Logo"
          priority={true}
        />
      </div>

      {/* Content in lower third */}
      <div className="absolute bottom-20 sm:bottom-20 md:bottom-24 lg:bottom-28 left-4 right-4 sm:left-auto sm:right-6 md:right-10 lg:right-16 z-10">
        {/* Core text + UNLEASHED */}
        <div className="flex flex-col items-start mb-4 sm:mb-6 md:mb-8">
          <img
            src={core_text}
            alt="CoRE"
            className="w-28 sm:w-32 md:w-36 lg:w-40 mb-2 sm:mb-3"
          />
          <h1
            className="unleashed-word text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] tracking-wide"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            UNLEASHED
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8 items-stretch sm:items-start">
          <button
            className="w-full sm:w-auto bg-white text-black px-6 sm:px-10 md:px-14 lg:px-16 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg text-sm sm:text-base md:text-xl lg:text-2xl hover:bg-gray-100 transition-colors"
            style={{ fontFamily: "Inter", fontWeight: 700 }}
            onClick={() => window.open("https://drive.google.com/file/d/1ezkI6i7L3XjDwt-Vl_ysG9j7-ehV-IbH/view?usp=sharing", "_blank", "noopener,noreferrer")}
          >
            Download Brochure
          </button>
          <button
            className="w-full sm:w-auto bg-[#E8B88A] text-black px-6 sm:px-10 md:px-14 lg:px-16 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg text-sm sm:text-base md:text-xl lg:text-2xl hover:bg-[#d9a87b] transition-colors"
            style={{ fontFamily: "Inter", fontWeight: 700 }}
            onClick={() => window.open("https://corevcet.wixsite.com/core/unleashed", "_blank", "noopener,noreferrer")}
          >
            Register Now
          </button>
        </div>

        {/* Date and Location */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 max-w-[300px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
            <span className="material-icons text-white text-2xl sm:text-2xl md:text-2xl align-middle">
              location_on
            </span>
            <span
              className="text-white text-sm sm:text-base md:text-lg break-words text-left"
              style={{ fontFamily: "Inter", fontWeight: 600 }}
            >
              Vivekananda College of Engineering & Technology
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <span className="material-icons text-white text-2xl sm:text-2xl md:text-2xl align-middle">
              calendar_month
            </span>
            <span
              className="text-white text-sm sm:text-base md:text-lg"
              style={{ fontFamily: "Inter", fontWeight: 600 }}
            >
              24th - 26th, April 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
