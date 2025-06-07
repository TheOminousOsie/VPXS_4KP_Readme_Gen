class WizardYml {
    constructor(data = {}) {
        // Apply fixes
        this.applyFixes = data.applyFixes || data.applyfixes || data.ApplyFixes || [];

        // Backglass related
        this.backglassAuthorsOverride = data.backglassAuthorsOverride || data.backglassauthorsoverride || data.BackglassAuthorsOverride || [];
        this.backglassBundled = data.backglassBundled || data.backglassbundled || data.BackglassBundled || false;
        this.backglassChecksum = data.backglassChecksum || data.backglasschecksum || data.BackglassChecksum || '';
        this.backglassImageOverride = data.backglassImageOverride || data.backglassimageoverride || data.BackglassImageOverride || '';
        this.backglassNotes = data.backglassNotes || data.backglassnotes || data.BackglassNotes || '';
        this.backglassUrlOverride = data.backglassUrlOverride || data.backglassurloverride || data.BackglassUrlOverride || '';
        this.backglassVPSId = data.backglassVPSId || data.backglassvpsid || data.BackglassVPSId || '';

        // Colored ROM related
        this.coloredROMBundled = data.coloredROMBundled || data.coloredromBundled || data.ColoredROMBundled || data.coloredRomBundled || data.ColoredRomBundled || 
            data.coloredrombundled || data.Coloredrombundled || data.coloredROMbundled || data.ColoredROMbundled || false;
        this.coloredROMChecksum = data.coloredROMChecksum || data.coloredromchecksum || data.ColoredROMChecksum || data.coloredRomChecksum || data.ColoredRomChecksum || 
            data.coloredromchecksum || data.Coloredromchecksum || data.coloredROMchecksum || data.ColoredROMchecksum || '';
        this.coloredROMNotes = data.coloredROMNotes || data.coloredromnotes || data.ColoredROMNotes || data.coloredRomNotes || data.ColoredRomNotes || 
            data.coloredromnotes || data.Coloredromnotes || data.coloredROMnotes || data.ColoredROMnotes || '';
        this.coloredROMUrlOverride = data.coloredROMUrlOverride || data.coloredromurloverride || data.ColoredROMUrlOverride || data.coloredRomUrlOverride || data.ColoredRomUrlOverride || 
            data.coloredromurloverride || data.Coloredromurloverride || data.coloredROMurloverride || data.ColoredROMurloverride || '';
        this.coloredROMVersionOverride = data.coloredROMVersionOverride || data.coloredromversionoverride || data.ColoredROMVersionOverride || data.coloredRomVersionOverride || data.ColoredRomVersionOverride || 
            data.coloredromversionoverride || data.Coloredromversionoverride || data.coloredROMversionoverride || data.ColoredROMversionoverride || '';
        this.coloredROMVPSId = data.coloredROMVPSId || data.coloredromvpsid || data.ColoredROMVPSId || data.coloredRomVPSId || data.ColoredRomVPSId || 
            data.coloredromvpsid || data.Coloredromvpsid || data.coloredROMvpsid || data.ColoredROMvpsid || '';

        // Basic properties
        this.enabled = data.enabled || false;
        this.fps = data.fps || 0;

        // Main notes
        this.mainNotes = data.mainNotes || data.mainnotes || data.MainNotes || '';

        // PUP related
        this.pupArchiveFormat = data.pupArchiveFormat || data.puparchiveformat || data.PupArchiveFormat || '';
        this.pupArchiveRoot = data.pupArchiveRoot || data.puparchiveroot || data.PupArchiveRoot || '';
        this.pupChecksum = data.pupChecksum || data.pupchecksum || data.PupChecksum || data.PUPChecksum || data.Pupchecksum || data.PUPchecksum || '';
        this.pupFileUrl = data.pupFileUrl || data.pupfileurl || data.PupFileUrl || '';
        this.pupNotes = data.pupNotes || data.pupnotes || data.PupNotes || '';
        this.pupRequired = data.pupRequired || data.puprequired || data.PupRequired || false;
        this.pupVersion = data.pupVersion || data.pupversion || data.PupVersion || '';

        // ROM related
        this.romBundled = data.romBundled || data.rombundled || data.RomBundled || data.ROMBundled || data.Rombundled || data.ROMbundled || false;
        this.romChecksum = data.romChecksum || data.romchecksum || data.RomChecksum || data.ROMChecksum || data.Romchecksum || data.ROMchecksum || '';
        this.romNotes = data.romNotes || data.romnotes || data.RomNotes || data.ROMNotes || data.Romnotes || data.ROMnotes || '';
        this.romUrlOverride = data.romUrlOverride || data.romurloverride || data.RomUrlOverride || data.ROMUrlOverride || data.Romurloverride || data.ROMurloverride || '';
        this.romVersionOverride = data.romVersionOverride || data.romversionoverride || data.RomVersionOverride || data.ROMVersionOverride || data.Romversionoverride || data.ROMversionoverride || '';
        this.romVPSId = data.romVPSId || data.romvpsid || data.RomVPSId || data.ROMVPSId || data.Romvpsid || data.ROMvpsid || '';

        // Table related
        this.tableNameOverride = data.tableNameOverride || data.tablenameoverride || data.TableNameOverride || '';
        this.tableNotes = data.tableNotes || data.tablenotes || data.TableNotes || '';
        this.tableVPSId = data.tableVPSId || data.tablevpsid || data.TableVPSId || '';

        // Other properties
        this.tagline = data.tagline || '';
        this.testers = data.testers || [];

        // VPX related
        this.vpxChecksum = data.vpxChecksum || data.vpxchecksum || data.VpxChecksum || data.VPXChecksum || data.Vpxchecksum || data.VPXchecksum || '';
        this.vpxVPSId = data.vpxVPSId || data.vpxvpsid || data.VpxVPSId || data.VPXVPSId || data.Vpxvpsid || data.VPXvpsid || '';
        this.vpxNotes = data.vpxNotes || data.vpxnotes || data.VpxNotes || data.VPXNotes || data.Vpxnotes || data.VPXnotes || '';
    }
}

export default WizardYml; 