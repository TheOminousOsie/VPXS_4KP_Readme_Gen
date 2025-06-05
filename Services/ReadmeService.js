import WizardYml from '../Models/WizardYml.js';
import VpsTableService from './VpsTableService.js';
import * as YAML from 'https://cdn.jsdelivr.net/npm/yaml@2.3.4/browser/dist/index.min.js';

class ReadmeService {
    constructor() {
        this.vpsUrl = 'https://virtualpinballspreadsheet.github.io/vps-db/db/vpsdb.json';
    }

    convertTitle(title) {
        const matchThe = title.match(/^(JP'?s\s*)?(The)\s+(.+)$/);
        const matchJps = title.match(/^(JP'?s)\s+(.+)$/);

        if (matchThe && matchThe[2]) {
            const prefix = matchThe[1] || "";
            return `${matchThe[3]}, ${prefix}${matchThe[2]}`;
        } else if (matchJps) {
            return `${matchJps[2]}, ${matchJps[1]}`;
        } else {
            return title;
        }
    }

    async generateWizardReadme(ymlContent, includePreview) {
        try {
            // Parse YAML content
            const config = new WizardYml(YAML.parse(ymlContent));

            // Initialize VPS service
            const vpsService = new VpsTableService(this.vpsUrl);
            const table = await vpsService.getTable(config.tableVPSId);

            if (!table) {
                return {
                    success: false,
                    message: `Table with VPS ID ${config.tableVPSId} not found in VPSDB.`
                };
            }

            // Get table details
            const name = config.tableNameOverride || this.convertTitle(table.name);
            const manufacturer = table.manufacturer;
            const year = table.year;

            // Load README template
            const response = await fetch('https://theominousosie.github.io/VPXS_4KP_Readme_Gen/Content/wiz_README.md');
            let newReadme = await response.text();

            // Replace placeholders
            newReadme = newReadme
                .replace(/{name}/g, name)
                .replace(/{manufacturer}/g, manufacturer)
                .replace(/{year}/g, year)
                .replace(/{hasBackglass}/g, config.backglassChecksum ? '✅' : '❌')
                .replace(/{hasDMD}/g, config.romChecksum ? '✅' : '❌')
                .replace(/{hasROM}/g, config.romChecksum ? '✅' : '❌')
                .replace(/{hasPup}/g, config.pupChecksum ? '✅' : '❌')
                .replace(/{fps}/g, config.fps.toString())
                .replace(/{testers}/g, config.testers.map(x => `  - ${x === "OminousOsie" ? "Ominous Osie 🌸" : x}`).join('\n'))
                .replace(/{tagline}/g, config.tagline);

            // Handle preview image
            let previewImageUrl = '';
            let previewImageName = '';

            if (includePreview && table.tableFiles) {
                const vpxFile = table.tableFiles.find(file => file.id === config.vpxVPSId);
                if (vpxFile && vpxFile.imgUrl) {
                    previewImageUrl = vpxFile.imgUrl;
                    previewImageName = `${name}-preview${this.getFileExtension(previewImageUrl)}`;
                    newReadme = newReadme.replace(/{previewImageName}/g, previewImageName);
                }
            }

            return {
                success: true,
                message: `Wizard README Created for '${name}'`,
                readme: newReadme,
                previewImage: {
                    url: previewImageUrl,
                    name: previewImageName
                }
            };
        } catch (error) {
            console.error('Error generating README:', error);
            return {
                success: false,
                message: `Error generating README: ${error.message}`
            };
        }
    }

    async generateManualReadme(ymlContent, includePreview) {
        try {
            // Parse YAML content
            const config = new WizardYml(YAML.parse(ymlContent));

            // Initialize VPS service
            const vpsService = new VpsTableService(this.vpsUrl);
            const table = await vpsService.getTable(config.tableVPSId);

            if (!table) {
                return {
                    success: false,
                    message: `Table with VPS ID ${config.tableVPSId} not found in VPSDB.`
                };
            }

            // Get table details
            const name = config.tableNameOverride || this.convertTitle(table.name);
            const manufacturer = table.manufacturer;
            const year = table.year;

            // Load README template
            const response = await fetch('https://theominousosie.github.io/VPXS_4KP_Readme_Gen/Content/man_README.md');
            let newReadme = await response.text();

            // Replace placeholders
            newReadme = newReadme
                .replace(/{name}/g, name)
                .replace(/{manufacturer}/g, manufacturer)
                .replace(/{year}/g, year)
                .replace(/{hasBackglass}/g, config.backglassChecksum ? '✅' : '❌')
                .replace(/{hasDMD}/g, config.romChecksum ? '✅' : '❌')
                .replace(/{hasROM}/g, config.romChecksum ? '✅' : '❌')
                .replace(/{hasPup}/g, config.pupChecksum ? '✅' : '❌')
                .replace(/{fps}/g, config.fps.toString())
                .replace(/{testers}/g, config.testers.map(x => `  - ${x === "OminousOsie" ? "Ominous Osie 🌸" : x}`).join('\n'))
                .replace(/{tagline}/g, config.tagline)
                .replace(/{mainNotes}/g, config.mainNotes || '')
                .replace(/{tableNotes}/g, config.tableNotes || '')
                .replace(/{vpxNotes}/g, config.vpxNotes || '')
                .replace(/{backglassNotes}/g, config.backglassNotes || '')
                .replace(/{romNotes}/g, config.romNotes || '')
                .replace(/{coloredROMNotes}/g, config.coloredROMNotes || '')
                .replace(/{pupNotes}/g, config.pupNotes || '');

            // Handle preview image
            let previewImageUrl = '';
            let previewImageName = '';

            if (includePreview && table.tableFiles) {
                const vpxFile = table.tableFiles.find(file => file.id === config.vpxVPSId);
                if (vpxFile && vpxFile.imgUrl) {
                    previewImageUrl = vpxFile.imgUrl;
                    previewImageName = `${name}-preview${this.getFileExtension(previewImageUrl)}`;
                    newReadme = newReadme.replace(/{previewImageName}/g, previewImageName);
                }
            }

            return {
                success: true,
                message: `Manual README Created for '${name}'`,
                readme: newReadme,
                previewImage: {
                    url: previewImageUrl,
                    name: previewImageName
                }
            };
        } catch (error) {
            console.error('Error generating README:', error);
            return {
                success: false,
                message: `Error generating README: ${error.message}`
            };
        }
    }

    getFileExtension(url) {
        if (!url) return '.webp';
        const match = url.match(/\.([^.]+)$/);
        return match ? `.${match[1]}` : '.webp';
    }
}

export default ReadmeService; 