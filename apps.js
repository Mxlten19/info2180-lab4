document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');

    // Exercise 2: Show all superheroes in alert when button is clicked
    searchButton.addEventListener('click', function() {
        fetchSuperheroesAlert();
    });

    function fetchSuperheroesAlert() {
        // Using XMLHttpRequest to fetch the superheroes.php
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'superheroes.php', true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Parse the HTML response to extract the list items
                const parser = new DOMParser();
                const doc = parser.parseFromString(xhr.responseText, 'text/html');
                const listItems = doc.querySelectorAll('li');
                
                let alertMessage = 'List of Superheroes:\n\n';
                
                listItems.forEach(item => {
                    alertMessage += `• ${item.textContent}\n`;
                });
                
                // Show the alert with the list
                alert(alertMessage);
            } else {
                alert('Error fetching superheroes. Status: ' + xhr.status);
            }
        };
        
        xhr.onerror = function() {
            alert('Error making request to server');
        };
        
        xhr.send();
    }
});