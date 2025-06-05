using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ReadmeGenerator
{
    public class VpsTableService
    {
        private readonly HttpClient _httpClient;
        private readonly string _url;
        private JsonElement[]? _tables;

        public VpsTableService(HttpClient httpClient, string url)
        {
            _httpClient = httpClient;
            _url = url;
        }

        // Property equivalent to self.tables = self._fetch_tables()
        public JsonElement[] Tables => _tables ??= FetchTables();

        private JsonElement[] FetchTables()
        {
            Console.WriteLine($"Fetching VPSDB from {_url}");

            try
            {
                using var httpClient = new HttpClient();
                var response = httpClient.GetAsync(_url).Result;
                response.EnsureSuccessStatusCode(); // Equivalent to raise_for_status()

                var jsonString = response.Content.ReadAsStringAsync().Result;
                var vps = JsonDocument.Parse(jsonString);

                // If the root is directly an array of tables
                if (vps.RootElement.ValueKind == JsonValueKind.Array)
                {
                    return vps.RootElement.EnumerateArray().ToArray();
                }

                Console.WriteLine("No tables array found in JSON response");
                return Array.Empty<JsonElement>();
            }
            catch (HttpRequestException httpEx)
            {
                Console.WriteLine($"HTTP error occurred: {httpEx.Message}");
            }
            catch (TaskCanceledException timeoutEx)
            {
                Console.WriteLine($"Request timeout occurred: {timeoutEx.Message}");
            }
            catch (JsonException jsonEx)
            {
                Console.WriteLine($"JSON decode error: {jsonEx.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Request error occurred: {ex.Message}");
            }

            return Array.Empty<JsonElement>();
        }

        // Async version (recommended)
        public async Task<JsonElement[]> FetchTablesAsync()
        {
            Console.WriteLine($"Fetching VPSDB from {_url}");

            try
            {
                var response = await _httpClient.GetAsync(_url);
                response.EnsureSuccessStatusCode(); // Equivalent to raise_for_status()

                var jsonString = await response.Content.ReadAsStringAsync();
                var vps = JsonDocument.Parse(jsonString);

                // Assuming the JSON structure has a tables array
                // Adjust the property name based on your actual JSON structure
                if (vps.RootElement.TryGetProperty("tables", out var tablesElement) &&
                    tablesElement.ValueKind == JsonValueKind.Array)
                {
                    return tablesElement.EnumerateArray().ToArray();
                }

                // If the root is directly an array of tables
                if (vps.RootElement.ValueKind == JsonValueKind.Array)
                {
                    return vps.RootElement.EnumerateArray().ToArray();
                }

                Console.WriteLine("No tables array found in JSON response");
                return Array.Empty<JsonElement>();
            }
            catch (HttpRequestException httpEx)
            {
                Console.WriteLine($"HTTP error occurred: {httpEx.Message}");
            }
            catch (TaskCanceledException timeoutEx)
            {
                Console.WriteLine($"Request timeout occurred: {timeoutEx.Message}");
            }
            catch (JsonException jsonEx)
            {
                Console.WriteLine($"JSON decode error: {jsonEx.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Request error occurred: {ex.Message}");
            }

            return Array.Empty<JsonElement>();
        }

        // Equivalent to get_table(self, id)
        public JsonElement? GetTable(string id)
        {
            foreach (var table in Tables)
            {
                if (table.TryGetProperty("id", out var idProperty) &&
                    idProperty.GetString() == id)
                {
                    return table;
                }
            }
            return null;
        }

        // LINQ version of GetTable (more C#-idiomatic)
        public JsonElement? GetTableLinq(string id)
        {
            return Tables.FirstOrDefault(table =>
                table.TryGetProperty("id", out var idProperty) &&
                idProperty.GetString() == id);
        }
    }
}