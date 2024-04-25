const fs = require('fs');

/**
 * Lit le contenu d'un fichier spécifié.
 * @param {string} filePath - Le chemin vers le fichier à lire.
 * @return {string|null} - Le contenu du fichier lu en tant que chaîne de caractères, ou null en cas d'erreur.
 */
function readFile(filePath) {
    try {
        // Lit le contenu du fichier spécifié en utilisant l'encodage 'utf8'
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return fileContent;
    } catch (err) {
        // En cas d'erreur lors de la lecture du fichier, affiche un message d'erreur
        console.error(`Erreur lors de la lecture du fichier ${filePath}:`, err);
        return null; // Retourne null pour indiquer une erreur de lecture
    }
}

module.exports = {
    readFile
};
