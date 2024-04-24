import React from "react";
import MobileMenu from "../../Components/BATComponents/homeFive/MobileMenu";
import Menu from "../../Components/BATComponents/homeFive/Menu";
import Hero from "../../Components/BATComponents/homeFive/Hero";
import Features from "../../Components/BATComponents/homeFive/Features";
import View from "../../Components/BATComponents/homeFive/View";
import Widgets from "../../Components/BATComponents/homeFive/Widgets";
import WhyUs from "../../Components/BATComponents/homeFive/WhyUs";
import ResponsiveLayout from "../../Components/BATComponents/homeFive/ResponsiveLayout";
import SliderCom from "../../Components/BATComponents/homeFive/SliderCom";
import Accordion from "../../Components/BATComponents/homeFive/Accordion";
import Pricing from "../../Components/BATComponents/homeFive/Pricing";
import Footer from "../../Components/BATComponents/homeFive/Footer";

function HomeFive() {
  return (
    <>
      <MobileMenu />
      <Menu />
      <Hero />
      <Features />
      <View />
      <Widgets />
      <WhyUs />
      <ResponsiveLayout />
      <SliderCom />
      <Accordion />
      <Pricing />
      <Footer />
    </>
  );
}

export default HomeFive;
