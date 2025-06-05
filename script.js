import ReadmeService from './Services/ReadmeService.js';
import WizardYml from './Models/WizardYml.js';
import * as YAML from 'https://cdn.jsdelivr.net/npm/yaml@2.3.4/browser/dist/index.min.js';

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
                
                // Parse and log YAML fields
                const config = new WizardYml(YAML.parse(currentYmlContent));
                console.log('Parsed YAML fields:', {
                    // Basic properties
                    enabled: config.enabled,
                    fps: config.fps,
                    tagline: config.tagline,
                    testers: config.testers,
                    
                    // Table related
                    tableNameOverride: config.tableNameOverride,
                    tableNotes: config.tableNotes,
                    tableVPSId: config.tableVPSId,
                    
                    // VPX related
                    vpxChecksum: config.vpxChecksum,
                    vpxVPSId: config.vpxVPSId,
                    vpxNotes: config.vpxNotes,
                    
                    // Backglass related
                    backglassAuthorsOverride: config.backglassAuthorsOverride,
                    backglassBundled: config.backglassBundled,
                    backglassChecksum: config.backglassChecksum,
                    backglassImageOverride: config.backglassImageOverride,
                    backglassNotes: config.backglassNotes,
                    backglassUrlOverride: config.backglassUrlOverride,
                    backglassVPSId: config.backglassVPSId,
                    
                    // ROM related
                    romBundled: config.romBundled,
                    romChecksum: config.romChecksum,
                    romNotes: config.romNotes,
                    romUrlOverride: config.romUrlOverride,
                    romVersionOverride: config.romVersionOverride,
                    romVPSId: config.romVPSId,
                    
                    // Colored ROM related
                    coloredROMBundled: config.coloredROMBundled,
                    coloredROMChecksum: config.coloredROMChecksum,
                    coloredROMNotes: config.coloredROMNotes,
                    coloredROMUrlOverride: config.coloredROMUrlOverride,
                    coloredROMVersionOverride: config.coloredROMVersionOverride,
                    coloredROMVPSId: config.coloredROMVPSId,
                    
                    // PUP related
                    pupArchiveFormat: config.pupArchiveFormat,
                    pupArchiveRoot: config.pupArchiveRoot,
                    pupChecksum: config.pupChecksum,
                    pupFileUrl: config.pupFileUrl,
                    pupNotes: config.pupNotes,
                    pupRequired: config.pupRequired,
                    pupVersion: config.pupVersion,
                    
                    // Main notes
                    mainNotes: config.mainNotes,
                    
                    // Apply fixes
                    applyFixes: config.applyFixes
                });
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
                downloadFile(result.readme, `${result.sanitizedId}_README.md`);
                
                // If there's a preview image, download it
                if (result.previewImage.url) {
                    downloadImage(result.previewImage.url, result.previewImage.name);
                    finishedLabel.value = `'${result.sanitizedId}_README.md' created for '${result.message.split("'")[1]}' and downloaded to your Downloads folder.\n\nPreview image '${result.previewImage.name}' created and downloaded to your Downloads folder.`;
                } else {
                    finishedLabel.value = `'${result.sanitizedId}_README.md' created for '${result.message.split("'")[1]}' and downloaded to your Downloads folder.\n\nPreview image not created, don't forget to edit the image url manually yourself!`;
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
                downloadFile(result.readme, `${result.sanitizedId}_README.md`);
                
                // If there's a preview image, download it
                if (result.previewImage.url) {
                    downloadImage(result.previewImage.url, result.previewImage.name);
                    finishedLabel.value = `'${result.sanitizedId}_README.md' created for '${result.message.split("'")[1]}' and downloaded to your Downloads folder.\n\nPreview image '${result.previewImage.name}' created and downloaded to your Downloads folder.`;
                } else {
                    finishedLabel.value = `'${result.sanitizedId}_README.md' created for '${result.message.split("'")[1]}' and downloaded to your Downloads folder.\n\nPreview image not created, don't forget to edit the image url manually yourself!`;
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