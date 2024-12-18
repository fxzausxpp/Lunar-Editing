// Show error message on the page
function showError(message) {
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
}

// Compress Image Function
function compressFile() {
    const fileInput = document.getElementById('compressFile');
    const compressionLevel = document.getElementById('compressionLevel').value;

    const file = fileInput.files[0];

    if (!file) {
        showError("Please select an image to compress.");
        return;
    }

    // Display the before file size
    const beforeSize = (file.size / 1024 / 1024).toFixed(2); // Size in MB
    document.getElementById('beforeSize').textContent = `Before: ${beforeSize} MB`;

    // Set compression options
    let maxWidth = 1024;
    let maxHeight = 1024;
    let quality = 0.7;

    if (compressionLevel === 'low') {
        quality = 0.5;
    } else if (compressionLevel === 'medium') {
        quality = 0.7;
    } else if (compressionLevel === 'high') {
        quality = 0.9;
    }

    const options = {
        maxWidthOrHeight: maxWidth,
        useWebWorker: true,
        maxSizeMB: 1, // Reduce file size to less than 1MB
        quality: quality,
    };

    // Compress the image
    imageCompression(file, options).then(function (compressedFile) {
        const compressedImageURL = URL.createObjectURL(compressedFile);

        // Show the compressed image result
        document.getElementById('compressedImage').src = compressedImageURL;
        document.getElementById('compressedImageResult').style.display = 'block';

        // Provide a download link
        const downloadLink = document.getElementById('compressedFileDownload');
        downloadLink.innerHTML = `<a href="${compressedImageURL}" download="${file.name}">Download Compressed Image</a>`;

        // Display the after file size
        const afterSize = (compressedFile.size / 1024 / 1024).toFixed(2); // Size in MB
        document.getElementById('afterSize').textContent = `After: ${afterSize} MB`;
    }).catch(function (error) {
        console.error("Error during image compression", error);
        showError("Something went wrong while compressing the image.");
    });
}

// File Type Conversion Function (Including BMP and WEBP)
function convertFile() {
    const fileInput = document.getElementById('converterFile');
    const outputFormat = document.getElementById('outputFormat').value;

    const file = fileInput.files[0];

    if (!file) {
        showError("Please select a file to convert.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const fileData = event.target.result;

        // Create an image element to load the file
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let convertedDataURL = '';
            let extension = '';

            // Conversion logic based on output format
            if (outputFormat === "bmp") {
                // BMP format conversion via canvas.toBlob
                canvas.toBlob(function (blob) {
                    if (blob) {
                        convertedDataURL = URL.createObjectURL(blob);
                        extension = 'bmp';
                        displayConvertedFile(convertedDataURL, extension);
                    } else {
                        showError('Error: BMP conversion failed.');
                    }
                }, 'image/bmp');
            } else if (outputFormat === "webp") {
                // WEBP format conversion using canvas.toDataURL
                convertedDataURL = canvas.toDataURL('image/webp');
                extension = 'webp';
                displayConvertedFile(convertedDataURL, extension);
            } else {
                // For other formats like PNG or JPG
                convertedDataURL = canvas.toDataURL(`image/${outputFormat}`);
                extension = outputFormat;
                displayConvertedFile(convertedDataURL, extension);
            }
        };

        img.onerror = function () {
            showError('Error: Failed to load the image.');
        };

        img.src = fileData;
    };

    reader.onerror = function () {
        showError('Error: Failed to read the file.');
    };

    reader.readAsDataURL(file);
}

// Function to display the converted image in a card
function displayConvertedFile(convertedDataURL, extension) {
    const cardSection = document.getElementById('convertedImageCardSection');

    // Create card structure
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.margin = '20px';
    card.style.padding = '10px';
    card.style.border = '1px solid #ddd';

    const imgElement = document.createElement('img');
    imgElement.src = convertedDataURL;
    imgElement.style.maxWidth = '100%';
    imgElement.alt = 'Converted Image';

    const extensionText = document.createElement('p');
    extensionText.textContent = `File Extension: ${extension.toUpperCase()}`;

    // Create download button
    const downloadButton = document.createElement('a');
    downloadButton.href = convertedDataURL;
    downloadButton.download = `converted_image.${extension}`;
    downloadButton.textContent = 'Download Converted Image';
    downloadButton.classList.add('btn'); // You can style it using the same 'btn' class as other buttons

    // Append elements to the card
    card.appendChild(imgElement);
    card.appendChild(extensionText);
    card.appendChild(downloadButton);

    // Append the card to the converted image card section
    cardSection.appendChild(card);
}

// Video Type Conversion Function (This can be extended with a server-side solution)
function convertVideo() {
    const fileInput = document.getElementById('videoInput');
    const videoOutputFormat = document.getElementById('videoOutputFormat').value;

    const file = fileInput.files[0];

    if (!file) {
        showError("Please select a video file to convert.");
        return;
    }

    const downloadLink = document.getElementById('videoDownload');
    downloadLink.innerHTML = `<a href="${URL.createObjectURL(file)}" download="${file.name.split('.')[0]}.${videoOutputFormat}">Download Converted Video</a>`;
}

// Set the default format from localStorage and update the select box
function setDefaultFormat() {
    const savedFormat = localStorage.getItem('preferredFormat');
    const formatSelect = document.getElementById('outputFormat');

    if (savedFormat) {
        formatSelect.value = savedFormat.toLowerCase();
    } else {
        formatSelect.value = 'png'; // Default to 'png'
    }
}

// Set the default compression level from localStorage and update the select box
function setDefaultCompressionLevel() {
    const savedCompressionLevel = localStorage.getItem('preferredCompressionLevel');
    const compressionSelect = document.getElementById('compressionLevel');

    if (savedCompressionLevel) {
        compressionSelect.value = savedCompressionLevel;
    } else {
        compressionSelect.value = 'medium'; // Default to 'medium'
    }
}

// Save the format preference to localStorage
function saveFormatPreference() {
    const formatSelect = document.getElementById('outputFormat');
    localStorage.setItem('preferredFormat', formatSelect.value);
}

// Save the compression level preference to localStorage
function saveCompressionLevelPreference() {
    const compressionSelect = document.getElementById('compressionLevel');
    localStorage.setItem('preferredCompressionLevel', compressionSelect.value);
}

// Wait for the DOM to load and initialize all settings
document.addEventListener('DOMContentLoaded', function () {
    setDefaultFormat(); // Set default format based on localStorage
    setDefaultCompressionLevel(); // Set default compression level based on localStorage

    // Save format and compression level preferences when changed
    document.getElementById('outputFormat').addEventListener('change', saveFormatPreference);
    document.getElementById('compressionLevel').addEventListener('change', saveCompressionLevelPreference);
});

// Check local storage for the theme preference
const theme = localStorage.getItem('theme');

// Update the stylesheet link based on the theme preference
if (theme === 'basic') {
    document.getElementById('theme-link').setAttribute('href', 'toolbox.css');
} else {
    document.getElementById('theme-link').setAttribute('href', 'toolboxch.css');
}
