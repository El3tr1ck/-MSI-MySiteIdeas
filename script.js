async function carregarIdeias() {
    const container = document.getElementById('container-cards');

    try {
        const response = await fetch('./lista-ideias.json');
        if (!response.ok) {
            throw new Error('Não foi possível obter o arquivo de dados lista-ideias.json');
        }

        const arquivos = await response.json();

        if (arquivos.length === 0) {
            container.innerHTML = '<p class="status-msg">Nenhuma ideia de site encontrada por enquanto.</p>';
            return;
        }

        container.innerHTML = ''; // Limpa a mensagem de carregando

        arquivos.forEach(arquivo => {
            // Formata o nome do arquivo para exibição
            const nomeFormatado = arquivo
                .replace('.html', '')
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, letra => letra.toUpperCase());

            // Cria o card como um link direto
            const card = document.createElement('a');
            card.className = 'card';
            card.href = `./SiteIdeas/${arquivo}`;
            card.target = '_blank';

            // Deixa apenas o título dentro do card
            card.innerHTML = `<h3>${nomeFormatado}</h3>`;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Erro ao ler a lista de ideias:', error);
        container.innerHTML = '<p class="status-msg erro">Ocorreu um erro ao tentar carregar os projetos.</p>';
    }
}

document.addEventListener('DOMContentLoaded', carregarIdeias);
