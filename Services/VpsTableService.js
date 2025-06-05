class VpsTableService {
    constructor(url) {
        this.url = url;
        this.tables = null;
    }

    async fetchTables() {
        console.log(`Fetching VPSDB from ${this.url}`);

        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // If the root is directly an array of tables
            if (Array.isArray(data)) {
                return data;
            }

            // If tables are in a property
            if (data.tables && Array.isArray(data.tables)) {
                return data.tables;
            }

            console.log("No tables array found in JSON response");
            return [];
        } catch (error) {
            console.error("Error fetching tables:", error);
            return [];
        }
    }

    async getTable(id) {
        if (!this.tables) {
            this.tables = await this.fetchTables();
        }

        return this.tables.find(table => table.id === id) || null;
    }
}

export default VpsTableService; 