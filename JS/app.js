let buttonDeslizador;
let questionSection;
let interval;
let eGlobal;
let clickingButton;

window.addEventListener("load", () => {
     buttonDeslizador = document.getElementById("contenedorButton");
     questionSection = document.getElementById("question");

     buttonDeslizador.addEventListener("mousedown", (e) => {
          interval = setInterval(changeXDesktop, 10);

          clickingButton = true;
          questionSection.addEventListener("mousemove", (e) => {
               eGlobal = e;
          });
     });

     function changeXDesktop() {
          try {
               if (
                    eGlobal.clientX -
                         0.35 * document.documentElement.scrollWidth >=
                         0.025 * document.documentElement.scrollWidth &&
                    eGlobal.clientX -
                         0.35 * document.documentElement.scrollWidth <=
                         0.3 * document.documentElement.scrollWidth -
                              0.025 * document.documentElement.scrollWidth
               )
                    buttonDeslizador.style.left =
                         "calc( -100% + " + eGlobal.clientX + "px - 32.5vw)";
          } catch (error) {}
     }

     questionSection.addEventListener("mouseup", () => {
          if (clickingButton) {
               clearInterval(interval);
               removeEventListener("mousemove", questionSection);
               if (
                    eGlobal.clientX >
                    document.documentElement.scrollWidth * 0.6
               ) {
                    alert("a");
               } else {
                    buttonDeslizador.style.left = "";
               }
               clickingButton = false;
          }
     });

     buttonDeslizador.addEventListener("touchstart", (e) => {
          interval = setInterval(changeXMobile, 10);

          clickingButton = true;
          questionSection.addEventListener("touchmove", (e) => {
               eGlobal = e;
          });
     });

     function changeXMobile() {
          try {
               console.log(eGlobal.touches[0].clientX);
               if (
                    eGlobal.touches[0].clientX -
                         0.2 * document.documentElement.scrollWidth >=
                         0.1 * document.documentElement.scrollWidth &&
                    eGlobal.touches[0].clientX -
                         0.2 * document.documentElement.scrollWidth <=
                         0.6 * document.documentElement.scrollWidth
               )
                    buttonDeslizador.style.left =
                         "calc( -100% + " +
                         eGlobal.touches[0].clientX +
                         "px - 20vw)";
          } catch (error) {}
     }

     questionSection.addEventListener("touchend", () => {
          if (clickingButton) {
               clearInterval(interval);
               removeEventListener("touchmove", questionSection);
               console.log("ae");
               if (
                    eGlobal.touches[0].clientX >
                    document.documentElement.scrollWidth * 0.8
               ) {
                    alert("b");
               } else {
                    buttonDeslizador.style.left = "";
               }
               clickingButton = false;
          }
     });
});

particlesJS.load("particles-js", "particlesjs-config.json", function () {
     console.log("callback - particles.js config loaded");
});
