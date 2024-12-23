function by_country_or_region() {
    const stat = document.getElementById('stats').value;
    const additionalSelectContainer = document.getElementById('additional-select-container');
    additionalSelectContainer.innerHTML = ""; // נקה את הבחירה הקודמת

    const label = document.createElement('p');
    label.textContent = "Filter by:";
    label.className = "filter-label";

    if (["get_groups_with_common_goal_by_location","get_both_groups_in_event_by_location","get_shared_attack_type_in_groups_by_location"].includes(stat)) {
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

    // נקה הודעות שגיאה או טעינה
    errorElement.textContent = "";
    loadingIndicator.style.display = "none";

    // בדוק אם סטטיסטיקה נבחרה
    if (!stat) {
        errorElement.textContent = "Please select a statistic.";
        return;
    }

    // קבל את הפילטר שנבחר
    const selectedFilterText = selectedFilterElement.textContent;
    const filter = selectedFilterText.replace("Selected filter: ", "").trim();

    if (!filter) {
        errorElement.textContent = "Please select a filter.";
        return;
    }

    // צור את נתוני הבקשה
    const requestData = {
        statistic: stat,
        filter: filter,
    };

    // הצג הודעת טעינה
    loadingIndicator.style.display = "block";

    try {
        // שלח את הבקשה לשרת
        const response = await fetch('http://127.0.0.1:5000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        // בדוק אם הבקשה הצליחה
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        // עבד את התשובה
        const responseData = await response.json();
        console.log('Server response:', responseData);

        // עבד את המידע שהתקבל (למשל, הצגת מפה)
        processServerResponse(responseData);

    } catch (error) {
        // הצג הודעת שגיאה
        errorElement.textContent = `Error: ${error.message}`;
    } finally {
        // הסתר את הודעת הטעינה
        loadingIndicator.style.display = "none";
    }
}

// פונקציה לעיבוד המידע מהשרת
function processServerResponse(data) {
    // כאן ניתן לעבד את הנתונים שהתקבלו מהשרת (למשל, לטעון מפה או לעדכן גרפים)
    console.log("Processing server data:", data);
}
