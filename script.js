const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];
let theme = localStorage.getItem('theme') || 'light';
document.body.classList.add(theme);
const themeBtn = document.querySelector('#theme-btn');

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (character.name.toLowerCase().includes(searchString) || character.house.toLowerCase().includes(searchString));
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

themeBtn.addEventListener('click', () => {
    document.body.classList.remove(theme);
    if (theme === 'dark') {
        theme = 'light';
    } else {
        theme = 'dark';
    }
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
})

loadCharacters();