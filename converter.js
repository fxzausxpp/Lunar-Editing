// Event listener for Convert SVG to Image
document.getElementById('convertToImageButton').addEventListener('click', function () {
    const svgCode = document.getElementById('svgInput').value;

    if (svgCode.trim() === "") {
        alert("Please enter some SVG code.");
        return;
    }

    // Create an Image object and set its source to the SVG code
    const img = new Image();
    const svgBlob = new Blob([svgCode], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(svgBlob);
    img.src = url;

    // Once the image has loaded, render it on the canvas
    img.onload = function () {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before rendering new image
        context.drawImage(img, 0, 0);

        // Show the canvas and the download button
        canvas.style.display = 'block';
        document.getElementById('downloadImageButton').style.display = 'inline-block';
    };
});

// Event listener for Download Image
document.getElementById('downloadImageButton').addEventListener('click', function () {
    const canvas = document.getElementById('canvas');
    const imageData = canvas.toDataURL('image/png'); // Convert canvas to image

    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'converted-image.png'; // Default download filename
    link.click();
});

// Function to switch theme based on localStorage
function switchTheme() {
    const currentTheme = localStorage.getItem('theme'); // Get theme from localStorage

    // Check if the theme is 'christmas'
    if (currentTheme === 'christmas') {
        // Change to the Christmas theme CSS
        document.getElementById('theme-stylesheet').href = 'converterch.css';
    } else {
        // Default to the standard theme CSS
        document.getElementById('theme-stylesheet').href = 'converter.css';
    }
}

// Call the function to apply the theme when the page loads
window.onload = switchTheme;
