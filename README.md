# 4Devs - Ferramentas para Desenvolvedores

Uma aplicação React moderna que oferece diversas ferramentas úteis para desenvolvedores, incluindo geradores, validadores e consultas de dados.

## 🚀 Funcionalidades

### 🔍 Consultas (Searchers)

- **CEP**: Consulta informações de endereços por CEP
- **CNPJ**: Busca dados de empresas por CNPJ
- **Domínios**: Verifica informações de domínios .br
- **Feriados**: Lista feriados nacionais por ano
- **Câmbio**: Consulta taxas de câmbio em tempo real

### ✅ Validadores

- **CPF**: Validação completa de CPF com detalhes
- **CNPJ**: Validação de CNPJ com algoritmo oficial
- **Senha**: Validação de força de senha com sugestões

### 🛠️ Geradores

- **CEP**: Gera CEPs válidos para testes
- **CPF**: Gera CPFs válidos
- **CNPJ**: Gera CNPJs válidos
- **Senha**: Gera senhas seguras com opções personalizáveis
- **UUID**: Gera UUIDs em diferentes versões (v1-v7)

## 🎨 Tema Escuro

A aplicação suporta tema escuro com:

- Detecção automática da preferência do sistema
- Persistência da escolha do usuário
- Transições suaves entre temas
- Interface totalmente adaptada para ambos os temas

## 🛠️ Tecnologias

- **React 19** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **ESLint + Prettier** para qualidade de código

## 📦 Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd cep

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🔧 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza o build de produção
```

### Qualidade de Código

```bash
npm run lint         # Executa ESLint para verificar problemas
npm run lint:fix     # Corrige automaticamente problemas do ESLint
npm run format       # Formata código com Prettier
npm run format:check # Verifica se o código está formatado
npm run type-check   # Verifica tipos TypeScript
```

### Verificações Completas

```bash
npm run check        # Executa lint + format:check + type-check
npm run fix          # Corrige lint + formata código
npm run check-unused # Verifica imports e código não utilizado
npm run audit        # Executa todas as verificações
```

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── components/          # Componentes React
│   ├── generators/     # Geradores (CEP, CPF, CNPJ, etc.)
│   ├── searchers/      # Consultas (CEP, CNPJ, etc.)
│   ├── validators/     # Validadores (CPF, CNPJ, etc.)
│   └── *.tsx          # Componentes compartilhados
├── domain/             # Classes de domínio
├── hooks/              # Hooks customizados
├── services/           # Serviços de API
├── types/              # Definições TypeScript
└── utils/              # Utilitários
```

### Padrões de Desenvolvimento

#### Componentes

- Cada componente tem seu próprio hook (`.hook.ts`)
- Uso do componente `Text` para consistência de tema
- Componente `LabelValue` para padrões label/valor
- Suporte completo ao tema escuro

#### Domain Classes

- Classes encapsuladas para lógica de negócio
- Métodos para validação, formatação e geração
- Tipos TypeScript rigorosos

#### Hooks

- Hooks específicos para cada funcionalidade
- Gerenciamento de estado local
- Integração com APIs externas

## 🎯 Configuração de Qualidade

### ESLint

- Configuração rigorosa para TypeScript e React
- Regras para evitar código não utilizado
- Integração com Prettier

### Prettier

- Formatação consistente do código
- Configuração otimizada para React/TypeScript
- Integração com ESLint

### TypeScript

- Configuração estrita
- Verificação de tipos em tempo de build
- Tipos bem definidos para todas as APIs

## 🌐 APIs Utilizadas

- **Brasil API**: CEP, CNPJ, Domínios, Feriados, Câmbio
- **Clipboard API**: Para copiar dados
- **UUID Library**: Para geração de UUIDs

## 📱 Responsividade

A aplicação é totalmente responsiva com:

- Design mobile-first
- Sidebar colapsível em dispositivos móveis
- Layout adaptativo para diferentes tamanhos de tela

## 🔒 Segurança

- Validação client-side rigorosa
- Sanitização de inputs
- Uso de HTTPS para todas as APIs
- Não armazenamento de dados sensíveis

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte, abra uma issue no repositório ou entre em contato através dos canais disponíveis.

---

**Desenvolvido com ❤️ para a comunidade de desenvolvedores brasileiros**
