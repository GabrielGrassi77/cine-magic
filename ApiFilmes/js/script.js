document.getElementById('btn1').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    const apiKey = '35fcd8c9b79c6c9748d37c7b1e31e201'; 
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('results');
            results.innerHTML = ''; 

            if (data.results.length === 0) {
                results.innerHTML = '<p class="no-resultados">Nenhum filme foi encontrado.</p>';
            } else {
                data.results.forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie');

                    movieElement.innerHTML = `
                        <h2>${movie.title}</h2>
                        <p>${movie.overview}</p>
                        <p class="release-date">Data de Lançamento: ${movie.release_date}</p>
                        <p class="original-language">Idioma original: ${movie.original_language}</p>
                        <p class="vote_average">Avaliação: ${movie.vote_average}</p>
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                        
                    `;

                    results.appendChild(movieElement);
                });
            }
        })
        .catch(error => {
            console.error('Erro ao buscar filmes:', error);
            const results = document.getElementById('results');
            results.innerHTML = '<p>Ocorreu um erro ao buscar filmes. Tente novamente.</p>';
        });
});