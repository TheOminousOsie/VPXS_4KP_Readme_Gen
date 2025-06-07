import ReadmeService from './Services/ReadmeService.js';
import WizardYml from './Models/WizardYml.js';
import * as YAML from 'https://cdn.jsdelivr.net/npm/yaml@2.3.4/browser/dist/index.min.js';
import VpsTableService from './Services/VpsTableService.js';

// Function to handle file selection
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileLabel');
    const wizardButton = document.getElementById('wizardButton');
    const manualButton = document.getElementById('manualButton');
    const validateButton = document.getElementById('validateButton');
    const includePreviewCheckbox = document.getElementById('includePreview');
    const prefixTableIdCheckbox = document.getElementById('prefixTableId');
    const finishedLabel = document.getElementById('finishedLabel');
    let currentYmlContent = null;

    if (!fileInput || !wizardButton || !manualButton || !validateButton || !includePreviewCheckbox || !prefixTableIdCheckbox || !finishedLabel) {
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
            finishedLabel.style.height = '';
            const readmeService = new ReadmeService();
            const result = await readmeService.generateWizardReadme(currentYmlContent, includePreviewCheckbox.checked);
            
            if (result.success) {
                // Create and download the README file
                const filename = prefixTableIdCheckbox.checked ? `${result.sanitizedId}_README.md` : 'README.md';
                downloadFile(result.readme, filename);
                
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
            finishedLabel.style.height = '';
            const readmeService = new ReadmeService();
            const result = await readmeService.generateManualReadme(currentYmlContent, includePreviewCheckbox.checked);
            
            if (result.success) {
                // Create and download the README file
                const filename = prefixTableIdCheckbox.checked ? `${result.sanitizedId}_README.md` : 'README.md';
                downloadFile(result.readme, filename);
                
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

    // Handle YML validation
    validateButton.addEventListener('click', async () => {
        if (!currentYmlContent) {
            finishedLabel.value = 'Please select a YAML file first';
            alert('Please select a YAML file first');
            return;
        }

        try {
            finishedLabel.style.height = '500px';
            const result = await validateYml(currentYmlContent);
            finishedLabel.value = result.message;
            
            if (!result.success) {
                // Clear the file input and current content
                fileInput.value = '';
                currentYmlContent = null;
            }
        } catch (error) {
            console.error('Error validating YML:', error);
            finishedLabel.value = 'Error validating YML. Please try again.';
            alert('Error validating YML. Please try again.');
            // Clear the file input and current content on error
            fileInput.value = '';
            currentYmlContent = null;
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

// Helper function to validate YML
async function validateYml(ymlContent) {
    try {
        const config = new WizardYml(YAML.parse(ymlContent));
        
        // Add more validation rules as needed
        const validationResults = [];
        
        // Check required fields
        if (!config.tableVPSId) validationResults.push('- Table VPS Id is required');

        if (!config.fps) validationResults.push('- FPS is required');
        
        if (!config.tagline) validationResults.push('- Tagline is required');
        
        // Check for at least one tester
        if (!config.testers || config.testers.length === 0) {
            validationResults.push('- Testers: \nAt least one tester is required');
        }

        // Type checking for all fields
        const typeChecks = {
            // Arrays
            applyFixes: { type: 'array', name: 'Apply Fixes' },
            backglassAuthorsOverride: { type: 'array', name: 'Backglass Authors Override' },
            testers: { type: 'array', name: 'Testers' },

            // Booleans
            backglassBundled: { type: 'boolean', name: 'Backglass Bundled' },
            coloredROMBundled: { type: 'boolean', name: 'Colored ROM Bundled' },
            enabled: { type: 'boolean', name: 'Enabled' },
            pupRequired: { type: 'boolean', name: 'PUP Required' },
            romBundled: { type: 'boolean', name: 'ROM Bundled' },

            // Numbers
            fps: { type: 'number', name: 'FPS' },

            // Strings
            backglassChecksum: { type: 'string', name: 'Backglass Checksum' },
            backglassImageOverride: { type: 'string', name: 'Backglass Image Override' },
            backglassNotes: { type: 'string', name: 'Backglass Notes' },
            backglassUrlOverride: { type: 'string', name: 'Backglass URL Override' },
            backglassVPSId: { type: 'string', name: 'Backglass VPS ID' },
            coloredROMChecksum: { type: 'string', name: 'Colored ROM Checksum' },
            coloredROMNotes: { type: 'string', name: 'Colored ROM Notes' },
            coloredROMUrlOverride: { type: 'string', name: 'Colored ROM URL Override' },
            coloredROMVersionOverride: { type: 'string', name: 'Colored ROM Version Override' },
            coloredROMVPSId: { type: 'string', name: 'Colored ROM VPS ID' },
            mainNotes: { type: 'string', name: 'Main Notes' },
            pupArchiveFormat: { type: 'string', name: 'PUP Archive Format' },
            pupArchiveRoot: { type: 'string', name: 'PUP Archive Root' },
            pupChecksum: { type: 'string', name: 'PUP Checksum' },
            pupFileUrl: { type: 'string', name: 'PUP File URL' },
            pupNotes: { type: 'string', name: 'PUP Notes' },
            pupVersion: { type: 'string', name: 'PUP Version' },
            romChecksum: { type: 'string', name: 'ROM Checksum' },
            romNotes: { type: 'string', name: 'ROM Notes' },
            romUrlOverride: { type: 'string', name: 'ROM URL Override' },
            romVersionOverride: { type: 'string', name: 'ROM Version Override' },
            romVPSId: { type: 'string', name: 'ROM VPS ID' },
            tableNameOverride: { type: 'string', name: 'Table Name Override' },
            tableNotes: { type: 'string', name: 'Table Notes' },
            tableVPSId: { type: 'string', name: 'Table VPS ID' },
            tagline: { type: 'string', name: 'Tagline' },
            vpxChecksum: { type: 'string', name: 'VPX Checksum' },
            vpxVPSId: { type: 'string', name: 'VPX VPS ID' }
        };

        // Check each field's type
        for (const [field, check] of Object.entries(typeChecks)) {
            if (config[field] !== undefined) {
                let isValid = false;
                switch (check.type) {
                    case 'array':
                        isValid = Array.isArray(config[field]);
                        break;
                    case 'boolean':
                        isValid = typeof config[field] === 'boolean';
                        break;
                    case 'string':
                        isValid = typeof config[field] === 'string';
                        break;
                    case 'number':
                        isValid = typeof config[field] === 'number' && Number.isInteger(config[field]);
                        break;
                }

                if (!isValid) {
                    validationResults.push(`- ${check.name} must be a ${check.type}.\nCurrently '${config[field]}' is type ${typeof config[field]}`);
                }
            }
        }

        // Check bundled fields have notes when true
        const bundledFields = [
            { bundled: 'romBundled', notes: 'romNotes', name: 'ROM' },
            { bundled: 'coloredROMBundled', notes: 'coloredROMNotes', name: 'Colored ROM' },
            { bundled: 'backglassBundled', notes: 'backglassNotes', name: 'Backglass' }
        ];

        for (const field of bundledFields) {
            if (config[field.bundled] === true && (!config[field.notes] || config[field.notes].trim() === '')) {
                validationResults.push(`- ${field.name} is bundled but has no notes.\nWhen ${field.name} is bundled, notes are required.`);
            }
        }

        // Check VPS IDs exist in database
        const vpsService = new VpsTableService('https://virtualpinballspreadsheet.github.io/vps-db/db/vpsdb.json');
        const vpsIdsToCheck = [
            { id: config.vpxVPSId, name: 'VPX' },
            { id: config.backglassVPSId, name: 'Backglass' },
            { id: config.romVPSId, name: 'ROM' },
            { id: config.coloredROMVPSId, name: 'Colored ROM' }
        ];

        let table = null;
        try {
            table = await vpsService.getTable(config.tableVPSId);
        
        } catch (error) {
            validationResults.push(`- Table VPS ID '${config.tableVPSId}' not found in VPS database.`);
        }
        
        for (const vpsId of vpsIdsToCheck) {
            if (vpsId.id) {
                // Check if the ID exists in the appropriate files array
                let found = false;
                for (const token of ['table', 'b2s', 'rom', 'pupPack', 'altColor']) {
                    const fileArray = table[`${token}Files`];
                    if (fileArray) {
                        for (const fle of fileArray) {
                            if (fle.id === vpsId.id) {
                                found = true;
                                break;
                            }
                        }
                    }
                }
                if (!found) {
                    validationResults.push(`- ${vpsId.name} VPS ID '${vpsId.id}' not found on table '${config.tableVPSId}'`);
                }
            }
        }

        // Check line lengths
        const lines = ymlContent.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const previousLine = i > 0 ? lines[i - 1].trim() : '';
            const isDisabled = previousLine === '# yamllint disable-line rule:line-length';
            
            if (!isDisabled && line.length > 120) {
                validationResults.push(`- Line ${i + 1} exceeds 120 characters (${line.length} chars).\nConsider using '# yamllint disable-line rule:line-length' above the line if needed.\nLine content: ${line.substring(0, 50)}...`);
            }
        }

        if (validationResults.length > 0) {
            return {
                success: false,
                message: 'YML validation failed:\n\n' + validationResults.join('\n\n')
            };
        }

        return {
            success: true,
            message: 'YML validation successful! \n\nAll required fields are present and valid.'
        };
    } catch (error) {
        return {
            success: false,
            message: 'YML validation failed: \n\nInvalid YAML format or structure'
        };
    }
} 