document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button, index) => {
        button.classList.add(index % 2 === 0 ? "fade-in" : "slide-in");
    });

    // Get the theme popup and buttons
    const themePopup = document.getElementById("theme-popup");
    const basicThemeButton = document.getElementById("basic-theme");
    const christmasThemeButton = document.getElementById("christmas-theme");

    // Check if a theme is already stored in localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
        if (storedTheme === "christmas") {
            switchToChristmasTheme();
        } else {
            switchToBasicTheme();
        }
    } else {
        // Show the theme popup if no preference is saved
        themePopup.classList.add("show");
    }

    // Event listeners for theme buttons
    basicThemeButton.addEventListener("click", () => {
        switchToBasicTheme();
        themePopup.classList.remove("show"); // Hide the popup
    });

    christmasThemeButton.addEventListener("click", () => {
        switchToChristmasTheme();
        themePopup.classList.remove("show"); // Hide the popup
    });

    function switchToBasicTheme() {
        document.querySelector("link[rel='stylesheet']").setAttribute("href", "styles.css");
        localStorage.setItem("theme", "basic");
    }

    function switchToChristmasTheme() {
        document.querySelector("link[rel='stylesheet']").setAttribute("href", "stylesch.css");
        localStorage.setItem("theme", "christmas");
    }
});
