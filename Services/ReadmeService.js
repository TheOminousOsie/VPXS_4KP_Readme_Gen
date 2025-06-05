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

            // Sanitize VPS ID for filenames
            const sanitizedId = config.vpxVPSId.replace(/[^a-zA-Z0-9-_]/g, '_');

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
                    // Sanitize vpxVPSId for file path and use it for the preview image name
                    const sanitizedId = config.vpxVPSId.replace(/[^a-zA-Z0-9-_]/g, '_');
                    previewImageName = `${sanitizedId}-preview${this.getFileExtension(previewImageUrl)}`;
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
                },
                sanitizedId: sanitizedId
            };
        } catch (error) {
            console.error('Error generating README:', error);
            return {
                success: false,
                message: `Error generating README: ${error.message}`
            };
        }
    }

    updateUrlFields(newReadme, table, vpsId, tokenPrefix, urlOverride = null, authors = null) {
        if (urlOverride) {
            newReadme = newReadme.replace(`{${tokenPrefix}Link}`, urlOverride);
            const uri = new URL(urlOverride);
            const host = uri.host;
            const parts = host.split('.');

            let domainName;
            if (parts.length >= 2 && parts[0] === 'www') {
                domainName = parts[1]; // Take second part if first is "www"
            } else {
                domainName = parts[0]; // Take first part otherwise
            }
            newReadme = newReadme.replace(`{${tokenPrefix}Website}`, domainName);

            newReadme = newReadme.replace(`{${tokenPrefix}Version}`, 'N/A');
            newReadme = newReadme.replace(`{${tokenPrefix}Author}`, 'N/A');

            return { readme: newReadme, success: true };
        } else {
            let file = null;
            for (const token of ['table', 'b2s', 'rom', 'pupPack', 'altColor']) {
                if (file) break;

                const fileArray = table[`${token}Files`];
                if (fileArray) {
                    for (const fle of fileArray) {
                        if (fle.id === vpsId) {
                            file = fle;
                            break;
                        }
                    }
                }
            }

            if (!file) {
                return { readme: newReadme, success: false };
            }

            const fileUrls = file.urls || [];
            for (const fileUrl of fileUrls) {
                if (!fileUrl.broken) {
                    if (fileUrl.url) {
                        newReadme = newReadme.replace(`{${tokenPrefix}Link}`, fileUrl.url);
                        const uri = new URL(fileUrl.url);
                        const host = uri.host;
                        const parts = host.split('.');

                        let domainName;
                        if (parts.length >= 2 && parts[0] === 'www') {
                            domainName = parts[1]; // Take second part if first is "www"
                        } else {
                            domainName = parts[0]; // Take first part otherwise
                        }
                        newReadme = newReadme.replace(`{${tokenPrefix}Website}`, domainName);
                        break;
                    }
                }
            }

            if (authors) {
                newReadme = newReadme.replace(`{${tokenPrefix}Author}`, authors.join(', '));
            } else {
                const authorsList = file.authors;
                if (!authorsList) {
                    newReadme = newReadme.replace(`{${tokenPrefix}Author}`, 'N/A');
                } else {
                    newReadme = newReadme.replace(`{${tokenPrefix}Author}`, authorsList.join(', '));
                }
            }

            const version = file.version || 'N/A';
            newReadme = newReadme.replace(`{${tokenPrefix}Version}`, version);

            return { readme: newReadme, success: true };
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

            // Sanitize VPS ID for filenames
            const sanitizedId = config.vpxVPSId.replace(/[^a-zA-Z0-9-_]/g, '_');

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
                .replace(/{testers}/g, config.testers.map(x => `${x === "OminousOsie" ? "Ominous Osie 🌸" : x}`).join(', '))
                .replace(/{tagline}/g, config.tagline)
                .replace(/{mainNotes}/g, config.mainNotes || '')
                .replace(/{tableNotes}/g, config.tableNotes || '')
                .replace(/{vpxNotes}/g, config.vpxNotes || '')
                .replace(/{backglassNotes}/g, config.backglassNotes || '')
                .replace(/{romNotes}/g, config.romNotes || '')
                .replace(/{coloredROMNotes}/g, config.coloredROMNotes || '')
                .replace(/{pupNotes}/g, config.pupNotes || '');

            // Update URL fields
            const tableResult = this.updateUrlFields(newReadme, table, config.vpxVPSId, 'table', config.vpxUrlOverride);
            if (tableResult.success) {
                newReadme = tableResult.readme;
            }

            // Handle backglass
            if (config.backglassChecksum && !config.backglassBundled) {
                const backglassResult = this.updateUrlFields(newReadme, table, config.backglassVPSId, 'b2s', config.backglassUrlOverride, config.backglassAuthorsOverride);
                if (backglassResult.success) {
                    newReadme = backglassResult.readme;
                }
            } else if (config.backglassBundled) {
                const backglassResult = this.updateUrlFields(newReadme, table, config.vpxVPSId, 'b2s');
                if (backglassResult.success) {
                    newReadme = backglassResult.readme;
                }
            } else {
                newReadme = newReadme
                    .replace(/{b2sWebsite}/g, 'N/A')
                    .replace(/{b2sLink}/g, 'N/A')
                    .replace(/{b2sVersion}/g, 'N/A')
                    .replace(/{b2sAuthor}/g, 'N/A');
            }

            // Handle ROM
            if (config.romChecksum && !config.romBundled) {
                const romResult = this.updateUrlFields(newReadme, table, config.romVPSId, 'rom', config.romUrlOverride);
                if (romResult.success) {
                    newReadme = romResult.readme;
                }
            } else if (config.romBundled) {
                const romResult = this.updateUrlFields(newReadme, table, config.vpxVPSId, 'rom');
                if (romResult.success) {
                    newReadme = romResult.readme;
                }
            } else {
                newReadme = newReadme
                    .replace(/{romWebsite}/g, 'N/A')
                    .replace(/{romLink}/g, 'N/A')
                    .replace(/{romVersion}/g, 'N/A')
                    .replace(/{romAuthor}/g, 'N/A');
            }

            // Handle colored ROM
            if (config.coloredROMChecksum && !config.coloredROMBundled) {
                const coloredRomResult = this.updateUrlFields(newReadme, table, config.coloredROMVPSId, 'altColor', config.coloredROMUrlOverride);
                if (coloredRomResult.success) {
                    newReadme = coloredRomResult.readme;
                }
            } else if (config.coloredROMBundled) {
                const romResult = this.updateUrlFields(newReadme, table, config.vpxVPSId, 'altColor');
                if (romResult.success) {
                    newReadme = romResult.readme;
                }
            } else {
                newReadme = newReadme
                    .replace(/{altColorWebsite}/g, 'N/A')
                    .replace(/{altColorLink}/g, 'N/A')
                    .replace(/{altColorVersion}/g, 'N/A')
                    .replace(/{altColorAuthor}/g, 'N/A');
            }

            // Handle PUP
            if (config.pupChecksum) {
                newReadme = newReadme
                    .replace(/{pupPackLink}/g, config.pupFileUrl);
                
                const uri = new URL(config.pupFileUrl);
                const host = uri.host;
                const parts = host.split('.');

                let domainName;
                if (parts.length >= 2 && parts[0] === 'www') {
                    domainName = parts[1]; // Take second part if first is "www"
                } else {
                    domainName = parts[0]; // Take first part otherwise
                }
                
                newReadme = newReadme
                    .replace(/{pupPackWebsite}/g, domainName)
                    .replace(/{pupPackVersion}/g, config.pupVersion)
                    .replace(/{pupPackAuthor}/g, 'N/A');
            } else {
                newReadme = newReadme
                    .replace(/{pupPackWebsite}/g, 'N/A')
                    .replace(/{pupPackLink}/g, 'N/A')
                    .replace(/{pupPackVersion}/g, 'N/A')
                    .replace(/{pupPackAuthor}/g, 'N/A');
            }

            // Handle preview image
            let previewImageUrl = '';
            let previewImageName = '';

            if (includePreview && table.tableFiles) {
                const vpxFile = table.tableFiles.find(file => file.id === config.vpxVPSId);
                if (vpxFile && vpxFile.imgUrl) {
                    previewImageUrl = vpxFile.imgUrl;
                    // Sanitize vpxVPSId for file path and use it for the preview image name
                    const sanitizedId = config.vpxVPSId.replace(/[^a-zA-Z0-9-_]/g, '_');
                    previewImageName = `${sanitizedId}-preview${this.getFileExtension(previewImageUrl)}`;
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
                },
                sanitizedId: sanitizedId
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