import React from "react";
import portfolioImage from "../../../src/assets/port.png";

const steps = [
  {
    number: "1",
    title: "Create your Energea account",
    description:
      "Begin your investment journey by answering a series of questions to help us find the best solar energy investments for you.",
  },
  {
    number: "2",
    title: "Build your solar portfolio",
    description:
      "Purchase equity in solar energy projects for as little as $100 and build a diverse portfolio.",
  },
  {
    number: "3",
    title: "Collect dividends as your projects sell energy",
    description:
      "Monitor your portfolio’s financial performance and environmental impact using our intuitive investor dashboard.",
  },
];

const Portfolio = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Build your portfolio in minutes...
          </h2>

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start p-4 border-2 border-slate-100 rounded-lg shadow-sm hover:shadow-md  hover:scale-105  transition-all duration-300 group"
              >
                <div className="flex-1">
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>

               
              </div>
            ))}
          </div>

          <button className="mt-10 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition duration-300">
            Get Started →
          </button>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={portfolioImage}
            alt="Portfolio showcase"
            className="w-full max-w-md mx-auto lg:max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
