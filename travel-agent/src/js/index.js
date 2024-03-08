// import mobileNav from './modules/mobile-nav.js';
// mobileNav();

// import autoCompleteFunc from "./modules/autoComplete";

// autoCompleteFunc();

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const swiper = new Swiper(".swiper", {
  slidesPerView: 4,
  spaceBetween: 32,
  navigation: {
    nextEl: "#sliderPrev",
    prevEl: "#sliderNext",
  },
});
