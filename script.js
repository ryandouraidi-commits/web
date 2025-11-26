import Lenis from 'https://unpkg.com/lenis@1.3.9/dist/lenis.mjs';

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(SplitText, CustomEase);
  CustomEase.create("hop", ".87, .0, .13, 1");
  
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  document.fonts.ready.then(() => {
    const textContainers = document.querySelectorAll(".menu-col");
    let splitTextByContainer = [];

    const originalLogoContainer = document.querySelector(".menu-logo");
    const overlayLogoContainer = document.querySelector(".menu-overlay-header");
    const overlayLogo1 = document.querySelector(".logo1-overlay");
    const overlayLogo2 = document.querySelector(".logo2-overlay");

    const splitOverlayLogo1 = SplitText.create(overlayLogo1, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    const splitOverlayLogo2 = SplitText.create(overlayLogo2, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });

    gsap.set([splitOverlayLogo1.lines, splitOverlayLogo2.lines], { y: "-110%" });

    textContainers.forEach((container) => {
      const textElements = container.querySelectorAll("a, p");
      let containerSplits = [];

      textElements.forEach((element) => {
        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "line",
        });
        containerSplits.push(split);
        gsap.set(split.lines, { y: "-110%" });
      });

      splitTextByContainer.push(containerSplits);
    });

    const rabatTimer = document.getElementById("live-timer");

    function updateRabatTime() {
      const now = new Date();
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Africa/Casablanca'
      };
      const rabatTime = now.toLocaleTimeString('en-US', options);
      rabatTimer.textContent = `Rabat right now: ${rabatTime}`;
    }

    updateRabatTime();
    setInterval(updateRabatTime, 1000);
      
    const container = document.querySelector(".home");
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuOverlayContainer = document.querySelector(".menu-overlay-content");
    const menuMediaWrapper = document.querySelector(".menu-media-wrapper");
    const mainMenuImage = document.getElementById("main-menu-image");
    const nextMenuImage = document.getElementById("next-menu-image");
    
    const copyContainers = document.querySelectorAll(".menu-col");
    const menuToggleLabel = document.querySelector(".menu-toggle-label");
    const menuText = document.querySelector(".menu-toggle-label p.menu-text");
    const closeText = document.querySelector(".menu-toggle-label p.close-text");
    const hamburgerIcon = document.querySelector(".menu-hamburger-icon");
    const menuLinks = document.querySelectorAll(".menu-link a");

    const maxWidth = Math.max(menuText.offsetWidth, closeText.offsetWidth);
    gsap.set(menuToggleLabel, { width: maxWidth + 10 + 'px' });

    gsap.set(menuText, { x: 0, y: "0%", opacity: 1 });
    gsap.set(closeText, { x: 0, y: "110%", opacity: 0 });

    let isMenuOpen = false;
    let isAnimating = false;

    const originalImageSrc = "pinup_photo_40.jpg";

    const hoverImages = {
      'index': "pinup_photo_44.jpg",
      'portfolio': "pinup_photo_03.jpg",
      'work': "pinup_photo_31.jpg",
      'connect': "pinup_photo_60.jpg",
    };

    menuLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const linkText = link.textContent.toLowerCase();
        const newSrc = hoverImages[linkText];
        
        if (mainMenuImage.src.includes(newSrc)) {
          return;
        }

        const newImage = new Image();
        newImage.src = newSrc;
        newImage.onload = () => {
          gsap.to(mainMenuImage, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              mainMenuImage.src = newSrc;
              gsap.to(mainMenuImage, {
                opacity: 0.25,
                duration: 0.5,
                ease: "power2.inOut"
              });
            }
          });
        };
      });

      link.addEventListener('mouseleave', () => {
        if (!mainMenuImage.src.includes(originalImageSrc)) {
          gsap.to(mainMenuImage, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              mainMenuImage.src = originalImageSrc;
              gsap.to(mainMenuImage, {
                opacity: 0.25,
                duration: 0.5,
                ease: "power2.inOut"
              });
            }
          });
        }
      });
    });

    menuToggleBtn.addEventListener("click", () => {
      if (isAnimating) return;

      if (!isMenuOpen) {
        isAnimating = true;
        lenis.stop();

        const tl = gsap.timeline();
        const hamburgerSpans = document.querySelectorAll(".menu-hamburger-icon span");
        const hamburgerIcon = document.querySelector(".menu-hamburger-icon");
        
        tl.to(originalLogoContainer, {
          y: "-110%",
          duration: 1,
          ease: "hop",
        }, "<");

        tl.to(overlayLogoContainer, {
            opacity: 1,
            duration: 0.25
        }, "<");

        tl.to(menuText, {
          y: "-110%",
          opacity: 0,
          duration: 1,
          ease: "hop",
        }, "<")
        .to(closeText, {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "hop",
        }, "<")
        .to(container, {
          y: "100svh",
          duration: 1,
          ease: "hop",
        },"<")
        .to(menuOverlay, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "hop",
          onStart: () => {
            gsap.to(hamburgerSpans, {
              backgroundColor: "#f5f6f8",
              duration: 0.05,
              ease: "hop",
            });
            gsap.to(hamburgerIcon, {
              borderColor: "#e8eaed",
              backgroundColor: "#1c1c1b",
              borderWidth: 2,
              duration: 0.5,
              ease: "hop",
            });
          }
        }, "<")
        .to(menuOverlayContainer, {
          yPercent: 0,
          duration: 1,
          ease: "hop",
        }, "<")
        .to(menuMediaWrapper, {
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          delay: 0.5,
        }, "<");

        splitTextByContainer.forEach((containerSplits) => {
          const copyLines = containerSplits.map((split) => split.lines);
          tl.to(copyLines, {
            y: "0%",
            duration: 2,
            ease: "hop",
            stagger: -0.075,
          },-0.15);
        });
        
        tl.to([splitOverlayLogo1.lines, splitOverlayLogo2.lines], {
          y: "0%",
          duration: 2,
          ease: "hop",
          stagger: 0.1,
        }, -0.15);

        hamburgerIcon.classList.add("active");

        tl.call(() => {
          isAnimating = false;
        });

        isMenuOpen = true;
      } else {
        isAnimating = true;
        hamburgerIcon.classList.remove("active");
        const hamburgerSpans = document.querySelectorAll(".menu-hamburger-icon span");

        const tl = gsap.timeline();

        tl.to(originalLogoContainer, {
            y: "0%",
            duration: 1,
            ease: "hop",
        }, "<");
        
        tl.to(container, {
          y: "0svh",
          duration: 1,
          ease: "hop",
        }, "<")
        .to(menuOverlay, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "hop",
          onStart: () => {
            gsap.to(hamburgerSpans, {
              backgroundColor: "#1c1c1b",
              duration: 0.05,
              ease: "hop",
            });
            gsap.to(hamburgerIcon, {
              borderColor: "#1c1c1b",
              backgroundColor: "#e8eaed",
              duration: 0.5,
              ease: "hop",
              borderWidth: 2,
            });
          }
        }, "<")
        .to(menuOverlayContainer, {
          yPercent: -50,
          duration: 1,
          ease: "hop",
        }, "<")
        .to(menuText, {
          y: "0%",
          opacity: 1,
          duration: 1,
          ease: "hop",
        }, "<")
        .to(closeText, {
          y: "110%",
          opacity: 0,
          duration: 1,
          ease: "hop",
        }, "<");

        tl.call(() => {
          splitTextByContainer.forEach((containerSplits) => {
            const copyLines = containerSplits.flatMap((split) => split.lines);
            gsap.set(copyLines, { y: "-110%" });
          });
          
          gsap.set([splitOverlayLogo1.lines, splitOverlayLogo2.lines], { y: "-110%" });

          gsap.set(copyContainers, { opacity: 1 });
          gsap.set(menuMediaWrapper, { opacity: 0 });

          isAnimating = false;
          lenis.start();
        });

        isMenuOpen = false;
      }  
    });
  });
});
