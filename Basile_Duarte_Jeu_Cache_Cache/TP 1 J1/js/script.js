const grid = document.getElementById('grid');
const numCells = 64;
const impostorImage = '../images/impostor.png';
const persos = [
    '../images/perso1.png', 
    '../images/perso2.png',
    '../images/perso3.png',  
    '../images/perso4.png', 
    '../images/perso5.png',
    '../images/perso6.png',  
    '../images/perso7.png', 
    '../images/perso8.png'
];

// Musique
const music = document.getElementById('background-music');
const playlist = [
    '../Musique/Wait and Bleed [8 Bit Tribute to Slipknot] - 8 Bit Universe.mp3', 
    '../Musique/Slipknot - Disasterpieces(8bit).mp3', 
];

let currentTrack = 0;

// Charger et jouer la musique actuelle
function playTrack(index) {
    if (index < playlist.length) {
        music.src = playlist[index];
        music.load(); // Charge la musique avant de jouer
        music.play().catch((error) => {
            console.error('Erreur lors de la lecture de la musique:', error);
        });
    }
}

// Événement déclenché quand une musique se termine
music.addEventListener('ended', () => {
    currentTrack++;
    if (currentTrack < playlist.length) {
        playTrack(currentTrack);
    } else {
        currentTrack = 0;
        playTrack(currentTrack);
    }
});

// Initialiser avec la première musique
playTrack(currentTrack);

let clickCounter = document.getElementById('click');
let click = 0;
let maxClicks = 15;
let impostorFound = false;

// Messages de fin
const winMessage = document.getElementById('win');
const loseMessage = document.getElementById('over');

// Mélange les éléments d'un tableau 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Créer un tableau aléatoire d'images
function generateRandomImages() {
    const images = [impostorImage]; // Inclure l'imposteur
    // Ajouter les personnages plusieurs fois pour remplir la grille
    while (images.length < numCells) {
        images.push(...persos);
    }
    images.length = numCells; 
    return shuffleArray(images); // Mélanger les images
}

// Initialiser la grille
let randomImages = []; 

function createGrid() {
    grid.innerHTML = '';
    randomImages = generateRandomImages(); // Générer de nouvelles images

    for (let i = 0; i < numCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);

        cell.addEventListener('click', () => handleCellClick(cell, randomImages[i]));
    }
}

// Gérer le clic sur une cellule
function handleCellClick(cell, imageSrc) {
    if (click >= maxClicks || impostorFound) return;

    click++;
    clickCounter.textContent = click;

    cell.innerHTML = '';
    const img = document.createElement('img');
    img.style.width = '70px';
    img.style.height = '70px';

    img.src = imageSrc;
    cell.appendChild(img);

    if (imageSrc === impostorImage) {
        impostorFound = true;
        endGame(true);
    } else if (click === maxClicks && !impostorFound) {
        endGame(false);
    }
}

// Fin du jeu
function endGame(isWin) {
    if (isWin) {
        winMessage.classList.add('visible');
    } else {
        loseMessage.classList.add('visible');
        revealImpostor();
    }
}

// Révéler l'imposteur
function revealImpostor() {
    const cells = grid.children;
    for (let i = 0; i < numCells; i++) {
        const cell = cells[i];

        // Vérifiez si cette cellule contient l'imposteur
        if (randomImages[i] === impostorImage) {
            if (!cell.querySelector('img')) {
                const img = document.createElement('img');
                img.style.width = '70px';
                img.style.height = '70px';
                img.src = impostorImage;
                cell.appendChild(img);
            }
            cell.classList.add('highlight'); // Mettre en évidence l'imposteur
        }
    }
}

// Réinitialiser le jeu
function resetGame() {
    click = 0;
    clickCounter.textContent = click;
    impostorFound = false;
    winMessage.classList.remove('visible');
    loseMessage.classList.remove('visible');
    createGrid();
}

document.getElementById('restart-over').addEventListener('click', resetGame);
document.getElementById('restart-win').addEventListener('click', resetGame);

// Initialisation
createGrid();
