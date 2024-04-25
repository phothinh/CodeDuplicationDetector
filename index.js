const fs = require('fs');
const path = require('path');
const fileReader = require('./src/fileReader');
const compareCode = require('./src/compareCode');

// Chemin vers le dossier contenant les fichiers à comparer
const inputDir = path.join(__dirname, 'input_files');

// Lis les fichiers à comparer
const file1Path = path.join(inputDir, 'file1.js');
const file2Path = path.join(inputDir, 'file2.js');

const file1Content = fileReader.readFile(file1Path);
const file2Content = fileReader.readFile(file2Path);

// Appele la fonction pour détecter les duplications
const duplications = compareCode.detectCodeDuplication(file1Content, file2Content);

// Affiche les résultats
console.log('Duplications détectées:');
console.log(duplications);

// Enregistre les résultats dans un fichier json dans le dossier output
fs.writeFileSync(path.join(__dirname, 'output', 'duplications.json'), JSON.stringify(duplications, null, 2));
