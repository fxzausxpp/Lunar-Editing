document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button, index) => {
        button.classList.add(index % 2 === 0 ? "fade-in" : "slide-in");
    });

    // Get the theme popup and buttons
    const themePopup = document.getElementById("theme-popup");
    const basicThemeButton = document.getElementById("basic-theme");
    const christmasThemeButton = document.getElementById("christmas-theme");

    const themeLink = document.getElementById("theme-style"); // Target the theme stylesheet

    // Check if a theme is already stored in localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "christmas") {
        switchToChristmasTheme();
    } else {
        switchToBasicTheme();
    }

    // Show the theme popup only if no preference is saved
    if (!storedTheme) {
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
        themeLink.setAttribute("href", "styles.css?v=" + Date.now()); // Cache-busting
        localStorage.setItem("theme", "basic");
    }

    function switchToChristmasTheme() {
        themeLink.setAttribute("href", "stylesch.css?v=" + Date.now()); // Cache-busting
        localStorage.setItem("theme", "christmas");
    }
});
