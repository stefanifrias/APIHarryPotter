document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const characterList = document.getElementById("characterList");

    async function fetchCharacters() {
        try {
            const response = await fetch("https://hp-api.onrender.com/api/characters");
            const characters = await response.json();
            displayCharacters(characters);

            searchBar.addEventListener("input", () => {
                const searchText = searchBar.value.toLowerCase();
                const filteredCharacters = characters.filter(character =>
                    character.name.toLowerCase().includes(searchText)
                );
                displayCharacters(filteredCharacters);
            });
        } catch (error) {
            console.error("Erro ao buscar personagens", error);
        }
    }

    function displayCharacters(characters) {
        characterList.innerHTML = "";
        characters.forEach(character => {
            const characterCard = document.createElement("div");
            characterCard.classList.add("card");
            characterCard.innerHTML = `
                <img src="${character.image || 'https://via.placeholder.com/100'}" alt="${character.name}">
                <h3>${character.name}</h3>
                <p><strong>Casa:</strong> ${character.house || 'Desconhecida'}</p>
                <p><strong>Ator:</strong> ${character.actor || 'Desconhecido'}</p>
                <p><strong>Ancestralidade:</strong> ${character.ancestry || 'Desconhecida'}</p>
                <p><strong>Espécie:</strong> ${character.species || 'Desconhecida'}</p>
                <p><strong>Varinha:</strong> ${character.wand.wood || 'Desconhecida'} - ${character.wand.core || 'Desconhecida'} - ${character.wand.length || 'Desconhecida'} polegadas</p>
                <p><strong>Patrono:</strong> ${character.patronus || 'Desconhecido'}</p>
                <p><strong>Data de nascimento:</strong> ${character.dateOfBirth || 'Desconhecida'}</p>
            `;
            characterList.appendChild(characterCard);
        });
    }

    fetchCharacters();
});
