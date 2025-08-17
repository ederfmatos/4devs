# 4devs - Ferramentas para Desenvolvedores

Uma aplicação web moderna que oferece diversas ferramentas úteis para desenvolvedores, incluindo geradores, validadores e consultas de dados brasileiros.

## 🚀 Funcionalidades

### 🔍 Consultas

- **CEP**: Busca informações de endereço por CEP
- **CNPJ**: Consulta dados completos de empresas
- **Feriados**: Lista feriados nacionais por ano
- **Domínios**: Verifica disponibilidade de domínios .br
- **Câmbio**: Cotações em tempo real das principais moedas

### 🔧 Geradores

- **CPF**: Gera CPFs válidos aleatórios
- **CNPJ**: Gera CNPJs válidos aleatórios
- **CEP**: Gera CEPs aleatórios
- **Senhas**: Gerador de senhas seguras com opções customizáveis
- **UUID**: Gera UUIDs v4

### ✅ Validadores

- **CPF**: Valida CPFs com detalhes da verificação
- **CNPJ**: Valida CNPJs com detalhes da verificação
- **Senhas**: Analisa força e segurança de senhas

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **HTTP Client**: Axios

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/4devs.git
cd 4devs
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

4. Acesse a aplicação em `http://localhost:5173`

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── generators/      # Geradores (CPF, CNPJ, CEP, etc.)
│   ├── searchers/       # Consultas (CEP, CNPJ, etc.)
│   ├── validators/      # Validadores (CPF, CNPJ, etc.)
│   └── *.tsx           # Componentes compartilhados
├── domain/             # Classes de domínio
│   ├── Cep.ts         # Lógica de CEP
│   ├── Cpf.ts         # Lógica de CPF
│   ├── Cnpj.ts        # Lógica de CNPJ
│   └── Password.ts    # Lógica de senhas
├── hooks/              # Hooks customizados
├── services/           # Serviços de API
├── types/              # Definições de tipos TypeScript
└── utils/              # Utilitários
```

## 🎯 Arquitetura

### Domain-Driven Design

O projeto utiliza classes de domínio para encapsular a lógica de negócio:

```typescript
// Exemplo de uso da classe Cpf
const cpf = new Cpf('123.456.789-09')
console.log(cpf.isValid()) // true
console.log(cpf.format()) // '123.456.789-09'

// Gerar CPF aleatório
const randomCpf = Cpf.generate()
```

### Componentes Modulares

Cada funcionalidade é organizada em componentes independentes com seus próprios hooks:

```typescript
// Hook local do componente
const useCpfGenerator = () => {
  const [quantity, setQuantity] = useState(1)
  const [generatedCpfs, setGeneratedCpfs] = useState<Cpf[]>([])
  
  const generateCpfs = () => {
    const cpfs = Cpf.generateMultiple(quantity)
    setGeneratedCpfs(cpfs)
  }
  
  return { quantity, setQuantity, generatedCpfs, generateCpfs }
}
```

## 🔌 APIs Utilizadas

- **Brasil API**: CEP, CNPJ, Feriados, Câmbio
- **Registro.br**: Consulta de domínios

## 📱 Interface

- **Design Responsivo**: Funciona em desktop, tablet e mobile
- **Tema Claro**: Interface limpa e moderna
- **Navegação Lateral**: Menu organizado por categorias
- **Feedback Visual**: Indicadores de loading, sucesso e erro

## 🚀 Scripts Disponíveis

```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção
npm run lint         # Executa linter
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Eder Ferreira de Matos**

- GitHub: [@ederfmatos](https://github.com/ederfmatos)

## 🙏 Agradecimentos

- [Brasil API](https://brasilapi.com.br/) - APIs públicas brasileiras
- [Registro.br](https://registro.br/) - Consulta de domínios
- [Lucide](https://lucide.dev/) - Ícones
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
