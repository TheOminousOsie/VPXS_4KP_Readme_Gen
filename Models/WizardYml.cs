using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YamlDotNet.Serialization;

namespace ReadmeGenerator.Models
{
    public class WizardYml
    {
        // ApplyFixes - flexible casing
        public List<string> ApplyFixes { get => ApplyFixes1 ?? ApplyFixes2 ?? ApplyFixes3 ?? new(); }
        [YamlMember(Alias = "applyFixes")]
        public List<string>? ApplyFixes1 { get; set; } = null;
        [YamlMember(Alias = "applyfixes")]
        public List<string>? ApplyFixes2 { get; set; } = null;
        [YamlMember(Alias = "ApplyFixes")]
        public List<string>? ApplyFixes3 { get; set; } = null;

        // BackglassAuthorsOverride - flexible casing
        public List<string> BackglassAuthorsOverride { get => BackglassAuthorsOverride1 ?? BackglassAuthorsOverride2 ?? BackglassAuthorsOverride3 ?? new(); }
        [YamlMember(Alias = "backglassAuthorsOverride")]
        public List<string>? BackglassAuthorsOverride1 { get; set; } = null;
        [YamlMember(Alias = "backglassauthorsoverride")]
        public List<string>? BackglassAuthorsOverride2 { get; set; } = null;
        [YamlMember(Alias = "BackglassAuthorsOverride")]
        public List<string>? BackglassAuthorsOverride3 { get; set; } = null;

        // BackglassBundled - flexible casing
        public bool BackglassBundled { get => BackglassBundled1 ?? BackglassBundled2 ?? BackglassBundled3 ?? false; }
        [YamlMember(Alias = "backglassBundled")]
        public bool? BackglassBundled1 { get; set; } = null;
        [YamlMember(Alias = "backglassbundled")]
        public bool? BackglassBundled2 { get; set; } = null;
        [YamlMember(Alias = "BackglassBundled")]
        public bool? BackglassBundled3 { get; set; } = null;

        // BackglassChecksum - flexible casing
        public string BackglassChecksum { get => BackglassChecksum1 ?? BackglassChecksum2 ?? BackglassChecksum3 ?? string.Empty; }
        [YamlMember(Alias = "backglassChecksum")]
        public string? BackglassChecksum1 { get; set; } = null;
        [YamlMember(Alias = "backglasschecksum")]
        public string? BackglassChecksum2 { get; set; } = null;
        [YamlMember(Alias = "BackglassChecksum")]
        public string? BackglassChecksum3 { get; set; } = null;

        // BackglassImageOverride - flexible casing
        public string BackglassImageOverride { get => BackglassImageOverride1 ?? BackglassImageOverride2 ?? BackglassImageOverride3 ?? string.Empty; }
        [YamlMember(Alias = "backglassImageOverride")]
        public string? BackglassImageOverride1 { get; set; } = null;
        [YamlMember(Alias = "backglassimageoverride")]
        public string? BackglassImageOverride2 { get; set; } = null;
        [YamlMember(Alias = "BackglassImageOverride")]
        public string? BackglassImageOverride3 { get; set; } = null;

        // BackglassNotes - flexible casing
        public string BackglassNotes { get => BackglassNotes1 ?? BackglassNotes2 ?? BackglassNotes3 ?? string.Empty; }
        [YamlMember(Alias = "backglassNotes")]
        public string? BackglassNotes1 { get; set; } = null;
        [YamlMember(Alias = "backglassnotes")]
        public string? BackglassNotes2 { get; set; } = null;
        [YamlMember(Alias = "BackglassNotes")]
        public string? BackglassNotes3 { get; set; } = null;

        // BackglassUrlOverride - flexible casing
        public string BackglassUrlOverride { get => BackglassUrlOverride1 ?? BackglassUrlOverride2 ?? BackglassUrlOverride3 ?? string.Empty; }
        [YamlMember(Alias = "backglassUrlOverride")]
        public string? BackglassUrlOverride1 { get; set; } = null;
        [YamlMember(Alias = "backglassurloverride")]
        public string? BackglassUrlOverride2 { get; set; } = null;
        [YamlMember(Alias = "BackglassUrlOverride")]
        public string? BackglassUrlOverride3 { get; set; } = null;

        // BackglassVPSId - flexible casing
        public string BackglassVPSId { get => BackglassVPSId1 ?? BackglassVPSId2 ?? BackglassVPSId3 ?? string.Empty; }
        [YamlMember(Alias = "backglassVPSId")]
        public string? BackglassVPSId1 { get; set; } = null;
        [YamlMember(Alias = "backglassvpsid")]
        public string? BackglassVPSId2 { get; set; } = null;
        [YamlMember(Alias = "BackglassVPSId")]
        public string? BackglassVPSId3 { get; set; } = null;

        // ColoredROMBundled - flexible casing
        public bool ColoredROMBundled { get => ColoredROMBundled1 ?? ColoredROMBundled2 ?? ColoredROMBundled3 ?? false; }
        [YamlMember(Alias = "coloredROMBundled")]
        public bool? ColoredROMBundled1 { get; set; } = null;
        [YamlMember(Alias = "coloredromBundled")]
        public bool? ColoredROMBundled2 { get; set; } = null;
        [YamlMember(Alias = "ColoredROMBundled")]
        public bool? ColoredROMBundled3 { get; set; } = null;

        // ColoredROMChecksum - flexible casing
        public string ColoredROMChecksum { get => ColoredROMChecksum1 ?? ColoredROMChecksum2 ?? ColoredROMChecksum3 ?? string.Empty; }
        [YamlMember(Alias = "coloredROMChecksum")]
        public string? ColoredROMChecksum1 { get; set; } = null;
        [YamlMember(Alias = "coloredromchecksum")]
        public string? ColoredROMChecksum2 { get; set; } = null;
        [YamlMember(Alias = "ColoredROMChecksum")]
        public string? ColoredROMChecksum3 { get; set; } = null;

        // ColoredROMNotes - flexible casing
        public string ColoredROMNotes { get => ColoredROMNotes1 ?? ColoredROMNotes2 ?? ColoredROMNotes3 ?? string.Empty; }
        [YamlMember(Alias = "coloredROMNotes")]
        public string? ColoredROMNotes1 { get; set; } = null;
        [YamlMember(Alias = "coloredromnotes")]
        public string? ColoredROMNotes2 { get; set; } = null;
        [YamlMember(Alias = "ColoredROMNotes")]
        public string? ColoredROMNotes3 { get; set; } = null;

        // ColoredROMUrlOverride - flexible casing
        public string ColoredROMUrlOverride { get => ColoredROMUrlOverride1 ?? ColoredROMUrlOverride2 ?? ColoredROMUrlOverride3 ?? string.Empty; }
        [YamlMember(Alias = "coloredROMUrlOverride")]
        public string? ColoredROMUrlOverride1 { get; set; } = null;
        [YamlMember(Alias = "coloredromurloverride")]
        public string? ColoredROMUrlOverride2 { get; set; } = null;
        [YamlMember(Alias = "ColoredROMUrlOverride")]
        public string? ColoredROMUrlOverride3 { get; set; } = null;

        // ColoredROMVersionOverride - flexible casing
        public string ColoredROMVersionOverride { get => ColoredROMVersionOverride1 ?? ColoredROMVersionOverride2 ?? ColoredROMVersionOverride3 ?? string.Empty; }
        [YamlMember(Alias = "coloredROMVersionOverride")]
        public string? ColoredROMVersionOverride1 { get; set; } = null;
        [YamlMember(Alias = "coloredromversionoverride")]
        public string? ColoredROMVersionOverride2 { get; set; } = null;
        [YamlMember(Alias = "ColoredROMVersionOverride")]
        public string? ColoredROMVersionOverride3 { get; set; } = null;

        // ColoredROMVPSId - flexible casing
        public string ColoredROMVPSId { get => ColoredROMVPSId1 ?? ColoredROMVPSId2 ?? ColoredROMVPSId3 ?? string.Empty; }
        [YamlMember(Alias = "coloredROMVPSId")]
        public string? ColoredROMVPSId1 { get; set; } = null;
        [YamlMember(Alias = "coloredromvpsid")]
        public string? ColoredROMVPSId2 { get; set; } = null;
        [YamlMember(Alias = "ColoredROMVPSId")]
        public string? ColoredROMVPSId3 { get; set; } = null;

        [YamlMember(Alias = "enabled")]
        public bool Enabled { get; set; }

        [YamlMember(Alias = "fps")]
        public int Fps { get; set; }

        // MainNotes - flexible casing
        public string MainNotes { get => MainNotes1 ?? MainNotes2 ?? MainNotes3 ?? string.Empty; }
        [YamlMember(Alias = "mainNotes")]
        public string? MainNotes1 { get; set; } = null;
        [YamlMember(Alias = "mainnotes")]
        public string? MainNotes2 { get; set; } = null;
        [YamlMember(Alias = "MainNotes")]
        public string? MainNotes3 { get; set; } = null;

        // PupArchiveFormat - flexible casing
        public string PupArchiveFormat { get => PupArchiveFormat1 ?? PupArchiveFormat2 ?? PupArchiveFormat3 ?? string.Empty; }
        [YamlMember(Alias = "pupArchiveFormat")]
        public string? PupArchiveFormat1 { get; set; } = null;
        [YamlMember(Alias = "puparchiveformat")]
        public string? PupArchiveFormat2 { get; set; } = null;
        [YamlMember(Alias = "PupArchiveFormat")]
        public string? PupArchiveFormat3 { get; set; } = null;

        // PupArchiveRoot - flexible casing
        public string PupArchiveRoot { get => PupArchiveRoot1 ?? PupArchiveRoot2 ?? PupArchiveRoot3 ?? string.Empty; }
        [YamlMember(Alias = "pupArchiveRoot")]
        public string? PupArchiveRoot1 { get; set; } = null;
        [YamlMember(Alias = "puparchiveroot")]
        public string? PupArchiveRoot2 { get; set; } = null;
        [YamlMember(Alias = "PupArchiveRoot")]
        public string? PupArchiveRoot3 { get; set; } = null;

        // PupChecksum - flexible casing
        public string PupChecksum { get => PupChecksum1 ?? PupChecksum2 ?? PupChecksum3 ?? string.Empty; }
        [YamlMember(Alias = "pupChecksum")]
        public string? PupChecksum1 { get; set; } = null;
        [YamlMember(Alias = "pupchecksum")]
        public string? PupChecksum2 { get; set; } = null;
        [YamlMember(Alias = "PupChecksum")]
        public string? PupChecksum3 { get; set; } = null;

        // PupFileUrl - flexible casing
        public string PupFileUrl { get => PupFileUrl1 ?? PupFileUrl2 ?? PupFileUrl3 ?? string.Empty; }
        [YamlMember(Alias = "pupFileUrl")]
        public string? PupFileUrl1 { get; set; } = null;
        [YamlMember(Alias = "pupfileurl")]
        public string? PupFileUrl2 { get; set; } = null;
        [YamlMember(Alias = "PupFileUrl")]
        public string? PupFileUrl3 { get; set; } = null;

        // PupNotes - flexible casing
        public string PupNotes { get => PupNotes1 ?? PupNotes2 ?? PupNotes3 ?? string.Empty; }
        [YamlMember(Alias = "pupNotes")]
        public string? PupNotes1 { get; set; } = null;
        [YamlMember(Alias = "pupnotes")]
        public string? PupNotes2 { get; set; } = null;
        [YamlMember(Alias = "PupNotes")]
        public string? PupNotes3 { get; set; } = null;

        // PupRequired - flexible casing
        public bool PupRequired { get => PupRequired1 ?? PupRequired2 ?? PupRequired3 ?? false; }
        [YamlMember(Alias = "pupRequired")]
        public bool? PupRequired1 { get; set; } = null;
        [YamlMember(Alias = "puprequired")]
        public bool? PupRequired2 { get; set; } = null;
        [YamlMember(Alias = "PupRequired")]
        public bool? PupRequired3 { get; set; } = null;

        // PupVersion - flexible casing
        public string PupVersion { get => PupVersion1 ?? PupVersion2 ?? PupVersion3 ?? string.Empty; }
        [YamlMember(Alias = "pupVersion")]
        public string? PupVersion1 { get; set; } = null;
        [YamlMember(Alias = "pupversion")]
        public string? PupVersion2 { get; set; } = null;
        [YamlMember(Alias = "PupVersion")]
        public string? PupVersion3 { get; set; } = null;

        // RomBundled - flexible casing
        public bool RomBundled { get => RomBundled1 ?? RomBundled2 ?? RomBundled3 ?? false; }
        [YamlMember(Alias = "romBundled")]
        public bool? RomBundled1 { get; set; } = null;
        [YamlMember(Alias = "rombundled")]
        public bool? RomBundled2 { get; set; } = null;
        [YamlMember(Alias = "RomBundled")]
        public bool? RomBundled3 { get; set; } = null;

        // RomChecksum - flexible casing
        public string RomChecksum { get => RomChecksum1 ?? RomChecksum2 ?? RomChecksum3 ?? string.Empty; }
        [YamlMember(Alias = "romChecksum")]
        public string? RomChecksum1 { get; set; } = null;
        [YamlMember(Alias = "romchecksum")]
        public string? RomChecksum2 { get; set; } = null;
        [YamlMember(Alias = "RomChecksum")]
        public string? RomChecksum3 { get; set; } = null;

        // RomNotes - flexible casing
        public string RomNotes { get => RomNotes1 ?? RomNotes2 ?? RomNotes3 ?? string.Empty; }
        [YamlMember(Alias = "romNotes")]
        public string? RomNotes1 { get; set; } = null;
        [YamlMember(Alias = "romnotes")]
        public string? RomNotes2 { get; set; } = null;
        [YamlMember(Alias = "RomNotes")]
        public string? RomNotes3 { get; set; } = null;

        // RomUrlOverride - flexible casing
        public string RomUrlOverride { get => RomUrlOverride1 ?? RomUrlOverride2 ?? RomUrlOverride3 ?? string.Empty; }
        [YamlMember(Alias = "romUrlOverride")]
        public string? RomUrlOverride1 { get; set; } = null;
        [YamlMember(Alias = "romurloverride")]
        public string? RomUrlOverride2 { get; set; } = null;
        [YamlMember(Alias = "RomUrlOverride")]
        public string? RomUrlOverride3 { get; set; } = null;

        // RomVersionOverride - flexible casing
        public string RomVersionOverride { get => RomVersionOverride1 ?? RomVersionOverride2 ?? RomVersionOverride3 ?? string.Empty; }
        [YamlMember(Alias = "romVersionOverride")]
        public string? RomVersionOverride1 { get; set; } = null;
        [YamlMember(Alias = "romversionoverride")]
        public string? RomVersionOverride2 { get; set; } = null;
        [YamlMember(Alias = "RomVersionOverride")]
        public string? RomVersionOverride3 { get; set; } = null;

        // RomVPSId - flexible casing
        public string RomVPSId { get => RomVPSId1 ?? RomVPSId2 ?? RomVPSId3 ?? string.Empty; }
        [YamlMember(Alias = "romVPSId")]
        public string? RomVPSId1 { get; set; } = null;
        [YamlMember(Alias = "romvpsid")]
        public string? RomVPSId2 { get; set; } = null;
        [YamlMember(Alias = "RomVPSId")]
        public string? RomVPSId3 { get; set; } = null;

        // TableNameOverride - flexible casing
        public string TableNameOverride { get => TableNameOverride1 ?? TableNameOverride2 ?? TableNameOverride3 ?? string.Empty; }
        [YamlMember(Alias = "tableNameOverride")]
        public string? TableNameOverride1 { get; set; } = null;
        [YamlMember(Alias = "tablenameoverride")]
        public string? TableNameOverride2 { get; set; } = null;
        [YamlMember(Alias = "TableNameOverride")]
        public string? TableNameOverride3 { get; set; } = null;

        // TableNotes - flexible casing
        public string TableNotes { get => TableNotes1 ?? TableNotes2 ?? TableNotes3 ?? string.Empty; }
        [YamlMember(Alias = "tableNotes")]
        public string? TableNotes1 { get; set; } = null;
        [YamlMember(Alias = "tablenotes")]
        public string? TableNotes2 { get; set; } = null;
        [YamlMember(Alias = "TableNotes")]
        public string? TableNotes3 { get; set; } = null;

        // TableVPSId - flexible casing
        public string TableVPSId { get => TableVPSId1 ?? TableVPSId2 ?? TableVPSId3 ?? string.Empty; }
        [YamlMember(Alias = "tableVPSId")]
        public string? TableVPSId1 { get; set; } = null;
        [YamlMember(Alias = "tablevpsid")]
        public string? TableVPSId2 { get; set; } = null;
        [YamlMember(Alias = "TableVPSId")]
        public string? TableVPSId3 { get; set; } = null;

        [YamlMember(Alias = "tagline")]
        public string Tagline { get; set; } = string.Empty;

        [YamlMember(Alias = "testers")]
        public List<string> Testers { get; set; } = new();

        // VpxChecksum - flexible casing 
        public string VpxChecksum { get => VpxChecksum1 ?? VpxChecksum2 ?? VpxChecksum3 ?? string.Empty; }
        [YamlMember(Alias = "vpxChecksum")]
        public string? VpxChecksum1 { get; set; } = null;
        [YamlMember(Alias = "vpxchecksum")]
        public string? VpxChecksum2 { get; set; } = null;
        [YamlMember(Alias = "VpxChecksum")]
        public string? VpxChecksum3 { get; set; } = null;

        // VpxVPSId - flexible casing
        public string VpxVPSId { get => VpxVPSId1 ?? VpxVPSId2 ?? VpxVPSId3 ?? string.Empty; }
        [YamlMember(Alias = "vpxVPSId")]
        public string? VpxVPSId1 { get; set; } = null;
        [YamlMember(Alias = "vpxvpsid")]
        public string? VpxVPSId2 { get; set; } = null;
        [YamlMember(Alias = "VpxVPSId")]
        public string? VpxVPSId3 { get; set; } = null;

        // VpxNotes - flexible casing
        public string VpxNotes { get => VpxNotes1 ?? VpxNotes2 ?? VpxNotes3 ?? string.Empty; }
        [YamlMember(Alias = "vpxNotes")]
        public string? VpxNotes1 { get; set; } = null;
        [YamlMember(Alias = "vpxnotes")]
        public string? VpxNotes2 { get; set; } = null;
        [YamlMember(Alias = "VpxNotes")]
        public string? VpxNotes3 { get; set; } = null;
    }
}