document.addEventListener("DOMContentLoaded", () => {
    // Check if a theme is already stored in localStorage
    const currentTheme = localStorage.getItem("theme") || "basic";  // Default to "basic" if nothing is set

    // Apply the stored theme immediately after page load
    if (currentTheme === "christmas") {
        document.getElementById("theme-stylesheet").setAttribute("href", "settingsch.css");
    } else {
        document.getElementById("theme-stylesheet").setAttribute("href", "settings.css");
    }

    // Event listeners for the theme change buttons
    document.getElementById("basic-theme").addEventListener("click", () => {
        localStorage.setItem("theme", "basic");
        document.getElementById("theme-stylesheet").setAttribute("href", "settings.css");
    });

    document.getElementById("christmas-theme").addEventListener("click", () => {
        localStorage.setItem("theme", "christmas");
        document.getElementById("theme-stylesheet").setAttribute("href", "settingsch.css");
    });
});
