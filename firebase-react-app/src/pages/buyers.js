document.addEventListener("DOMContentLoaded", function() {
    fetchAutoParts();
});

function fetchAutoParts() {
    // Using a mock API endpoint for the demonstration. Replace with your own endpoint.
    fetch('https://jsonplaceholder.typicode.com/posts')  // Replace with your own API that returns auto parts data
    .then(response => response.json())
    .then(data => {
        displayAutoParts(data);
    })
    .catch(error => {
        console.error('There was an error fetching the auto parts:', error);
    });
}

function displayAutoParts(parts) {
    const container = document.getElementById('partsContainer');

    parts.forEach(part => {
        const partDiv = document.createElement('div');
        partDiv.className = 'part';

        const headerDiv = document.createElement('div');
        headerDiv.className = 'part-header';

        const partName = document.createElement('span');
        partName.className = 'part-name';
        partName.textContent = part.title;  // 'title' is a placeholder. Replace with the actual field from your API.

        const partPrice = document.createElement('span');
        partPrice.className = 'part-price';
        partPrice.textContent = "$" + Math.floor(Math.random() * 100);  // Random price for demonstration. Replace with actual data.

        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'part-description';
        descriptionDiv.textContent = part.body;  // 'body' is a placeholder. Replace with the actual field from your API.

        const buyButton = document.createElement('button');
        buyButton.className = 'buy-button';
        buyButton.textContent = 'Buy Now';
        buyButton.onclick = function() {
            alert('Buying: ' + part.title);
        };

        headerDiv.appendChild(partName);
        headerDiv.appendChild(partPrice);
        partDiv.appendChild(headerDiv);
        partDiv.appendChild(descriptionDiv);
        partDiv.appendChild(buyButton);

        container.appendChild(partDiv);
    });
}
