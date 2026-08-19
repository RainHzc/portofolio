const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;

        const elementTop =
            element.getBoundingClientRect().top;

        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

const projectGalleries = {

    "Studio Booking System": [
        "assets/projects/studio-booking/01-home.jpg",
        "assets/projects/studio-booking/02-login.jpg",
        "assets/projects/studio-booking/03-dashboard.jpg",
        "assets/projects/studio-booking/04-booking.jpg",
        "assets/projects/studio-booking/05-calendar.jpg",
        "assets/projects/studio-booking/06-payment.jpg",
        "assets/projects/studio-booking/07-admin.jpg",
        "assets/projects/studio-booking/08-report.jpg"
    ],

    "Printing Service Ordering System": [
        "assets/projects/printing-service/01-home.png",
        "assets/projects/printing-service/02-login.png",
        "assets/projects/printing-service/03-services.png",
        "assets/projects/printing-service/04-order.png",
        "assets/projects/printing-service/05-payment.png",
        "assets/projects/printing-service/06-status.png",
        "assets/projects/printing-service/07-admin.png",
        "assets/projects/printing-service/08-report.png"
    ]

};

/* =========================================================
   PROJECT SLIDER
========================================================= */

let activeProject = null;
let activeSlide = 0;
let zoomLevel = 1;


/* =========================================================
   CHANGE SLIDE
========================================================= */

function changeSlide(button, direction) {

    const card =
        button.closest(".project-card");

    const projectName =
        card.querySelector("h3").textContent.trim();

    const images =
        projectGalleries[projectName];

    if (!images) return;

    const gallery =
        card.querySelector(".project-gallery");

    const image =
        gallery.querySelector(".gallery-image");

    const current =
        gallery.querySelector(".current-slide");

    const total =
        gallery.querySelector(".total-slide");


    let index =
        parseInt(current.textContent) - 1;

    index += direction;


    if (index < 0) {
        index = images.length - 1;
    }

    if (index >= images.length) {
        index = 0;
    }


    image.style.opacity = "0";


    setTimeout(() => {

        image.src =
            images[index];

        current.textContent =
            index + 1;

        total.textContent =
            images.length;

        image.style.opacity = "1";

    }, 150);
}


/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openGallery(imageElement) {

    const card =
        imageElement.closest(".project-card");

    activeProject =
        card.querySelector("h3").textContent.trim();

    const images =
        projectGalleries[activeProject];

    if (!images) return;


    const gallery =
        card.querySelector(".project-gallery");

    activeSlide =
        parseInt(
            gallery.querySelector(".current-slide").textContent
        ) - 1;


    const lightbox =
        document.getElementById("projectLightbox");

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";


    updateLightbox();
}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeGallery() {

    const lightbox =
        document.getElementById("projectLightbox");

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

    resetZoom();
}


/* =========================================================
   UPDATE LIGHTBOX
========================================================= */

function updateLightbox() {

    const images =
        projectGalleries[activeProject];

    if (!images) return;


    const image =
        document.getElementById("lightboxImage");

    const current =
        document.getElementById("lightboxCurrent");

    const total =
        document.getElementById("lightboxTotal");


    image.src =
        images[activeSlide];


    current.textContent =
        activeSlide + 1;

    total.textContent =
        images.length;


    resetZoom();
}


/* =========================================================
   LIGHTBOX NEXT / PREVIOUS
========================================================= */

function lightboxSlide(direction) {

    const images =
        projectGalleries[activeProject];

    if (!images) return;


    activeSlide += direction;


    if (activeSlide < 0) {
        activeSlide =
            images.length - 1;
    }

    if (activeSlide >= images.length) {
        activeSlide = 0;
    }


    updateLightbox();
}


/* =========================================================
   ZOOM IN
========================================================= */

function zoomIn() {

    zoomLevel += 0.25;

    if (zoomLevel > 3) {
        zoomLevel = 3;
    }

    applyZoom();
}


/* =========================================================
   ZOOM OUT
========================================================= */

function zoomOut() {

    zoomLevel -= 0.25;

    if (zoomLevel < 0.5) {
        zoomLevel = 0.5;
    }

    applyZoom();
}


/* =========================================================
   RESET ZOOM
========================================================= */

function resetZoom() {

    zoomLevel = 1;

    applyZoom();
}


/* =========================================================
   APPLY ZOOM
========================================================= */

function applyZoom() {

    const image =
        document.getElementById("lightboxImage");

    if (!image) return;

    image.style.transform =
        `scale(${zoomLevel})`;
}


/* =========================================================
   ESC TO CLOSE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        const lightbox =
            document.getElementById("projectLightbox");

        if (!lightbox.classList.contains("active")) {
            return;
        }


        if (event.key === "Escape") {
            closeGallery();
        }


        if (event.key === "ArrowLeft") {
            lightboxSlide(-1);
        }


        if (event.key === "ArrowRight") {
            lightboxSlide(1);
        }


        if (event.key === "+") {
            zoomIn();
        }


        if (event.key === "-") {
            zoomOut();
        }

    }
);

/* =========================================================
   CERTIFICATE LIGHTBOX
========================================================= */

function openCertificate(imagePath) {

    const lightbox =
        document.getElementById("certificateLightbox");

    const image =
        document.getElementById("certificateImage");

    image.src = imagePath;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeCertificate() {

    const lightbox =
        document.getElementById("certificateLightbox");

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeCertificate();

    }

});
