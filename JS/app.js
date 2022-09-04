let buttonDeslizador;
let questionSection;
let interval;
let eGlobal;
let clickingButton;
let main;

window.addEventListener("load", () => {
     //Code for Desktop
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
                    questionConfirmation();
               } else {
                    buttonDeslizador.style.left = "";
               }
               clickingButton = false;
          }
     });

     //Code for Mobile
     buttonDeslizador.addEventListener("touchstart", (e) => {
          interval = setInterval(changeXMobile, 10);

          clickingButton = true;
          questionSection.addEventListener("touchmove", (e) => {
               eGlobal = e;
          });
     });

     function changeXMobile() {
          try {
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
                    questionConfirmation();
               } else {
                    buttonDeslizador.style.left = "";
               }
               clickingButton = false;
          }
     });

     //Code after button is in position

     function questionConfirmation() {
          removeEventListener("mousedown", buttonDeslizador);
          removeEventListener("touchstart", buttonDeslizador);
          removeEventListener("mousemove", questionSection);
          removeEventListener("touchmove", questionSection);
          removeEventListener("mouseup", questionSection);
          removeEventListener("touchend", questionSection);

          let body = document.getElementsByTagName("body")[0];
          body.removeChild(document.getElementById("question"));

          const countdownHTML = `<section id="contador" class="flex"></section>`;

          body.insertAdjacentHTML("afterbegin", countdownHTML);

          let sectionContador = document.getElementById("contador");
          setTimeout(() => {
               sectionContador.classList.add("contadorNumeros");

               setTimeout(() => {
                    body.removeChild(sectionContador);

                    const mainHTML = `<main id="main" class="">
               <div id="particles-js"></div>
               <div id="container" class="flex">
                    <div id="mainContenedor">
                    <img id="imagen" src="Recursos/imagen.png"></img>
                    <div id="si" class="option flex">Sí</div>
                    <div id="no" class="option flex">No</div>
                    </div>
               </div>
               </main>
               <audio src='Recursos/musica.mp3'></audio>`;

                    body.insertAdjacentHTML("afterbegin", mainHTML);
                    main = document.getElementById("main");

                    if (
                         navigator.userAgent.match(/Android/i) ||
                         navigator.userAgent.match(/webOS/i) ||
                         navigator.userAgent.match(/iPhone/i) ||
                         navigator.userAgent.match(/iPad/i) ||
                         navigator.userAgent.match(/iPod/i) ||
                         navigator.userAgent.match(/BlackBerry/i) ||
                         navigator.userAgent.match(/Windows Phone/i)
                    ) {
                         main.addEventListener("touchend", () => {
                              const audioContext = new AudioContext();
                              const element =
                                   document.getElementsByTagName("audio")[0];
                              const source =
                                   audioContext.createMediaElementSource(
                                        element
                                   );
                              source.connect(audioContext.destination);
                              element.play();
                         });
                    } else {
                         playAudio();
                    }

                    particlesJS.load(
                         "particles-js",
                         "particlesjs-config.json",
                         function () {
                              console.log(
                                   "callback - particles.js config loaded"
                              );
                         }
                    );

                    const siHTML = `<div class="popup">
          <p>YEIIIIIIIIIIIIIIII</p>
          <img class="img1" src="Recursos/imagen2.jpg"></img>
     </div>`;

                    const noHTMML = `<div class="popup">
          <p>NOOOOOOOOOOOO</p>
          <img class="img2" src="Recursos/imagen3.jpg"></img>
     </div>`;
                    document
                         .getElementById("si")
                         .addEventListener("click", () => {
                              document
                                   .getElementById("container")
                                   .insertAdjacentHTML("beforeend", siHTML);
                              document
                                   .getElementById("mainContenedor")
                                   .classList.add("blur");
                         });
                    document
                         .getElementById("no")
                         .addEventListener("click", () => {
                              document
                                   .getElementById("container")
                                   .insertAdjacentHTML("beforeend", noHTMML);
                              document
                                   .getElementById("mainContenedor")
                                   .classList.add("blur");
                         });
               }, 4100);
          }, 3000);
     }
});

function playAudio() {
     const audioContext = new AudioContext();
     const element = document.getElementsByTagName("audio")[0];
     const source = audioContext.createMediaElementSource(element);
     source.connect(audioContext.destination);
     element.play();
}
