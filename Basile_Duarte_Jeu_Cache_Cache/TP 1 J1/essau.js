const grid = document.getElementById('grid');

// Tableau d'images
const images = [
    '../images/impostor.png',  // L'image de l'imposteur
    '../images/impostor2.png', // Autres images
    '../images/impostor3.png'
];

// Créer une grille 8x8 (64 cellules)
const cells = [];
const numCells = 64;

// Tableau pour suivre où placer les images de manière aléatoire
let randomIndices = [];

// Générer 64 indices de manière aléatoire sans répétition pour les images
while (randomIndices.length < numCells) {
    const randomIndex = Math.floor(Math.random() * numCells);
    if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
    }
}

// Créer les cellules et ajouter l'image appropriée à chaque cellule
for (let i = 0; i < numCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = i + 1; // Mettre un numéro dans la cellule au départ

    // L'index aléatoire pour cette cellule
    const imageIndex = randomIndices[i];

    // Lorsque l'on clique sur la cellule
    cell.addEventListener('click', () => {
        cell.innerHTML = '';  
        const img = document.createElement('img');
        img.style.width ='40px'
        img.style.heigth = '40px'

        // Si c'est l'imposteur, afficher l'image impostor.png
        if (imageIndex === 0) {  // Le premier index sera l'imposteur
            img.src = images[0];  // Utiliser l'image de l'imposteur
            cell.appendChild(img);  // Ajouter l'image à la cellule
        } else {
            // Sinon, afficher une autre image aléatoire
            img.src = images[imageIndex % images.length];  // Utiliser une image différente
            cell.appendChild(img);
        }
    });

    grid.appendChild(cell); 
}
