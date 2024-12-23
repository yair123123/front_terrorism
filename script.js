async function fetchData() {
    const stat = document.getElementById('stats').value;
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const mapContainer = document.getElementById('map-container');

    errorDiv.textContent = ""; 
    mapContainer.innerHTML = ""; 
    if (!stat) {
        errorDiv.textContent = "Please select a statistic.";
        return;
    }

    loading.style.display = "block";
    try {
        const response = await fetch('http://localhost:5000/get-map', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ statistic: stat })
        });

        if (response.ok) {
            const data = await response.json();
            mapContainer.innerHTML = data.map; 
        } else {
            const errorData = await response.json();
            errorDiv.textContent = errorData.error || "Failed to load the map.";
        }
    } catch (error) {
        errorDiv.textContent = "An unexpected error occurred: " + error.message;
    } finally {
        loading.style.display = "none"; 
    }
}
function by_country_or_region() {
    const stat = document.getElementById('stats').value;
    const additionalSelectContainer = document.getElementById('additional-select-container');
    additionalSelectContainer.innerHTML = ""; // נקה את הבחירה הקודמת

    if (stat === "filter") {
        const label = document.createElement('p');
        label.textContent = "Filter by:";
        label.className = "filter-label";

        const container = document.createElement('div');
        container.className = "filter-buttons";

        const countryButton = document.createElement('button');
        countryButton.textContent = "Country";
        countryButton.className = "filter-button";
        countryButton.onclick = () => selectFilter("country");

        const regionButton = document.createElement('button');
        regionButton.textContent = "Region";
        regionButton.className = "filter-button";
        regionButton.onclick = () => selectFilter("region");

        container.appendChild(countryButton);
        container.appendChild(regionButton);
        additionalSelectContainer.appendChild(label);
        additionalSelectContainer.appendChild(container);
    }
}

function selectFilter(type) {
    const selectedFilter = document.getElementById('selected-filter');
    selectedFilter.textContent = `Selected filter: ${type}`;
}

