import React from "react";
import Banner from "../components/Home/Banner";
import HowItWorks from "../components/Home/HowItWorks";
import TopScholarships from "../components/Home/TopScholarships";
import SuccessStories from "../components/Home/SuccessStories";
import Faq from "../components/Home/Faq";

const Home = () => {
  return (
    <div>
      <Banner />
        <TopScholarships />
      <HowItWorks />
      <SuccessStories />
      <Faq />
    </div>
  );
};

export default Home;
