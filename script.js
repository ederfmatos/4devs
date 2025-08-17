// ===== NAVEGAÇÃO =====
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

// Função para trocar de seção
function switchSection(sectionName) {
    // Atualizar navegação
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionName) {
            item.classList.add('active');
        }
    });

    // Atualizar seções
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === `${sectionName}-section`) {
            section.classList.add('active');
        }
    });
}

// Event listeners para navegação
navItems.forEach(item => {
    item.addEventListener('click', () => {
        switchSection(item.dataset.section);
    });
});

// ===== CEP SECTION =====
const cepInput = document.getElementById('cepInput');
const searchCepBtn = document.getElementById('searchCepBtn');
const cepLoading = document.getElementById('cep-loading');
const cepError = document.getElementById('cep-error');
const cepResults = document.getElementById('cep-results');
const cepTryAgain = document.getElementById('cep-try-again');

// Elementos dos resultados CEP
const resultCep = document.getElementById('result-cep');
const resultLogradouro = document.getElementById('result-logradouro');
const resultBairro = document.getElementById('result-bairro');
const resultCidade = document.getElementById('result-cidade');
const resultEstado = document.getElementById('result-estado');
const resultDdd = document.getElementById('result-ddd');

// Formatação automática do CEP
cepInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 8) {
        value = value.substring(0, 8);
    }

    if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5);
    }

    e.target.value = value;
});

// Validação de CEP
function isValidCEP(cep) {
    const cleanCep = cep.replace(/\D/g, '');
    return cleanCep.length === 8 && /^\d{8}$/.test(cleanCep);
}

// Função para mostrar estados CEP
function showCepState(state) {
    cepLoading.classList.add('hidden');
    cepError.classList.add('hidden');
    cepResults.classList.add('hidden');

    switch (state) {
        case 'loading':
            cepLoading.classList.remove('hidden');
            break;
        case 'error':
            cepError.classList.remove('hidden');
            break;
        case 'results':
            cepResults.classList.remove('hidden');
            break;
    }
}

// Buscar CEP
async function searchCEP(cep) {
    const cleanCep = cep.replace(/\D/g, '');

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cleanCep}`);

        if (!response.ok) {
            throw new Error('CEP não encontrado');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Exibir resultados CEP
function displayCepResults(data) {
    resultCep.textContent = data.cep;
    resultLogradouro.textContent = data.street || 'Não informado';
    resultBairro.textContent = data.neighborhood || 'Não informado';
    resultCidade.textContent = data.city || 'Não informado';
    resultEstado.textContent = data.state || 'Não informado';
    resultDdd.textContent = data.ddd || 'Não informado';
}

// Event listeners CEP
searchCepBtn.addEventListener('click', async function () {
    const cep = cepInput.value.trim();

    if (!cep) {
        alert('Por favor, digite um CEP');
        cepInput.focus();
        return;
    }

    if (!isValidCEP(cep)) {
        alert('Por favor, digite um CEP válido no formato 00000-000');
        cepInput.focus();
        return;
    }

    try {
        showCepState('loading');
        const data = await searchCEP(cep);
        displayCepResults(data);
        showCepState('results');
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        showCepState('error');
    }
});

cepInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchCepBtn.click();
    }
});

cepTryAgain.addEventListener('click', function () {
    showCepState('loading');
    cepInput.value = '';
    cepInput.focus();
});

// ===== CNPJ SECTION =====
const cnpjInput = document.getElementById('cnpjInput');
const searchCnpjBtn = document.getElementById('searchCnpjBtn');
const cnpjLoading = document.getElementById('cnpj-loading');
const cnpjError = document.getElementById('cnpj-error');
const cnpjResults = document.getElementById('cnpj-results');
const cnpjTryAgain = document.getElementById('cnpj-try-again');

// Elementos dos resultados CNPJ
const resultCnpj = document.getElementById('result-cnpj');
const resultRazaoSocial = document.getElementById('result-razao-social');
const resultNomeFantasia = document.getElementById('result-nome-fantasia');
const resultSituacao = document.getElementById('result-situacao');
const resultDataAbertura = document.getElementById('result-data-abertura');
const resultTipo = document.getElementById('result-tipo');
const resultPorte = document.getElementById('result-porte');
const resultCapitalSocial = document.getElementById('result-capital-social');

// Formatação automática do CNPJ
cnpjInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 14) {
        value = value.substring(0, 14);
    }

    if (value.length > 12) {
        value = value.substring(0, 12) + '/' + value.substring(12);
    }
    if (value.length > 8) {
        value = value.substring(0, 8) + '-' + value.substring(8);
    }
    if (value.length > 5) {
        value = value.substring(0, 5) + '.' + value.substring(5);
    }
    if (value.length > 2) {
        value = value.substring(0, 2) + '.' + value.substring(2);
    }

    e.target.value = value;
});

// Validação de CNPJ
function isValidCNPJ(cnpj) {
    const cleanCnpj = cnpj.replace(/\D/g, '');
    return cleanCnpj.length === 14 && /^\d{14}$/.test(cleanCnpj);
}

// Função para mostrar estados CNPJ
function showCnpjState(state) {
    cnpjLoading.classList.add('hidden');
    cnpjError.classList.add('hidden');
    cnpjResults.classList.add('hidden');

    switch (state) {
        case 'loading':
            cnpjLoading.classList.remove('hidden');
            break;
        case 'error':
            cnpjError.classList.remove('hidden');
            break;
        case 'results':
            cnpjResults.classList.remove('hidden');
            break;
    }
}

// Buscar CNPJ
async function searchCNPJ(cnpj) {
    const cleanCnpj = cnpj.replace(/\D/g, '');

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`);

        if (!response.ok) {
            throw new Error('CNPJ não encontrado');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Exibir resultados CNPJ
function displayCnpjResults(data) {
    resultCnpj.textContent = data.cnpj;
    resultRazaoSocial.textContent = data.razao_social || 'Não informado';
    resultNomeFantasia.textContent = data.nome_fantasia || 'Não informado';
    resultSituacao.textContent = data.descricao_situacao_cadastral || 'Não informado';
    resultDataAbertura.textContent = data.data_inicio_atividade ? new Date(data.data_inicio_atividade).toLocaleDateString('pt-BR') : 'Não informado';
    resultTipo.textContent = data.descricao_identificador_matriz_filial || 'Não informado';
    resultPorte.textContent = data.porte?.descricao || 'Não informado';
    resultCapitalSocial.textContent = data.capital_social ? `R$ ${parseFloat(data.capital_social).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Não informado';
}

// Event listeners CNPJ
searchCnpjBtn.addEventListener('click', async function () {
    const cnpj = cnpjInput.value.trim();

    if (!cnpj) {
        alert('Por favor, digite um CNPJ');
        cnpjInput.focus();
        return;
    }

    if (!isValidCNPJ(cnpj)) {
        alert('Por favor, digite um CNPJ válido no formato 00.000.000/0000-00');
        cnpjInput.focus();
        return;
    }

    try {
        showCnpjState('loading');
        const data = await searchCNPJ(cnpj);
        displayCnpjResults(data);
        showCnpjState('results');
    } catch (error) {
        console.error('Erro ao buscar CNPJ:', error);
        showCnpjState('error');
    }
});

cnpjInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchCnpjBtn.click();
    }
});

cnpjTryAgain.addEventListener('click', function () {
    showCnpjState('loading');
    cnpjInput.value = '';
    cnpjInput.focus();
});

// ===== FERIADOS SECTION =====
const anoSelect = document.getElementById('anoSelect');
const searchFeriadosBtn = document.getElementById('searchFeriadosBtn');
const feriadosLoading = document.getElementById('feriados-loading');
const feriadosError = document.getElementById('feriados-error');
const feriadosResults = document.getElementById('feriados-results');
const feriadosTryAgain = document.getElementById('feriados-try-again');
const feriadosAno = document.getElementById('feriados-ano');
const feriadosList = document.getElementById('feriados-list');

// Preencher select de anos
function populateYearSelect() {
    const currentYear = new Date().getFullYear();
    const startYear = 2020;

    for (let year = currentYear + 1; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        anoSelect.appendChild(option);
    }
}

// Função para mostrar estados Feriados
function showFeriadosState(state) {
    feriadosLoading.classList.add('hidden');
    feriadosError.classList.add('hidden');
    feriadosResults.classList.add('hidden');

    switch (state) {
        case 'loading':
            feriadosLoading.classList.remove('hidden');
            break;
        case 'error':
            feriadosError.classList.remove('hidden');
            break;
        case 'results':
            feriadosResults.classList.remove('hidden');
            break;
    }
}

// Buscar Feriados
async function searchFeriados(year) {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar feriados');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Exibir resultados Feriados
function displayFeriadosResults(data, year) {
    feriadosAno.textContent = year;
    feriadosList.innerHTML = '';

    if (data.length === 0) {
        feriadosList.innerHTML = '<p class="text-gray-500 text-center py-4">Nenhum feriado encontrado para este ano.</p>';
        return;
    }

    data.forEach(feriado => {
        const feriadoItem = document.createElement('div');
        feriadoItem.className = 'feriado-item';

        const date = new Date(feriado.date);
        const formattedDate = date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        feriadoItem.innerHTML = `
            <div class="feriado-date">${formattedDate}</div>
            <div class="feriado-name">${feriado.name}</div>
        `;

        feriadosList.appendChild(feriadoItem);
    });
}

// Event listeners Feriados
searchFeriadosBtn.addEventListener('click', async function () {
    const year = anoSelect.value;

    if (!year) {
        alert('Por favor, selecione um ano');
        anoSelect.focus();
        return;
    }

    try {
        showFeriadosState('loading');
        const data = await searchFeriados(year);
        displayFeriadosResults(data, year);
        showFeriadosState('results');
    } catch (error) {
        console.error('Erro ao buscar feriados:', error);
        showFeriadosState('error');
    }
});

feriadosTryAgain.addEventListener('click', function () {
    showFeriadosState('loading');
    anoSelect.value = '';
    anoSelect.focus();
});

// ===== REGISTRO.BR SECTION =====
const dominioInput = document.getElementById('dominioInput');
const searchDominioBtn = document.getElementById('searchDominioBtn');
const dominioLoading = document.getElementById('dominio-loading');
const dominioError = document.getElementById('dominio-error');
const dominioResults = document.getElementById('dominio-results');
const dominioTryAgain = document.getElementById('dominio-try-again');

// Elementos dos resultados Registro.br
const resultDominio = document.getElementById('result-dominio');
const resultStatus = document.getElementById('result-status');
const resultDisponibilidade = document.getElementById('result-disponibilidade');

// Função para mostrar estados Registro.br
function showDominioState(state) {
    dominioLoading.classList.add('hidden');
    dominioError.classList.add('hidden');
    dominioResults.classList.add('hidden');

    switch (state) {
        case 'loading':
            dominioLoading.classList.remove('hidden');
            break;
        case 'error':
            dominioError.classList.remove('hidden');
            break;
        case 'results':
            dominioResults.classList.remove('hidden');
            break;
    }
}

// Buscar Registro.br
async function searchDominio(dominio) {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/registrobr/v1/${dominio}`);

        if (!response.ok) {
            throw new Error('Erro ao verificar domínio');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Exibir resultados Registro.br
function displayDominioResults(data) {
    resultDominio.textContent = data.fqdn;
    resultStatus.textContent = data.status || 'Não informado';

    const disponibilidade = data.status === 'AVAILABLE' ? 'Disponível' : 'Indisponível';
    const disponibilidadeClass = data.status === 'AVAILABLE' ? 'status-available' : 'status-unavailable';

    resultDisponibilidade.innerHTML = `<span class="${disponibilidadeClass}">${disponibilidade}</span>`;
}

// Event listeners Registro.br
searchDominioBtn.addEventListener('click', async function () {
    const dominio = dominioInput.value.trim();

    if (!dominio) {
        alert('Por favor, digite um domínio');
        dominioInput.focus();
        return;
    }

    try {
        showDominioState('loading');
        const data = await searchDominio(dominio);
        displayDominioResults(data);
        showDominioState('results');
    } catch (error) {
        console.error('Erro ao verificar domínio:', error);
        showDominioState('error');
    }
});

dominioInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchDominioBtn.click();
    }
});

dominioTryAgain.addEventListener('click', function () {
    showDominioState('loading');
    dominioInput.value = '';
    dominioInput.focus();
});

// ===== CÂMBIO SECTION =====
const cambioStep1 = document.getElementById('cambio-step1');
const cambioStep2 = document.getElementById('cambio-step2');
const moedasLoading = document.getElementById('moedas-loading');
const moedasList = document.getElementById('moedas-list');
const moedasError = document.getElementById('moedas-error');
const moedasTryAgain = document.getElementById('moedas-try-again');
const moedaSelecionada = document.getElementById('moeda-selecionada');
const dataCotacao = document.getElementById('dataCotacao');
const searchCotacaoBtn = document.getElementById('searchCotacaoBtn');
const voltarMoedas = document.getElementById('voltar-moedas');
const cambioLoading = document.getElementById('cambio-loading');
const cambioError = document.getElementById('cambio-error');
const cambioResults = document.getElementById('cambio-results');
const cambioTryAgain = document.getElementById('cambio-try-again');
const novaConsultaCambio = document.getElementById('nova-consulta-cambio');

// Elementos dos resultados Câmbio
const resultMoeda = document.getElementById('result-moeda');
const resultData = document.getElementById('result-data');
const resultCompra = document.getElementById('result-compra');
const resultVenda = document.getElementById('result-venda');
const resultVariacao = document.getElementById('result-variacao');
const resultAtualizacao = document.getElementById('result-atualizacao');

let selectedCurrency = null;

// Configurar data máxima como hoje
function setMaxDate() {
    const today = new Date().toISOString().split('T')[0];
    dataCotacao.max = today;
    dataCotacao.value = today;
}

// Função para mostrar estados das moedas
function showMoedasState(state) {
    moedasLoading.classList.add('hidden');
    moedasList.classList.add('hidden');
    moedasError.classList.add('hidden');

    switch (state) {
        case 'loading':
            moedasLoading.classList.remove('hidden');
            break;
        case 'list':
            moedasList.classList.remove('hidden');
            break;
        case 'error':
            moedasError.classList.remove('hidden');
            break;
    }
}

// Função para mostrar estados do câmbio
function showCambioState(state) {
    cambioLoading.classList.add('hidden');
    cambioError.classList.add('hidden');
    cambioResults.classList.add('hidden');

    switch (state) {
        case 'loading':
            cambioLoading.classList.remove('hidden');
            break;
        case 'error':
            cambioError.classList.remove('hidden');
            break;
        case 'results':
            cambioResults.classList.remove('hidden');
            break;
    }
}

// Buscar lista de moedas
async function fetchMoedas() {
    try {
        const response = await fetch('https://brasilapi.com.br/api/cambio/v1/moedas');

        if (!response.ok) {
            throw new Error('Erro ao carregar moedas');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Buscar cotação
async function fetchCotacao(moeda, data) {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cambio/v1/cotacao/${moeda}/${data}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar cotação');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Exibir lista de moedas
function displayMoedas(moedas) {
    moedasList.innerHTML = '';

    console.log(moedas);

    moedas.forEach(moeda => {
        const moedaItem = document.createElement('div');
        moedaItem.className = 'moeda-item';
        moedaItem.dataset.code = moeda.code;

        moedaItem.innerHTML = `
            <div class="moeda-code">${moeda.simbolo}</div>
            <div class="moeda-name">${moeda.nome}</div>
        `;

        moedaItem.addEventListener('click', () => selectMoeda(moeda));
        moedasList.appendChild(moedaItem);
    });
}

// Selecionar moeda
function selectMoeda(moeda) {
    selectedCurrency = moeda;

    // Remover seleção anterior
    document.querySelectorAll('.moeda-item').forEach(item => {
        item.classList.remove('selected');
    });

    // Selecionar item clicado
    const selectedItem = document.querySelector(`[data-code="${moeda.code}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }

    // Atualizar texto da moeda selecionada
    moedaSelecionada.textContent = moeda.code;

    // Ir para próximo passo
    cambioStep1.classList.add('hidden');
    cambioStep2.classList.remove('hidden');

    // Configurar data
    setMaxDate();
}

// Exibir resultados da cotação
function displayCotacaoResults(data) {
    resultMoeda.textContent = `${data.code} - ${data.name}`;
    resultData.textContent = new Date(data.date).toLocaleDateString('pt-BR');
    resultCompra.textContent = `R$ ${parseFloat(data.bid).toFixed(4)}`;
    resultVenda.textContent = `R$ ${parseFloat(data.ask).toFixed(4)}`;

    // Variação
    if (data.varBid && data.varBid !== 0) {
        const variacao = parseFloat(data.varBid);
        const variacaoClass = variacao > 0 ? 'currency-positive' : variacao < 0 ? 'currency-negative' : 'currency-neutral';
        const variacaoSymbol = variacao > 0 ? '+' : '';
        resultVariacao.innerHTML = `<span class="${variacaoClass}">${variacaoSymbol}${variacao.toFixed(4)}%</span>`;
    } else {
        resultVariacao.textContent = 'N/A';
    }

    resultAtualizacao.textContent = new Date(data.timestamp).toLocaleString('pt-BR');
}

// Carregar moedas quando a seção for ativada
function loadMoedas() {
    showMoedasState('loading');

    fetchMoedas()
        .then(moedas => {
            displayMoedas(moedas);
            showMoedasState('list');
        })
        .catch(error => {
            console.error('Erro ao carregar moedas:', error);
            showMoedasState('error');
        });
}

// Event listeners Câmbio
moedasTryAgain.addEventListener('click', loadMoedas);

voltarMoedas.addEventListener('click', () => {
    cambioStep2.classList.add('hidden');
    cambioStep1.classList.remove('hidden');
    selectedCurrency = null;

    // Remover seleção
    document.querySelectorAll('.moeda-item').forEach(item => {
        item.classList.remove('selected');
    });
});

searchCotacaoBtn.addEventListener('click', async () => {
    if (!selectedCurrency) {
        alert('Por favor, selecione uma moeda primeiro');
        return;
    }

    const data = dataCotacao.value;
    if (!data) {
        alert('Por favor, selecione uma data');
        dataCotacao.focus();
        return;
    }

    try {
        showCambioState('loading');
        const cotacao = await fetchCotacao(selectedCurrency.simbolo, data);
        displayCotacaoResults(cotacao);
        showCambioState('results');
    } catch (error) {
        console.error('Erro ao buscar cotação:', error);
        showCambioState('error');
    }
});

cambioTryAgain.addEventListener('click', () => {
    showCambioState('loading');
    searchCotacaoBtn.click();
});

novaConsultaCambio.addEventListener('click', () => {
    cambioStep1.classList.remove('hidden');
    cambioStep2.classList.add('hidden');
    cambioResults.classList.add('hidden');
    selectedCurrency = null;

    // Remover seleção
    document.querySelectorAll('.moeda-item').forEach(item => {
        item.classList.remove('selected');
    });

    // Recarregar moedas
    loadMoedas();
});

// Carregar moedas quando a seção de câmbio for ativada
document.addEventListener('click', (e) => {
    if (e.target.dataset.section === 'cambio') {
        setTimeout(loadMoedas, 100);
    }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    populateYearSelect();
    cepInput.focus();
}); 