// Function to switch theme based on localStorage
function switchTheme() {
    const currentTheme = localStorage.getItem('theme'); // Get theme from localStorage

    // Check if the theme is 'christmas'
    if (currentTheme === 'christmas') {
        // Change to the Christmas theme CSS
        document.getElementById('theme-stylesheet').href = 'creatorsch.css';
    } else {
        // Default to the standard theme CSS
        document.getElementById('theme-stylesheet').href = 'creators.css';
    }
}

// Call the function to apply the theme when the page loads
window.onload = switchTheme;
