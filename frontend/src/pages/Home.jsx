import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LazyImage from "../components/LazyImage";
import { useImagePreloader } from "../utils/preloader";
import image from "../assets/background_desktop.png";
import background_mobile from "../assets/background_mobile_1.png";
import core_logo from "../assets/core_logo.png";
import ieee_logo from "../assets/ieee_logo.png";
import vcet_logo from "../assets/vcet_logo.png";
import codezync_logo from "../assets/CodeZyng_Logo.png";
import core_text from "../assets/core_text.svg";
import axios from "axios";
import download from "downloadjs";

axios.defaults.withCredentials = true;

// Create an Axios instance with default headers
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // or from context/state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


const downloadBrochure = async () => {
  try {
    const result = await axios.get(
      `http://localhost:5000/api/downloadBrochure`,
      {
        responseType: "blob",
        Blob,
      },
    );
    const file = result.data;
    download(file, "CoRE_Unleashed.pdf");
  } catch {
    if (!result) {
      return (
        <div>
          Sorry, Looks like we are having an internal server error. Check out a
          bit later.
        </div>
      );
    }
  }
};

const isLoggedIn = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;
  try {
    // Optionally verify token with backend
    const response = await api.get("/auth/verify-token");
    return response.data.valid; // backend should return { valid: true/false }
  } catch {
    return false;
  }
};

const registerUser = async (req,res) => {
  try {
    const isLoggedIn = await isLoggedIn();
    if (!isLoggedIn) {
      return (
        <div>
          Please log in to register.
        </div>
      );
    }
  } catch (error) {
    
  }
}

const Home = () => {
  const navigate = useNavigate();
  
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

      <div className="absolute top-0 right-0 flex flex-row gap-2 sm:gap-4 md:gap-6 pt-2 sm:pt-3 md:pt-4 pr-2 sm:pr-4 md:pr-6 z-10">
        <div className="w-[5em] h-[5em] sm:w-[8em] sm:h-[8em] md:w-[10em] md:h-[10em] lg:w-[12em] lg:h-[12em] overflow-hidden flex items-start -translate-y-5 sm:-translate-y-8 md:-translate-y-10 lg:-translate-y-13 translate-x-10 sm:translate-x-15 md:translate-x-20 lg:translate-x-25">
          <LazyImage
            src={core_logo}
            className="w-[5em] h-[5em] sm:w-[8em] sm:h-[8em] md:w-[10em] md:h-[10em] lg:w-[12em] lg:h-[12em] object-cover"
            alt="Core Logo"
            priority={true}
          />
        </div>
        <div className="w-[5em] h-[5em] sm:w-[8em] sm:h-[8em] md:w-[10em] md:h-[10em] lg:w-[12em] lg:h-[12em] overflow-hidden flex items-start -translate-y-4 sm:-translate-y-7 md:-translate-y-9 lg:-translate-y-11 translate-x-2 sm:translate-x-3 md:translate-x-4 lg:translate-x-5">
          <LazyImage
            src={ieee_logo}
            className="w-[5em] h-[5em] sm:w-[8em] sm:h-[8em] md:w-[10em] md:h-[10em] lg:w-[12em] lg:h-[12em] object-cover"
            alt="IEEE Logo"
            priority={true}
          />
        </div>
        <LazyImage
          src={vcet_logo}
          className="w-[3em] h-[3em] sm:w-[4em] sm:h-[4em] md:w-[5em] md:h-[5em] lg:w-[6em] lg:h-[6em] object-cover"
          alt="VCET Logo"
          priority={true}
        />
        <LazyImage
          src={codezync_logo}
          className="w-[3em] h-[3em] sm:w-[4em] sm:h-[4em] md:w-[5em] md:h-[5em] lg:w-[6em] lg:h-[6em] object-cover"
          alt="CodeZync Logo"
          priority={true}
        />
      </div>

      {/* Content in lower third */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 right-0 z-10 px-6 sm:px-8 md:px-16 lg:px-24">
        {/* Core text + UNLEASHED */}
        <div className="flex flex-col items-start mb-4 sm:mb-6 md:mb-8">
          <img
            src={core_text}
            alt="CoRE"
            className="w-24 sm:w-28 md:w-32 lg:w-36 mb-0"
          />
          <h1
            className="text-[#E8B88A] text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl -mt-1 sm:-mt-2 tracking-wide"
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
            onClick={() => {downloadBrochure}}
          >
            Download Brochure
          </button>
          <button
            className="bg-[#E8B88A] text-black px-6 sm:px-10 md:px-14 lg:px-16 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg text-sm sm:text-base md:text-xl lg:text-2xl hover:bg-[#d9a87b] transition-colors"
            style={{ fontFamily: "Poppins", fontWeight: 700 }}
            onClick={() => navigate('/registration')}
          >
            Register Now
          </button>
        </div>

        {/* Date and Location */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 max-w-[300px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
            <span className="material-icons text-white text-xl sm:text-xl md:text-2xl align-middle">
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
            <span className="material-icons text-white text-xl sm:text-xl md:text-2xl align-middle">
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
