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
        this.coloredROMBundled = data.coloredROMBundled || data.coloredromBundled || data.ColoredROMBundled || false;
        this.coloredROMChecksum = data.coloredROMChecksum || data.coloredromchecksum || data.ColoredROMChecksum || '';
        this.coloredROMNotes = data.coloredROMNotes || data.coloredromnotes || data.ColoredROMNotes || '';
        this.coloredROMUrlOverride = data.coloredROMUrlOverride || data.coloredromurloverride || data.ColoredROMUrlOverride || '';
        this.coloredROMVersionOverride = data.coloredROMVersionOverride || data.coloredromversionoverride || data.ColoredROMVersionOverride || '';
        this.coloredROMVPSId = data.coloredROMVPSId || data.coloredromvpsid || data.ColoredROMVPSId || '';

        // Basic properties
        this.enabled = data.enabled || false;
        this.fps = data.fps || 0;

        // Main notes
        this.mainNotes = data.mainNotes || data.mainnotes || data.MainNotes || '';

        // PUP related
        this.pupArchiveFormat = data.pupArchiveFormat || data.puparchiveformat || data.PupArchiveFormat || '';
        this.pupArchiveRoot = data.pupArchiveRoot || data.puparchiveroot || data.PupArchiveRoot || '';
        this.pupChecksum = data.pupChecksum || data.pupchecksum || data.PupChecksum || '';
        this.pupFileUrl = data.pupFileUrl || data.pupfileurl || data.PupFileUrl || '';
        this.pupNotes = data.pupNotes || data.pupnotes || data.PupNotes || '';
        this.pupRequired = data.pupRequired || data.puprequired || data.PupRequired || false;
        this.pupVersion = data.pupVersion || data.pupversion || data.PupVersion || '';

        // ROM related
        this.romBundled = data.romBundled || data.rombundled || data.RomBundled || false;
        this.romChecksum = data.romChecksum || data.romchecksum || data.RomChecksum || '';
        this.romNotes = data.romNotes || data.romnotes || data.RomNotes || '';
        this.romUrlOverride = data.romUrlOverride || data.romurloverride || data.RomUrlOverride || '';
        this.romVersionOverride = data.romVersionOverride || data.romversionoverride || data.RomVersionOverride || '';
        this.romVPSId = data.romVPSId || data.romvpsid || data.RomVPSId || '';

        // Table related
        this.tableNameOverride = data.tableNameOverride || data.tablenameoverride || data.TableNameOverride || '';
        this.tableNotes = data.tableNotes || data.tablenotes || data.TableNotes || '';
        this.tableVPSId = data.tableVPSId || data.tablevpsid || data.TableVPSId || '';

        // Other properties
        this.tagline = data.tagline || '';
        this.testers = data.testers || [];

        // VPX related
        this.vpxChecksum = data.vpxChecksum || data.vpxchecksum || data.VpxChecksum || '';
        this.vpxVPSId = data.vpxVPSId || data.vpxvpsid || data.VpxVPSId || '';
        this.vpxNotes = data.vpxNotes || data.vpxnotes || data.VpxNotes || '';
    }
}

export default WizardYml; 