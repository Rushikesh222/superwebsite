let Controller;
let slideScene;

function animateSlides() {
  Controller = new ScrollMagic.Controller();

  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  sliders.forEach((slide, index, slides) => {
    const revealimg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealtext = slide.querySelector(".reveal-text");

    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealimg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1.5");
    slideTl.fromTo(revealtext, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.3");

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })
      .addTo(Controller);
    const pageT1 = gsap.timeline();
    let nextSlide = slides.lenght - 1 === index ? "end" : slides[index + 1];
    pageT1.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageT1.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 });
    pageT1.fromTo(nextSlide, { y: "50%" }, { y: "0%" });

    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageT1)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })
      .addTo(Controller);
  });
}
let mouse = document.querySelector(".cursor");
let mousetxt = mouse.querySelector("span");
function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
function activecursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mousetxt.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    mousetxt.innerText = "";
    gsap.to(".title-swipe", 1, { y: "100%" });
  }
}
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activecursor);
animateSlides();
