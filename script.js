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

            // Cria o próprio card como um elemento <a> (o card inteiro vira o link clicável)
            const card = document.createElement('a');
            card.className = 'card';
            card.href = `./SiteIdeas/${arquivo}`;
            card.target = '_blank';

            card.innerHTML = `
                <div class="card-content">
                    <h3>${nomeFormatado}</h3>
                </div>
                <div class="card-action">
                    <span>Explorar projeto</span>
                    <svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16">
                        <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Erro ao ler a lista de ideias:', error);
        container.innerHTML = '<p class="status-msg erro">Ocorreu um erro ao tentar carregar os projetos.</p>';
    }
}

document.addEventListener('DOMContentLoaded', carregarIdeias);
