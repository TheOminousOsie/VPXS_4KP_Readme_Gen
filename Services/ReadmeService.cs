using ReadmeGenerator.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Documents;
using System.Windows.Media;
using YamlDotNet.Serialization;
using System.Text.RegularExpressions;
using YamlDotNet.Serialization.NamingConventions;

namespace ReadmeGenerator.Services
{
    public class ReadmeService
    {
        private readonly IDeserializer _deserializer;

        public ReadmeService()
        {
            // Create deserializer with camelCase naming convention to match your YAML
            _deserializer = new DeserializerBuilder()
                .WithNamingConvention(NullNamingConvention.Instance)
                .Build();
        }

        public async Task<(bool succ, string message)> GenerateWizardReadme(string ymlPath, string vpsUrl, bool includePreview)
        {
            var succeed = false;
            var message = string.Empty;

            var yamlContent = File.ReadAllText(ymlPath);
            var config = _deserializer.Deserialize<WizardYml>(yamlContent);

            using var httpClient = new HttpClient();
            var service = new VpsTableService(httpClient, vpsUrl);
            var getTable = service.GetTable(config.TableVPSId);

            if (getTable == null)
            {
                succeed = false;
                message = $"Table with VPS ID {config.TableVPSId} not found in VPSDB.";
                return (succeed, message);
            }
            var table = getTable.Value;

            table.TryGetProperty("name", out var nameEl);
            table.TryGetProperty("manufacturer", out var manufacturer);
            table.TryGetProperty("year", out var year);

            var name = !string.IsNullOrWhiteSpace(config.TableNameOverride) ? config.TableNameOverride : ConvertTitle(nameEl.GetString());

            var title = $"{name} ({manufacturer} {year})";

            string assemblyLocation = System.Reflection.Assembly.GetExecutingAssembly().Location;
            string assemblyDirectory = Path.GetDirectoryName(assemblyLocation);
            string readmeTemplate = Path.Combine(assemblyDirectory, "Content/wiz_README.md");

            string directoryName = Path.GetFileName(Path.GetDirectoryName(ymlPath));

            var newReadme = File.ReadAllText(readmeTemplate);

            newReadme = newReadme.Replace("{name}", name.ToString());
            newReadme = newReadme.Replace("{manufacturer}", manufacturer.ToString());
            newReadme = newReadme.Replace("{year}", year.ToString());
            newReadme = newReadme.Replace("{hasBackglass}", !string.IsNullOrWhiteSpace(config.BackglassChecksum) ? ":white_check_mark:" : ":x:");
            newReadme = newReadme.Replace("{hasDMD}", !string.IsNullOrWhiteSpace(config.RomChecksum) ? ":white_check_mark:" : ":x:");
            newReadme = newReadme.Replace("{hasROM}", !string.IsNullOrWhiteSpace(config.RomChecksum) ? ":white_check_mark:" : ":x:");
            newReadme = newReadme.Replace("{hasPup}", !string.IsNullOrWhiteSpace(config.PupChecksum) ? ":white_check_mark:" : ":x:");
            newReadme = newReadme.Replace("{fps}", config.Fps.ToString());
            newReadme = newReadme.Replace("{testers}", string.Join(Environment.NewLine, config.Testers.Select(x => $"  - {(x == "OminousOsie" ? "Ominous Osie 🌸" : x)}")));
            newReadme = newReadme.Replace("{tagline}", config.Tagline);

            var inImagesFolder = false;
            var previewImageUrl = "";
            if (includePreview)
            {
                table.TryGetProperty("tableFiles", out var tableFiles);
                var vpxFiles = tableFiles.EnumerateArray().ToArray();
                JsonElement? vpxFile = null;
                foreach (var vpx in vpxFiles)
                {
                    if (vpx.TryGetProperty("id", out var idProperty) &&
                        idProperty.GetString() == config.VpxVPSId)
                    {
                        vpxFile = vpx;
                        break;
                    }
                }

                JsonElement imgUrl = new();
                if (vpxFile != null)
                {
                    vpxFile.Value.TryGetProperty("imgUrl", out imgUrl);
                }

                previewImageUrl = imgUrl.GetString() ?? string.Empty;

                newReadme = newReadme.Replace("{previewImageName}", $"{directoryName}-preview{(string.IsNullOrWhiteSpace(previewImageUrl) ? ".webp" : Path.GetExtension(previewImageUrl))}");

                var previewOutput = Path.Combine(Path.GetDirectoryName(ymlPath), $"{directoryName}-preview{(string.IsNullOrWhiteSpace(previewImageUrl) ? ".webp" : Path.GetExtension(previewImageUrl))}");
                if (previewOutput.Contains("\\external\\"))
                {
                    var imagesFolder = previewOutput.Replace($"\\external\\{directoryName}\\", "\\images\\");
                    if (Directory.Exists(Path.GetDirectoryName(imagesFolder)))
                    {
                        previewOutput = imagesFolder;
                        inImagesFolder = true;
                    }
                }

                using (HttpClient client = new HttpClient())
                {
                    byte[] imageBytes = await client.GetByteArrayAsync(previewImageUrl);
                    await File.WriteAllBytesAsync(previewOutput, imageBytes);
                }
            }

            var output = Path.Combine(Path.GetDirectoryName(ymlPath), "README.md");

            File.WriteAllText(output, newReadme);

            succeed = true;
            message = $"Wizard README Created for '{name}' and placed in the same folder as the yml.";

            if (includePreview)
            {
                message += $"{Environment.NewLine}Preview image '{($"{directoryName}-preview{(string.IsNullOrWhiteSpace(previewImageUrl) ? ".webp" : Path.GetExtension(previewImageUrl))}")}' created, and placed in ";
                if (inImagesFolder)
                {
                    message += "/images folder.";
                }
                else
                {
                    message += "the same folder as the yml.";
                }
            }
            else
            {
                message += $"{Environment.NewLine}Preview image not created, don't forget to edit the image url manually yourself!";
            }

            return (succeed, message);
        }


        public async Task<(bool succ, string message)> GenerateManualReadme(string ymlPath, string vpsUrl, bool includePreview)
        {
            var succeed = false;
            var message = string.Empty;

            var yamlContent = File.ReadAllText(ymlPath);
            var config = _deserializer.Deserialize<WizardYml>(yamlContent);

            using var httpClient = new HttpClient();
            var service = new VpsTableService(httpClient, vpsUrl);
            var getTable = service.GetTable(config.TableVPSId);

            if (getTable == null)
            {
                succeed = false;
                message = $"Table with VPS ID {config.TableVPSId} not found in VPSDB.";
                return (succeed, message);
            }
            var table = getTable.Value;

            table.TryGetProperty("name", out var nameEl);
            table.TryGetProperty("manufacturer", out var manufacturer);
            table.TryGetProperty("year", out var year);

            var name = !string.IsNullOrWhiteSpace(config.TableNameOverride) ? config.TableNameOverride : ConvertTitle(nameEl.GetString());

            var title = $"{name} ({manufacturer} {year})";

            string assemblyLocation = System.Reflection.Assembly.GetExecutingAssembly().Location;
            string assemblyDirectory = Path.GetDirectoryName(assemblyLocation);
            string readmeTemplate = Path.Combine(assemblyDirectory, "Content/man_README.md");

            string directoryName = Path.GetFileName(Path.GetDirectoryName(ymlPath));

            var newReadme = File.ReadAllText(readmeTemplate);

            newReadme = newReadme.Replace("{name}", name.ToString());
            newReadme = newReadme.Replace("{manufacturer}", manufacturer.ToString());
            newReadme = newReadme.Replace("{year}", year.ToString());
            newReadme = newReadme.Replace("{hasBackglass}", !string.IsNullOrWhiteSpace(config.BackglassChecksum) ? ":white_check_mark:" : ":x:");
            newReadme = newReadme.Replace("{hasDMD}", !string.IsNullOrWhiteSpace(config.RomChecksum) ? ":white_check_mark:" : ":x:");
            newReadme = newReadme.Replace("{hasROM}", !string.IsNullOrWhiteSpace(config.RomChecksum) ? ":white_check_mark:" : ":x:");
            newReadme = newReadme.Replace("{hasPup}", !string.IsNullOrWhiteSpace(config.PupChecksum) ? ":white_check_mark:" : ":x:");
            newReadme = newReadme.Replace("{fps}", config.Fps.ToString());
            newReadme = newReadme.Replace("{testers}", string.Join(", ", config.Testers.Select(x => x == "OminousOsie" ? "Ominous Osie 🌸" : x)));
            newReadme = newReadme.Replace("{tagline}", config.Tagline);

            var tableLinksSucc = true;
            var b2sLinksSucc = true;
            var romLinksSucc = true;

            (newReadme, tableLinksSucc) = UpdateUrlFields(newReadme, table, config.VpxVPSId, "table");

            if (!string.IsNullOrWhiteSpace(config.BackglassChecksum) && !config.BackglassBundled)
            {
                (newReadme, b2sLinksSucc) = UpdateUrlFields(newReadme, table, config.BackglassVPSId, "b2s", config.BackglassUrlOverride, config.BackglassAuthorsOverride);
            }
            else if (config.BackglassBundled)
            {
                (newReadme, b2sLinksSucc) = UpdateUrlFields(newReadme, table, config.VpxVPSId, "b2s");
            }
            else
            {
                newReadme = newReadme.Replace("{b2sWebsite}", "N/A");
                newReadme = newReadme.Replace("{b2sLink}", "N/A");
                newReadme = newReadme.Replace("{b2sVersion}", "N/A");
                newReadme = newReadme.Replace("{b2sAuthor}", "N/A");
            }

            if (!string.IsNullOrWhiteSpace(config.RomChecksum) && !config.RomBundled)
            {
                (newReadme, romLinksSucc) = UpdateUrlFields(newReadme, table, config.RomVPSId, "rom", config.RomUrlOverride);
            }
            else if (config.RomBundled)
            {
                (newReadme, b2sLinksSucc) = UpdateUrlFields(newReadme, table, config.VpxVPSId, "rom");
            }
            else
            {
                newReadme = newReadme.Replace("{romWebsite}", "N/A");
                newReadme = newReadme.Replace("{romLink}", "N/A");
                newReadme = newReadme.Replace("{romVersion}", "N/A");
                newReadme = newReadme.Replace("{romAuthor}", "N/A");
            }

            if (!string.IsNullOrWhiteSpace(config.PupChecksum))
            {
                newReadme = newReadme.Replace("{pupPackLink}", config.PupFileUrl);
                Uri uri = new Uri(config.PupFileUrl);
                string host = uri.Host;
                string[] parts = host.Split('.');

                string domainName;
                if (parts.Length >= 2 && parts[0] == "www")
                {
                    domainName = parts[1]; // Take second part if first is "www"
                }
                else
                {
                    domainName = parts[0]; // Take first part otherwise
                }
                newReadme = newReadme.Replace("{pupPackWebsite}", domainName);
                newReadme = newReadme.Replace("{pupPackVersion}", config.PupVersion);
                newReadme = newReadme.Replace("{pupPackAuthor}", "N/A");
            }
            else
            {
                newReadme = newReadme.Replace("{pupPackWebsite}", "N/A");
                newReadme = newReadme.Replace("{pupPackLink}", "N/A");
                newReadme = newReadme.Replace("{pupPackVersion}", "N/A");
                newReadme = newReadme.Replace("{pupPackAuthor}", "N/A");
            }


            table.TryGetProperty("tableFiles", out var tableFiles);
            var vpxFiles = tableFiles.EnumerateArray().ToArray();
            JsonElement? vpxFile = null;
            foreach (var vpx in vpxFiles)
            {
                if (vpx.TryGetProperty("id", out var idProperty) &&
                    idProperty.GetString() == config.VpxVPSId)
                {
                    vpxFile = vpx;
                    break;
                }
            }

            var inImagesFolder = false;
            var previewImageUrl = "";
            if (includePreview)
            {
               

                JsonElement imgUrl = new();
                if (vpxFile != null)
                {
                    vpxFile.Value.TryGetProperty("imgUrl", out imgUrl);
                }

                previewImageUrl = imgUrl.GetString() ?? string.Empty;

                newReadme = newReadme.Replace("{previewImageName}", $"{directoryName}-preview{(string.IsNullOrWhiteSpace(previewImageUrl) ? ".webp" : Path.GetExtension(previewImageUrl))}");

                var previewOutput = Path.Combine(Path.GetDirectoryName(ymlPath), $"{directoryName}-preview{(string.IsNullOrWhiteSpace(previewImageUrl) ? ".webp" : Path.GetExtension(previewImageUrl))}");
                if (previewOutput.Contains("\\external\\"))
                {
                    var imagesFolder = previewOutput.Replace($"\\external\\{directoryName}\\", "\\images\\");
                    if (Directory.Exists(Path.GetDirectoryName(imagesFolder)))
                    {
                        previewOutput = imagesFolder;
                        inImagesFolder = true;
                    }
                }

                using (HttpClient client = new HttpClient())
                {
                    byte[] imageBytes = await client.GetByteArrayAsync(previewImageUrl);
                    await File.WriteAllBytesAsync(previewOutput, imageBytes);
                }
            }

            var output = Path.Combine(Path.GetDirectoryName(ymlPath), "README.md");

            File.WriteAllText(output, newReadme);

            succeed = true;
            message = $"Manual README Created for '{name}' and placed in the same folder as the yml.";

            if (includePreview)
            {
                message += $"{Environment.NewLine}Preview image '{($"{directoryName}-preview{(string.IsNullOrWhiteSpace(previewImageUrl) ? ".webp" : Path.GetExtension(previewImageUrl))}")}' created, and placed in ";
                if (inImagesFolder)
                {
                    message += "/images folder.";
                }
                else
                {
                    message += "the same folder as the yml.";
                }
            }
            else
            {
                message += $"{Environment.NewLine}Preview image not created, don't forget to edit the image url manually yourself!";
            }


            return (succeed, message);
        }

        public static string ConvertTitle(string title)
        {
            var matchThe = Regex.Match(title, @"^(JP'?s\s*)?(The)\s+(.+)$");
            var matchJps = Regex.Match(title, @"^(JP'?s)\s+(.+)$");

            if (matchThe.Success && matchThe.Groups[2].Success)
            {
                string prefix = matchThe.Groups[1].Success ? matchThe.Groups[1].Value : "";
                return $"{matchThe.Groups[3].Value}, {prefix}{matchThe.Groups[2].Value}";
            }
            else if (matchJps.Success)
            {
                return $"{matchJps.Groups[2].Value}, {matchJps.Groups[1].Value}";
            }
            else
            {
                return title;
            }
        }

        private static (string readme, bool success) UpdateUrlFields(string newReadme, JsonElement table, string vpsId, string tokenPrefix, string? urlOverride = null, List<string>? authors = null)
        {
            if (!string.IsNullOrWhiteSpace(urlOverride))
            {
                newReadme = newReadme.Replace($"{{{tokenPrefix}Link}}", urlOverride);
                Uri uri = new Uri(urlOverride);
                string host = uri.Host;
                string[] parts = host.Split('.');

                string domainName;
                if (parts.Length >= 2 && parts[0] == "www")
                {
                    domainName = parts[1]; // Take second part if first is "www"
                }
                else
                {
                    domainName = parts[0]; // Take first part otherwise
                }
                newReadme = newReadme.Replace($"{{{tokenPrefix}Website}}", domainName);

                newReadme = newReadme.Replace($"{{{tokenPrefix}Version}}", "N/A");
                newReadme = newReadme.Replace($"{{{tokenPrefix}Author}}", "N/A");

                return (newReadme, true);
            }
            else
            {
                JsonElement? file = null;
                foreach (var token in new[] { "table", "b2s", "rom", "pupPack" })
                {
                    if (file != null)
                        break;

                    var fileArray = new JsonElement();
                    if (table.TryGetProperty($"{token}Files", out fileArray))
                    {
                        var files = fileArray.EnumerateArray().ToArray();
                        foreach (var fle in files)
                        {
                            if (fle.TryGetProperty("id", out var idProperty) &&
                                idProperty.GetString() == vpsId)
                            {
                                file = fle;
                                break;
                            }
                        }
                    }
                }

                if (file == null)
                {
                    return (newReadme, false);
                }

                file.Value.TryGetProperty("urls", out var fileUrlElement);
                var fileUrls = fileUrlElement.EnumerateArray().ToArray();
                foreach (var fileUrl in fileUrls)
                {
                    if (fileUrl.TryGetProperty("broken", out var isBroken))
                    {
                        if (isBroken.GetBoolean() == false)
                        {
                            if (fileUrl.TryGetProperty("url", out var urlProp))
                            {
                                newReadme = newReadme.Replace($"{{{tokenPrefix}Link}}", urlProp.ToString());
                                Uri uri = new Uri(urlProp.ToString());
                                string host = uri.Host;
                                string[] parts = host.Split('.');

                                string domainName;
                                if (parts.Length >= 2 && parts[0] == "www")
                                {
                                    domainName = parts[1]; // Take second part if first is "www"
                                }
                                else
                                {
                                    domainName = parts[0]; // Take first part otherwise
                                }
                                newReadme = newReadme.Replace($"{{{tokenPrefix}Website}}", domainName);
                                break;
                            }
                        }
                    }
                    else
                    {
                        if (fileUrl.TryGetProperty("url", out var urlProp))
                        {
                            newReadme = newReadme.Replace($"{{{tokenPrefix}Link}}", urlProp.ToString());
                            Uri uri = new Uri(urlProp.ToString());
                            string host = uri.Host;
                            string[] parts = host.Split('.');

                            string domainName;
                            if (parts.Length >= 2 && parts[0] == "www")
                            {
                                domainName = parts[1]; // Take second part if first is "www"
                            }
                            else
                            {
                                domainName = parts[0]; // Take first part otherwise
                            }
                            newReadme = newReadme.Replace($"{{{tokenPrefix}Website}}", domainName);
                            break;
                        }
                    }
                }

                if (authors != null)
                {
                    newReadme = newReadme.Replace($"{{{tokenPrefix}Author}}", string.Join(", ", authors));
                }
                else
                {
                    file.Value.TryGetProperty("authors", out var authorsElementArray);
                    if (authorsElementArray.ValueKind == JsonValueKind.Undefined)
                    {
                        newReadme = newReadme.Replace($"{{{tokenPrefix}Author}}", "N/A");
                    }
                    else
                    {
                        var authorsList = authorsElementArray.EnumerateArray().ToArray().Select(x => x.GetString());
                        newReadme = newReadme.Replace($"{{{tokenPrefix}Author}}", string.Join(", ", authorsList));
                    }
                }



                file.Value.TryGetProperty("version", out var version);

                newReadme = newReadme.Replace($"{{{tokenPrefix}Version}}", version.GetString());

                return (newReadme, true);
            }
        }
    }
}
