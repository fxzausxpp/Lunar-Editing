// Get elements from the DOM
const imageInput = document.getElementById('imageInput');
const convertButton = document.getElementById('convertButton');
const downloadButton = document.getElementById('downloadButton');  // Defined download button here
const svgOutput = document.getElementById('svgOutput');
const canvasElement = document.getElementById('canvas');

// Initialize the Fabric.js canvas
const canvas = new fabric.Canvas(canvasElement, { width: 600, height: 400 });

let imageElement;

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
        fabric.Image.fromURL(e.target.result, function (img) {
            imageElement = img;
            canvas.clear();
            canvas.add(imageElement);
            canvas.renderAll();
        });
    };

    reader.readAsDataURL(event.target.files[0]);
}

// Convert the image to SVG
function convertToSVG() {
    if (!imageElement) {
        alert("Please upload an image first.");
        return;
    }

    // Generate SVG code from the canvas
    const svg = canvas.toSVG();
    svgOutput.value = svg; // Display the SVG code in the textarea
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
