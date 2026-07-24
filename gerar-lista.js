const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'SiteIdeas');
const outputPath = path.join(__dirname, 'lista-ideias.json');

try {
    // Verifica se a pasta existe antes de tentar ler
    if (!fs.existsSync(folderPath)) {
        console.warn(`Aviso: A pasta "SiteIdeas" não foi encontrada em: ${folderPath}. Gerando lista vazia.`);
        fs.writeFileSync(outputPath, JSON.stringify([]));
        process.exit(0);
    }

    // Lê o conteúdo da pasta
    const files = fs.readdirSync(folderPath);

    // Filtra apenas arquivos com extensão .html
    const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html');

    // Salva o resultado em formato JSON
    fs.writeFileSync(outputPath, JSON.stringify(htmlFiles, null, 2));
    console.log(`Sucesso: ${htmlFiles.length} arquivos encontrados e salvos em lista-ideias.json.`);
} catch (error) {
    console.error('Erro ao gerar a lista de ideias:', error);
    process.exit(1); // Finaliza com código de erro se algo falhar
}
