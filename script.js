async function carregarIdeias() {
    const container = document.getElementById('container-cards');

    try {
        // Faz a busca do JSON gerado no build
        const response = await fetch('./lista-ideias.json');
        if (!response.ok) {
            throw new Error('Não foi possível obter o arquivo de dados lista-ideias.json');
        }

        const arquivos = await response.json();

        // Se o array estiver vazio
        if (arquivos.length === 0) {
            container.innerHTML = '<p class="status-msg">Nenhuma ideia de site foi encontrada.</p>';
            return;
        }

        container.innerHTML = ''; // Limpa a mensagem de carregando

        arquivos.forEach(arquivo => {
            // Remove a extensão .html e substitui hifens/underlines por espaços
            const nomeFormatado = arquivo
                .replace('.html', '')
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, letra => letra.toUpperCase());

            // Cria o elemento do card
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <div>
                    <h3>${nomeFormatado}</h3>
                    <p class="card-info">Arquivo: ${arquivo}</p>
                </div>
                <a href="./SiteIdeas/${arquivo}" class="btn-abrir" target="_blank">Visualizar</a>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Erro ao ler a lista de ideias:', error);
        container.innerHTML = '<p class="status-msg erro">Erro ao carregar a lista de projetos.</p>';
    }
}

document.addEventListener('DOMContentLoaded', carregarIdeias);
