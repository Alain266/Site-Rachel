document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".grid")

    const images = [
        "/assets/images/image1.jpg",
        "/assets/images/image2.jpg",
        "/assets/images/image3.jpg",
        "/assets/images/image4.jpg",
        "/assets/images/image5.jpg",
        "/assets/images/image6.jpg"
    ]

    images.forEach((src) => {
        let img = document.createElement("img")
        img.src = src
        img.alt = "Photo de portfolio"
        img.style.width = "100%"
        gallery.appendChild(img)
    })

    // Gestion du flou et du zoom
    const imagesInGallery = gallery.querySelectorAll("img")
    const body = document.querySelector("body")

    imagesInGallery.forEach((img) => {
        img.addEventListener("mouseenter", () => {
            imagesInGallery.forEach((otherImg) => {
                if (otherImg !== img) {
                    otherImg.classList.add("blurred", "opacity") // Applique le flou sur les autres
                }
            })
            body.style.backdropFilter = "blur(1em)"
        })

        img.addEventListener("mouseleave", () => {
            imagesInGallery.forEach((otherImg) => {
                otherImg.classList.remove("blurred", "opacity") // Enlève le flou des autres
            })
            body.style.backdropFilter = ""
        })

        img.addEventListener("click", () => {
            const src = img.src
            window.open(src, "_blank")
        })
    })
    // Ajout d'animations de transition pour la navigation
    const links = document.querySelectorAll("nav ul li a")
    links.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault()
            const targetId = this.getAttribute("href").substring(1)
            const targetSection = document.getElementById(targetId)

            if (targetSection) {
                let start = window.scrollY
                let end = targetSection.offsetTop
                let duration = 2500
                let startTime = null

                function scrollAnimation(currentTime) {
                    if (!startTime) startTime = currentTime
                    let timeElapsed = currentTime - startTime
                    let progress = Math.min(timeElapsed / duration, 1)
                    let easeInOut =
                        progress < 0.5
                            ? 2 * progress * progress
                            : 1 - Math.pow(-2 * progress + 2, 2) / 2

                    window.scrollTo(0, start + (end - start) * easeInOut)

                    if (timeElapsed < duration) {
                        requestAnimationFrame(scrollAnimation)
                    }
                }
                requestAnimationFrame(scrollAnimation)
            }
        })
    })

    // Ajout de l'envoi de formulaire
    const contactForm = document.querySelector("#contact form")
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault()
        alert("Merci pour votre message, je reviens vers vous dès que possible !")
    })
})
