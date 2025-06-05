import ReadmeService from './Services/ReadmeService.js';

// Function to handle file selection
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileLabel');
    const wizardButton = document.getElementById('wizardButton');
    const manualButton = document.getElementById('manualButton');
    const includePreviewCheckbox = document.getElementById('includePreview');
    const finishedLabel = document.getElementById('finishedLabel');
    let currentYmlContent = null;

    if (!fileInput || !wizardButton || !manualButton || !includePreviewCheckbox || !finishedLabel) {
        console.error('Required elements not found');
        return;
    }

    // Handle file selection
    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                currentYmlContent = await file.text();
                finishedLabel.value = 'YAML file loaded successfully';
                console.log('YAML file loaded successfully');
            } catch (error) {
                console.error('Error reading file:', error);
                finishedLabel.value = 'Error reading file. Please try again.';
                alert('Error reading file. Please try again.');
            }
        }
    });

    // Handle Wizard README generation
    wizardButton.addEventListener('click', async () => {
        if (!currentYmlContent) {
            finishedLabel.value = 'Please select a YAML file first';
            alert('Please select a YAML file first');
            return;
        }

        try {
            const readmeService = new ReadmeService();
            const result = await readmeService.generateWizardReadme(currentYmlContent, includePreviewCheckbox.checked);
            
            if (result.success) {
                // Create and download the README file
                downloadFile(result.readme, 'README.md');
                
                // If there's a preview image, download it
                if (result.previewImage.url) {
                    downloadImage(result.previewImage.url, result.previewImage.name);
                    finishedLabel.value = `README.md created for '${result.message.split("'")[1]}' and downloaded to your Downloads folder.\nPreview image '${result.previewImage.name}' created and downloaded to your Downloads folder.`;
                } else {
                    finishedLabel.value = `README.md created for '${result.message.split("'")[1]}' and downloaded to your Downloads folder.\nPreview image not created, don't forget to edit the image url manually yourself!`;
                }
            } else {
                finishedLabel.value = result.message;
                alert(result.message);
            }
        } catch (error) {
            console.error('Error generating README:', error);
            finishedLabel.value = 'Error generating README. Please try again.';
            alert('Error generating README. Please try again.');
        }
    });

    // Handle Manual README generation
    manualButton.addEventListener('click', async () => {
        if (!currentYmlContent) {
            finishedLabel.value = 'Please select a YAML file first';
            alert('Please select a YAML file first');
            return;
        }

        try {
            const readmeService = new ReadmeService();
            const result = await readmeService.generateManualReadme(currentYmlContent, includePreviewCheckbox.checked);
            
            if (result.success) {
                // Create and download the README file
                downloadFile(result.readme, 'README.md');
                
                // If there's a preview image, download it
                if (result.previewImage.url) {
                    downloadImage(result.previewImage.url, result.previewImage.name);
                    finishedLabel.value = `README.md created for '${result.message.split("'")[1]}' and downloaded to your Downloads folder.\nPreview image '${result.previewImage.name}' created and downloaded to your Downloads folder.`;
                } else {
                    finishedLabel.value = `README.md created for '${result.message.split("'")[1]}' and downloaded to your Downloads folder.\nPreview image not created, don't forget to edit the image url manually yourself!`;
                }
            } else {
                finishedLabel.value = result.message;
                alert(result.message);
            }
        } catch (error) {
            console.error('Error generating README:', error);
            finishedLabel.value = 'Error generating README. Please try again.';
            alert('Error generating README. Please try again.');
        }
    });
});

// Helper function to download text files
function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Helper function to download images
async function downloadImage(url, filename) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const imageUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(imageUrl);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading image:', error);
    }
} 