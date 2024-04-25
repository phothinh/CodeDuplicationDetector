const esprima = require('esprima');
const estraverse = require('estraverse');
const { areFunctionsSimilar } = require('./utils');

/**
 * Extrait les déclarations de fonctions d'un contenu de fichier JavaScript.
 * @param {string} fileContent - Le contenu du fichier JavaScript à analyser.
 * @return {Array} - Un tableau d'objets représentant les déclarations de fonctions extraites.
 */
function extractFunctionDeclarations(fileContent) {
    //Parse le contenu du fichier en AST (Abstract syntax tree)
    const ast = esprima.parseScript(fileContent, { loc: true });
    const functionDeclarations = [];

    // Parcourt l'AST pour trouver les déclarations de fonctions
    estraverse.traverse(ast, {
        enter: function(node) {
            if (node.type === 'FunctionDeclaration') {

                // Ajoute la déclaration de fonction à la liste des déclarations
                functionDeclarations.push({
                    name: node.id.name,
                    body: node.body.body,
                    startLine: node.loc.start.line,
                    endLine: node.loc.end.line
                });

            }
        }
    });

    console.log("functionDeclarations : " + functionDeclarations);

    return functionDeclarations;
}

/**
 * Détecte les duplications de code entre deux fichiers JavaScript en comparant les déclarations de fonctions.
 * @param {string} file1Content - Le contenu du premier fichier JavaScript.
 * @param {string} file2Content - Le contenu du deuxième fichier JavaScript.
 * @return {Array} - Un tableau d'objets représentant les duplications de code détectées.
 */
function detectCodeDuplication(file1Content, file2Content) {
    const file1Functions = extractFunctionDeclarations(file1Content);
    const file2Functions = extractFunctionDeclarations(file2Content);

    const duplications = [];

    // Compare chaque déclaration de fonction du premier fichier avec celles du deuxième fichier
    file1Functions.forEach(func1 => {
        const matchingFunction = file2Functions.find(func2 => {
            return areFunctionsSimilar(func1, func2);
        });

        if (matchingFunction) {
            // Il y a une duplication détectée
            const duplicatedContentLines = file1Content.split('\n').slice(func1.startLine - 1, func1.endLine);
            const duplicatedContent = duplicatedContentLines.join('\n');

            duplications.push({
                functionName: func1.name,
                file1Lines: [func1.startLine, func1.endLine],
                file2Lines: [matchingFunction.startLine, matchingFunction.endLine],
                duplicatedContent: duplicatedContent
            });
        }
    });

    return duplications;
}

module.exports = {
    detectCodeDuplication
};
