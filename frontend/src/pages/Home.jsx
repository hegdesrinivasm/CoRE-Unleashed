import LazyImage from "../components/LazyImage";
import { useImagePreloader } from "../utils/preloader";
import image from "../assets/background_desktop.png";
import background_mobile from "../assets/background_mobile.png";
import core_logo from "../assets/core_logo.png";
import ieee_logo from "../assets/ieee_logo.png";
import vcet_logo from "../assets/vcet_logo.png";
import codezync_logo from "../assets/CodeZyng_Logo.png";
import core_text from "../assets/core_text.svg";

const Home = () => {
  // Preload critical images for the Home section
  const criticalImages = [image, background_mobile, core_text];
  const { isLoading } = useImagePreloader(criticalImages);

  // Show minimal loading state for critical assets
  if (isLoading) {
    return (
      <div className="relative min-h-screen h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="text-[#E8B88A] text-2xl" style={{ fontFamily: "Poppins" }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen h-screen overflow-hidden bg-black">
      {/* Background image - mobile version */}
      <img
        src={background_mobile}
        alt="Background"
        className="absolute inset-0 w-full h-screen object-cover sm:hidden"
      />
      {/* Background image - tablet/desktop version with shrinking mechanism */}
      <img
        src={image}
        alt="Background"
        className="hidden sm:block absolute inset-0 w-full h-screen sm:object-cover object-top"
        style={{ objectFit: "fill" }}
      />

      <div className="absolute top-0 right-0 flex flex-col sm:flex-row items-end sm:items-start gap-2 sm:gap-4 md:gap-6 pt-2 sm:pt-3 md:pt-4 pr-2 sm:pr-4 md:pr-6 z-10">
        <div className="w-[5.5em] h-[5.5em] sm:w-[10em] sm:h-[10em] md:w-[12em] md:h-[12em] lg:w-[14em] lg:h-[14em] overflow-hidden flex items-start sm:-translate-y-8 md:-translate-y-10 lg:-translate-y-13 sm:translate-x-15 md:translate-x-20 lg:translate-x-25">
          <LazyImage
            src={core_logo}
            className="w-[5.5em] h-[5.5em] sm:w-[10em] sm:h-[10em] md:w-[12em] md:h-[12em] lg:w-[14em] lg:h-[14em] object-cover"
            alt="CoRE Logo"
            priority={true}
          />
        </div>
        <div className="w-[5.5em] h-[5.5em] sm:w-[10em] sm:h-[10em] md:w-[12em] md:h-[12em] lg:w-[14em] lg:h-[14em] overflow-hidden flex items-start sm:-translate-y-7 md:-translate-y-9 lg:-translate-y-11 sm:translate-x-3 md:translate-x-4 lg:translate-x-5">
          <LazyImage
            src={ieee_logo}
            className="w-[5.5em] h-[5.5em] sm:w-[10em] sm:h-[10em] md:w-[12em] md:h-[12em] lg:w-[14em] lg:h-[14em] object-cover"
            alt="IEEE Logo"
            priority={true}
          />
        </div>
        <LazyImage
          src={vcet_logo}
          className="w-[4.5em] h-[4.5em] sm:w-[4em] sm:h-[4em] md:w-[5em] md:h-[5em] lg:w-[6em] lg:h-[6em] object-cover -translate-x-2 sm:-translate-x-1"
          alt="VCET Logo"
          priority={true}
        />
        <LazyImage
          src={codezync_logo}
          className="w-[4.5em] h-[4.5em] sm:w-[4em] sm:h-[4em] md:w-[5em] md:h-[5em] lg:w-[6em] lg:h-[6em] object-cover -translate-x-3 sm:-translate-x-1"
          alt="CodeZyng Logo"
          priority={true}
        />
      </div>

      {/* Content in lower third */}
      <div className="absolute bottom-28 sm:bottom-24 md:bottom-28 lg:bottom-32 right-0 z-10 px-6 sm:px-8 md:px-16 lg:px-24 md:-translate-x-20 lg:-translate-x-24">
        {/* Core text + UNLEASHED */}
        <div className="flex flex-col items-start mb-4 sm:mb-6 md:mb-8">
          <img
            src={core_text}
            alt="CoRE"
            className="w-32 sm:w-36 md:w-40 lg:w-44 mb-2 sm:mb-3"
          />
          <h1
            className="text-[#E8B88A] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] tracking-wide"
            style={{
              fontFamily: "Blowbrush",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            UNLEASHED
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          <button
            className="bg-white text-black px-6 sm:px-10 md:px-14 lg:px-16 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg text-sm sm:text-base md:text-xl lg:text-2xl hover:bg-gray-100 transition-colors"
            style={{ fontFamily: "Poppins", fontWeight: 700 }}
            onClick={() => window.open("https://drive.google.com/file/d/1_8RhqN2ud7jOgF6RCR6AhRcBuWhIibHF/view?usp=sharing", "_blank", "noopener,noreferrer")}
          >
            Download Brochure
          </button>
          <button
            className="bg-[#E8B88A] text-black px-6 sm:px-10 md:px-14 lg:px-16 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg text-sm sm:text-base md:text-xl lg:text-2xl hover:bg-[#d9a87b] transition-colors"
            style={{ fontFamily: "Poppins", fontWeight: 700 }}
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
              style={{ fontFamily: "Poppins", fontWeight: 600 }}
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
              style={{ fontFamily: "Poppins", fontWeight: 600 }}
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
