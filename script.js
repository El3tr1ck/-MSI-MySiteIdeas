async function carregarIdeias() {
    const container = document.getElementById('container-cards');
    const statCount = document.getElementById('stat-count');
    const statDate = document.getElementById('stat-date');
    const githubLink = document.getElementById('github-link');

    // Define a data atual como indicador de última sincronização do sistema
    const hoje = new Date();
    statDate.textContent = hoje.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Auto-detecta o repositório GitHub caso esteja publicado no GitHub Pages
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    if (hostname.includes('github.io')) {
        const owner = hostname.split('.')[0];
        const repo = pathname.split('/').filter(Boolean)[0] || '';
        if (owner && repo) {
            githubLink.href = `https://github.com/${owner}/${repo}`;
        }
    }

    try {
        const response = await fetch('./lista-ideias.json');
        if (!response.ok) {
            throw new Error('Não foi possível obter o arquivo de dados lista-ideias.json');
        }

        const arquivos = await response.json();

        // Atualiza o contador de projetos
        statCount.textContent = String(arquivos.length).padStart(2, '0');

        if (arquivos.length === 0) {
            container.innerHTML = '<p class="status-msg">Nenhum repositório de ideias encontrado.</p>';
            return;
        }

        container.innerHTML = ''; // Limpa o estado de carregamento

        arquivos.forEach(arquivo => {
            const nomeFormatado = arquivo
                .replace('.html', '')
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, letra => letra.toUpperCase());

            const card = document.createElement('a');
            card.className = 'card';
            card.href = `./SiteIdeas/${arquivo}`;
            card.target = '_blank';

            card.innerHTML = `<h3>${nomeFormatado}</h3>`;

            // Efeito Spotlight Interativo (Iluminação dinâmica ao mover o mouse)
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Erro ao ler a lista de ideias:', error);
        statCount.textContent = '00';
        container.innerHTML = '<p class="status-msg erro">Falha na conexão com o banco de metadados.</p>';
    }
}

document.addEventListener('DOMContentLoaded', carregarIdeias);
