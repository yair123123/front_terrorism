function by_country_or_region() {
    const stat = document.getElementById('stats').value;
    const additionalSelectContainer = document.getElementById('additional-select-container');
    additionalSelectContainer.innerHTML = ""; // נקה את הבחירה הקודמת

    const label = document.createElement('p');
    label.textContent = "Filter by:";
    label.className = "filter-label";

    if (["get_groups_with_common_goal_by_location","get_unique_groups_by_location","get_shared_attack_type_in_groups_by_location"].includes(stat)) {
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
    } else if ( ["get_most_deadly","average_casualties"].includes(stat)) {
        const container = document.createElement('div');
        container.className = "filter-buttons";

        const top5Button = document.createElement('button');
        top5Button.textContent = "Top 5";
        top5Button.className = "filter-button";
        top5Button.onclick = () => selectFilter("top5");

        container.appendChild(top5Button);
        additionalSelectContainer.appendChild(label);
        additionalSelectContainer.appendChild(container);
    } else if (["get_history_events_by_year","get_shared_goals_in_groups_by_year"].includes(stat)) {
        const container = document.createElement('div');
        container.className = "filter-inputs";

        const yearInput = document.createElement('input');
        yearInput.type = "text";
        yearInput.placeholder = "Enter Year";
        yearInput.className = "filter-input";

        yearInput.onchange = () => selectFilter(yearInput.value);

        container.appendChild(yearInput);
        additionalSelectContainer.appendChild(label);
        additionalSelectContainer.appendChild(container);
    }
    else if (stat === "Search_in_text"){
        const container = document.createElement('div');
        container.className = "select";
        
        const selectQuery = document.createElement('select');
        const option1 = document.createElement('option');
        option1.text = "search from history csv";
        selectQuery.add(option1);
        const option2 = document.createElement('option');
        option2.text = "search from all data";
        selectQuery.add(option2);
        const option3 = document.createElement('option');
        option3.text = "search from news";
        selectQuery.add(option3);
        const option4 = document.createElement('option');
        option4.text = "search from all by dates";
        selectQuery.add(option4);
    
        selectQuery.onchange = () => selectFilter(selectQuery.value);
    
        container.appendChild(selectQuery);
        additionalSelectContainer.appendChild(label);
        additionalSelectContainer.appendChild(container);
    }
}

function selectFilter(type) {
    const selectedFilter = document.getElementById('selected-filter');
    selectedFilter.textContent = `Selected filter: ${type}`;
}
async function fetchData() {
    const stat = document.getElementById('stats').value;
    const additionalSelectContainer = document.getElementById('additional-select-container');
    const selectedFilterElement = document.getElementById('selected-filter');
    const loadingIndicator = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    errorElement.textContent = "";
    loadingIndicator.style.display = "none";

    if (!stat) {
        errorElement.textContent = "Please select a statistic.";
        return;
    }

    const selectedFilterText = selectedFilterElement.textContent;
    const filter = selectedFilterText.replace("Selected filter: ", "").trim();

    if (!filter) {
        errorElement.textContent = "Please select a filter.";
        return;
    }

    const requestData = {
        statistic: stat,
        filter: filter,
    };

    loadingIndicator.style.display = "block";

    try {
        const response = await fetch('http://127.0.0.1:5001', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const responseData = await response.text();
        console.log('Server response:', responseData);
        document.getElementById("map-container").innerHTML = responseData

    } catch (error) {
        errorElement.textContent = `Error: ${error.message}`;
    } finally {
        loadingIndicator.style.display = "none";
    }
}

function processServerResponse(data) {
    console.log("Processing server data:", data);
}
