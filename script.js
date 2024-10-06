const API_URL = 'https://api.warframestat.us/pc/invasions/';
const SCAN_INTERVAL = 15 * 1000; // 15 seconds in milliseconds
const TARGET_ITEMS = ['Orokin Catalyst Blueprint', 'Orokin Reactor Blueprint'];

function scanInvasions() {
    console.log('Starting invasion scan...');

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log('Invasion data received:', data);

            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear previous results

            let foundItems = [];

            data.forEach(invasion => {
                if (!invasion.completed) {
                    const attackerReward = (invasion.attacker.reward && invasion.attacker.reward.countedItems) || [];
                    const defenderReward = (invasion.defender.reward && invasion.defender.reward.countedItems) || [];

                    attackerReward.forEach(item => {
                        if (TARGET_ITEMS.includes(item.type)) {
                            foundItems.push(`${item.type} found in ${invasion.node}`);
                            console.log(`${item.type} found in ${invasion.node}`);
                        }
                    });

                    defenderReward.forEach(item => {
                        if (TARGET_ITEMS.includes(item.type)) {
                            foundItems.push(`${item.type} found in ${invasion.node}`);
                            console.log(`${item.type} found in ${invasion.node}`);
                        }
                    });
                }
            });

            if (foundItems.length > 0) {
                resultsDiv.innerHTML = foundItems.join('<br>');
            } else {
                resultsDiv.innerHTML = 'No target items found in current invasions.';
            }
        })
        .catch(error => console.error('Error fetching invasions:', error));
}

// Initial scan
scanInvasions();

// Periodic scan
setInterval(scanInvasions, SCAN_INTERVAL);