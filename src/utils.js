/**
 * Compare deux déclarations de fonctions pour déterminer si elles sont similaires.
 * @param {Object} func1 - La première déclaration de fonction à comparer.
 * @param {Object} func2 - La deuxième déclaration de fonction à comparer.
 * @return {boolean} - Retourne true si les fonctions sont similaires, sinon false.
 */
function areFunctionsSimilar(func1, func2) {
    // Vérifie si func1 et func2 ont un body défini
    if (!func1 || !func2 || !func1.body || !func2.body) {
        return false;
    }

    // Comparaison basique : Vérifie si les noms des fonctions sont identiques
    if (func1.name !== func2.name) {
        return false;
    }

    // Intialisation du body des fonctions
    const body1 = func1.body.map(node => node.type).join(',');
    const body2 = func2.body.map(node => node.type).join(',');

    // Comparaison des corps des fonctions (simplifiée)
    return body1 === body2;
}

module.exports = {
    areFunctionsSimilar
};
