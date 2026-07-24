const fs = require('fs');

### 1. `gerar-lista.js` (Na raiz do projeto)
Este script em Node.js puro
const path = require('path');

const dirPath = path.join(__dirname, 'SiteIdeas');
const outputPath = path.join(__dirname, 'lista-ideias.json');

try {
    // Verifica se a pasta "Site varre a pasta `SiteIdeas` durante o processo de build do Netlify e gera o arquivo `lista-ideias.json`.

```javascript
const fs = require('fs');
const path = require('path');

constIdeas" existe. Se não existir, cria para evitar quebras.
    if (!fs.existsSync(dirPath)) dirPath = path.join(__dirname, 'SiteIdeas');
const outputPath = path.join(__dirname, ' {
        console.log('A pasta "SiteIdeas" não foi encontrada. Criando pasta vazia...');
        fslista-ideias.json');

try {
    // Garante que a pasta existe para não quebrar o build.mkdirSync(dirPath);
    }

    // Lê o conteúdo da pasta
    const files = fs.
    if (!fs.existsSync(dirPath)) {
        console.log("Pasta 'SiteIdeas' não encontrada. CrireaddirSync(dirPath);

    // Filtra apenas os arquivos que terminam com .html
    const htmlFilesando uma nova pasta vazia...");
        fs.mkdirSync(dirPath);
    }

    // Lê = files.filter(file => file.endsWith('.html'));

    // Salva a lista no formato JSON
    fs.writeFileSync( os arquivos, filtra os arquivos HTML e ordena em ordem alfabética
    const files = fs.readdirSync(outputPath, JSON.stringify(htmlFiles, null, 2), 'utf-8');
    console.log(`SudirPath);
    const htmlFiles = files
        .filter(file => file.toLowerCase().endsWith('.htmlcesso: arquivo "lista-ideias.json" gerado com ${htmlFiles.length} item(ns).`);

} catch ('))
        .sort();

    // Grava a lista formatada em formato JSON na raiz
    fs.writeFileSync(outputPath,error) {
    console.error('Erro ao gerar a lista de ideias:', error);
    process.exit(1); // En JSON.stringify(htmlFiles, null, 2), 'utf-8');
    console.log(`Sucesso:cerra o processo indicando falha no build
}
