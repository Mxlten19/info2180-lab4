document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultDiv = document.getElementById('result');

    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm === '') {            
            fetchSuperheroesAlert();
        } else {
            searchSuperhero(searchTerm);
        }
    });

    function fetchSuperheroesAlert() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'superheroes.php', true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const superheroes = JSON.parse(xhr.responseText);
                    let alertMessage = 'List of Superheroes:\n\n';
                    
                    superheroes.forEach(hero => {
                        alertMessage += `• ${hero.alias}\n`;
                    });
                    
                    alert(alertMessage);
                    
                    displayAllSuperheroes(superheroes);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('Error loading superheroes');
                }
            } else {
                alert('Error fetching superheroes');
            }
        };
        
        xhr.onerror = function() {
            alert('Error making request');
        };
        
        xhr.send();
    }

    function searchSuperhero(query) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `superheroes.php?query=${encodeURIComponent(query)}`, true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    
                    if (response.error) {
                        displayError(response.error);
                    } else if (Array.isArray(response)) {
                        displayAllSuperheroes(response);
                    } else {
                        displaySingleSuperhero(response);
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    displayError('Error processing response');
                }
            } else {
                displayError('Error fetching superhero data');
            }
        };
        
        xhr.onerror = function() {
            displayError('Error making request');
        };
        
        xhr.send();
    }

    function displayAllSuperheroes(superheroes) {
        let html = '<ul class="hero-list">';
        
        superheroes.forEach(hero => {
            html += `<li>${hero.alias}</li>`;
        });
        
        html += '</ul>';
        resultDiv.innerHTML = html;
    }

    function displaySingleSuperhero(hero) {
        const html = `
            <div class="hero-detail">
                <h3>${hero.alias}</h3>
                <h4>A.K.A ${hero.name}</h4>
                <p>${hero.biography}</p>
            </div>
        `;
        resultDiv.innerHTML = html;
    }

    function displayError(message) {
        resultDiv.innerHTML = `<div class="error">${message}</div>`;
    }
});