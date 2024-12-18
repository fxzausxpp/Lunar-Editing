// Get elements from the DOM
const imageInput = document.getElementById('imageInput');
const convertButton = document.getElementById('convertButton');
const downloadButton = document.getElementById('downloadButton');
const svgOutput = document.getElementById('svgOutput');
const canvasElement = document.getElementById('canvas');

// Initialize the Fabric.js canvas
const canvas = new fabric.Canvas(canvasElement, { width: 600, height: 400 });

let imageElement = null; // Initially set to null to track if an image is loaded

// Event listener for image upload
imageInput.addEventListener('change', handleImageUpload);

// Event listener for converting the image to SVG
convertButton.addEventListener('click', convertToSVG);

// Event listener for downloading the SVG code
downloadButton.addEventListener('click', downloadSVG);

// Handle image upload
function handleImageUpload(event) {
    const reader = new FileReader();

    reader.onload = function (e) {
        // Load the image onto the Fabric.js canvas using the data URL
        fabric.Image.fromURL(e.target.result, function (img) {
            imageElement = img; // Save the image to the variable
            canvas.clear();      // Clear previous canvas content
            canvas.add(imageElement); // Add the uploaded image to the canvas
            canvas.renderAll();  // Render the canvas
            convertButton.disabled = false; // Enable the Convert button after image load
        });
    };

    reader.readAsDataURL(event.target.files[0]); // This ensures the file is read as a Data URL
}

// Preprocess the image before conversion (resize and retain color)
function preprocessImage(imgDataUrl, callback) {
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');

    const img = new Image();
    img.onload = function () {
        // Resize image for better tracing
        tempCanvas.width = 300; // Resize width
        tempCanvas.height = 300; // Resize height
        ctx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

        // Return the preprocessed image as a Data URL
        callback(tempCanvas.toDataURL());
    };

    img.src = imgDataUrl;
}

// Convert the image to SVG using ImageTracer
function convertToSVG() {
    if (!imageElement) {
        alert("Please upload an image first.");
        return;
    }

    const imgData = canvas.toDataURL(); // Get canvas data

    // Preprocess image before sending to ImageTracer
    preprocessImage(imgData, function (processedData) {
        const tracingOptions = {
            ltres: 2,            // Edge detection sensitivity (higher values preserve more details)
            qtres: 2,            // Spline quality (higher values for more smooth curves)
            colorsampling: 4,    // Color sampling (increase this to capture more color details)
            numberofcolors: 32,  // Increase number of colors to preserve more details (default was 16)
            // No pathomit option to preserve all paths
        };

        // Convert to SVG using ImageTracer
        ImageTracer.imageToSVG(processedData, function (svg) {
            svgOutput.value = svg;  // Display the SVG code in the textarea
        }, tracingOptions);
    });
}

// Download the SVG code as a file
function downloadSVG() {
    if (!svgOutput.value) {
        alert("No SVG code to download.");
        return;
    }

    const blob = new Blob([svgOutput.value], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'image.svg';
    link.click();
}

// Function to switch theme based on localStorage
function switchTheme() {
    const currentTheme = localStorage.getItem('theme'); // Get theme from localStorage

    // Check if the theme is 'christmas'
    if (currentTheme === 'christmas') {
        // Change to the Christmas theme CSS
        document.getElementById('theme-stylesheet').href = 'convertch.css';
    } else {
        // Default to the standard theme CSS
        document.getElementById('theme-stylesheet').href = 'convert.css';
    }
}

// Call the function to apply the theme when the page loads
window.onload = switchTheme;
