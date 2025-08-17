# Consultas públicas brasileiras

Uma aplicação web completa para consultas públicas brasileiras usando a Brasil API.

## 🚀 Funcionalidades

### 📍 **Consulta CEP**

- Formatação automática do CEP (00000-000)
- Validação de formato antes da consulta
- Busca informações completas do endereço
- Exibe logradouro, bairro, cidade, estado e DDD

### 🏢 **Consulta CNPJ**

- Formatação automática do CNPJ (00.000.000/0000-00)
- Validação de formato antes da consulta
- Busca informações completas da empresa
- Exibe razão social, nome fantasia, situação, data de abertura, tipo, porte e capital social

### 📅 **Feriados Nacionais**

- Seletor de anos (2020 até ano atual + 1)
- Lista todos os feriados nacionais do ano selecionado
- Exibe data formatada e nome do feriado
- Interface organizada e fácil de navegar

### 🌐 **Consulta Registro.br**

- Verificação de disponibilidade de domínios
- Consulta status de domínios .br
- Exibe informações de disponibilidade
- Interface clara com indicadores visuais

### 💱 **Consulta Câmbio**

- Lista todas as moedas disponíveis
- Seleção de moeda e data
- Consulta cotações históricas
- Exibe valores de compra, venda e variação
- Interface em duas etapas (moeda → data)

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos customizados e responsivos
- **TailwindCSS**: Framework CSS utilitário
- **JavaScript (ES6+)**: Lógica da aplicação
- **Brasil API**: APIs públicas brasileiras
- **Remix Icons**: Ícones modernos e intuitivos

## 📁 Estrutura do Projeto

```
consultas-publicas-brasileiras/
├── index.html      # Página principal com todas as seções
├── styles.css      # Estilos customizados
├── script.js       # Lógica JavaScript completa
└── README.md       # Documentação
```

## 🎯 Como Usar

### Navegação

1. Use o menu superior para navegar entre as diferentes consultas
2. Cada seção tem sua própria interface e funcionalidades

### Consulta CEP

1. Digite um CEP no campo (formato: 00000-000)
2. Clique em "Buscar" ou pressione Enter
3. Visualize as informações do endereço

### Consulta CNPJ

1. Digite um CNPJ no campo (formato: 00.000.000/0000-00)
2. Clique em "Buscar" ou pressione Enter
3. Visualize as informações da empresa

### Feriados Nacionais

1. Selecione um ano no dropdown
2. Clique em "Buscar"
3. Visualize todos os feriados do ano selecionado

### Consulta Registro.br

1. Digite um domínio no campo (ex: exemplo.com.br)
2. Clique em "Verificar"
3. Visualize a disponibilidade do domínio

### Consulta Câmbio

1. Selecione uma moeda da lista disponível
2. Escolha uma data para consultar a cotação
3. Clique em "Consultar"
4. Visualize os valores de compra, venda e variação

## 🔧 Funcionalidades Técnicas

### Formatação Automática

- **CEP**: Remove caracteres não numéricos e adiciona hífen
- **CNPJ**: Formata automaticamente com pontos e barras
- **Domínios**: Aceita entrada livre

### Validação

- Verifica formato antes de fazer requisições
- Feedback visual para erros
- Mensagens claras para o usuário

### Estados da Interface

- **Loading**: Animação durante consultas
- **Erro**: Mensagens claras quando não encontra dados
- **Sucesso**: Exibição organizada dos resultados

### Responsividade

- Layout adaptável para diferentes tamanhos de tela
- Menu de navegação responsivo
- Botões e campos otimizados para mobile

## 🌐 APIs Utilizadas

### CEP API

```
GET https://brasilapi.com.br/api/cep/v1/{cep}
```

### CNPJ API

```
GET https://brasilapi.com.br/api/cnpj/v1/{cnpj}
```

### Feriados API

```
GET https://brasilapi.com.br/api/feriados/v1/{year}
```

### Registro.br API

```
GET https://brasilapi.com.br/api/registrobr/v1/{domain}
```

### Câmbio API

```
GET https://brasilapi.com.br/api/cotacao/v1/moedas
GET https://brasilapi.com.br/api/cotacao/v1/{moeda}?data={data}
```

## 🎨 Design

- **Interface moderna**: Design limpo e profissional
- **Navegação intuitiva**: Menu claro e fácil de usar
- **Cores consistentes**: Paleta baseada no TailwindCSS
- **Animações suaves**: Transições e feedback visual
- **Ícones intuitivos**: Remix Icons para melhor UX
- **Tipografia legível**: Hierarquia visual clara

## 📱 Compatibilidade

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🚀 Como Executar

1. Clone ou baixe os arquivos
2. Abra `index.html` no navegador
3. Comece a usar!

Não é necessário servidor local ou instalação de dependências.

## 🔍 Exemplos de Uso

### CEP

- **Entrada**: `01001000`
- **Resultado**: Informações do endereço em São Paulo

### CNPJ

- **Entrada**: `00000000000191`
- **Resultado**: Informações da Petrobras

### Feriados

- **Entrada**: `2024`
- **Resultado**: Lista de feriados nacionais de 2024

### Registro.br

- **Entrada**: `google.com.br`
- **Resultado**: Status de disponibilidade do domínio

### Câmbio

- **Entrada**: `USD` + `2024-01-15`
- **Resultado**: Cotação do dólar americano na data especificada

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Adicionar novas APIs da Brasil API
