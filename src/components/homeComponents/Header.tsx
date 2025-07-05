import React from "react";
import BrandLogo from "../BrandLogo";
import { LogOut } from "lucide-react";
import HeaderUserIcon from "./HeaderUserIcon";

function Header() {
  return (
    <div className="relative w-full h-screen overflow-hidden px-4 sm:px-10 md:px-16 lg:px-24">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/hero-img.png')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-r bg-white/20 sm:from-blue-200 sm:to-transparent sm:from-10% sm:to-70%" />

      {/* Header Navigation */}
      <HeaderUserIcon />

      {/* Main Content */}
      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="hero-section relative min-h-screen flex items-end py-40 sm:items-center sm:justify-center px-14 sm:px-6 lg:px-8">
          {/* Content Wrapper */}
          <div className="content-wrapper w-full max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="hero-content max-w-2xl mx-auto text-center sm:text-left lg:mx-0">
              {/* Heading */}
              <h1 className="hero-title text-blue-950 font-bold leading-tight mb-6 text-4xl md:text-5xl xl:text-6xl">
                <span className="block">Plan Your</span>
                <span className="block">Trip with Ease</span>
              </h1>

              {/* Description */}
              <p className="hero-description text-blue-950 leading-relaxed text-base sm:bg-transparent sm:text-lg md:text-xl max-w-lg mb-5">
                Customize your travel itinerary in minutes—pick your
                destination, set your preferences, and explore with confidence.
              </p>

              {/* CTA Button */}
              <div className="hero-cta">
                <button className="cta-button bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base md:px-10 md:py-4 md:text-lg">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Section */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Additional Content
            </h2>
            <p className="text-gray-600">
              This section shows how the hero section works with other content
              below it.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 right-10 z-10">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full blur-xl"></div>
      </div>
      <div className="absolute top-1/3 right-1/4 z-10">
        <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full blur-lg"></div>
      </div>
      <div className="absolute bottom-1/4 left-10 z-10">
        <div className="w-20 h-20 bg-white bg-opacity-15 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}

export default Header;
