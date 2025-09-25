import { Cnpj } from './Cnpj';

export interface EnderecoEmpresa {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface DadosEmpresa {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  endereco: EnderecoEmpresa;
  telefone: string;
  email: string;
  atividade: string;
}

export class EmpresaFake {
  private dados: DadosEmpresa;

  constructor(dados?: Partial<DadosEmpresa>) {
    this.dados = {
      razaoSocial: dados?.razaoSocial || '',
      nomeFantasia: dados?.nomeFantasia || '',
      cnpj: dados?.cnpj || '',
      endereco: dados?.endereco || {
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
      },
      telefone: dados?.telefone || '',
      email: dados?.email || '',
      atividade: dados?.atividade || '',
    };
  }

  static generate(): EmpresaFake {
    const razaoSocial = EmpresaFake.generateRazaoSocial();
    const nomeFantasia = EmpresaFake.generateNomeFantasia();
    const cnpj = Cnpj.generate().format();
    const endereco = EmpresaFake.generateEndereco();
    const telefone = EmpresaFake.generateTelefone();
    const email = EmpresaFake.generateEmail(nomeFantasia);
    const atividade = EmpresaFake.generateAtividade();

    return new EmpresaFake({
      razaoSocial,
      nomeFantasia,
      cnpj,
      endereco,
      telefone,
      email,
      atividade,
    });
  }

  static generateMultiple(count: number): EmpresaFake[] {
    return Array.from({ length: count }, () => EmpresaFake.generate());
  }

  private static generateRazaoSocial(): string {
    const prefixos = [
      'Comercial',
      'Industrial',
      'Serviços',
      'Tecnologia',
      'Consultoria',
      'Distribuidora',
      'Importadora',
      'Exportadora',
      'Logística',
      'Transportes',
    ];

    const nomes = [
      'Silva',
      'Santos',
      'Oliveira',
      'Souza',
      'Rodrigues',
      'Ferreira',
      'Alves',
      'Pereira',
      'Lima',
      'Gomes',
      'Costa',
      'Ribeiro',
      'Martins',
    ];

    const sufixos = ['Ltda', 'S.A.', 'ME', 'EPP', 'EIRELI'];

    const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sufixo = sufixos[Math.floor(Math.random() * sufixos.length)];

    return `${prefixo} ${nome} ${sufixo}`;
  }

  private static generateNomeFantasia(): string {
    const adjetivos = [
      'Rápido',
      'Fácil',
      'Smart',
      'Pro',
      'Plus',
      'Premium',
      'Express',
      'Digital',
      'Online',
      'Virtual',
      'Global',
      'Nacional',
      'Regional',
    ];

    const substantivos = [
      'Tech',
      'Solutions',
      'Services',
      'Systems',
      'Group',
      'Company',
      'Brasil',
      'Center',
      'Store',
      'Shop',
      'Market',
      'Point',
    ];

    const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
    const substantivo =
      substantivos[Math.floor(Math.random() * substantivos.length)];

    return `${adjetivo} ${substantivo}`;
  }

  private static generateEndereco(): EnderecoEmpresa {
    const logradouros = [
      'Rua das Flores',
      'Avenida Paulista',
      'Rua Augusta',
      'Avenida Brasil',
      'Rua XV de Novembro',
      'Avenida Getúlio Vargas',
      'Rua da Consolação',
      'Avenida Copacabana',
      'Rua Oscar Freire',
      'Avenida Faria Lima',
    ];

    const bairros = [
      'Centro',
      'Jardins',
      'Vila Madalena',
      'Copacabana',
      'Ipanema',
      'Leblon',
      'Botafogo',
      'Tijuca',
      'Barra da Tijuca',
      'Savassi',
    ];

    const cidades = [
      'São Paulo',
      'Rio de Janeiro',
      'Belo Horizonte',
      'Salvador',
      'Brasília',
      'Fortaleza',
      'Recife',
      'Porto Alegre',
      'Curitiba',
    ];

    const estados = ['SP', 'RJ', 'MG', 'BA', 'DF', 'CE', 'PE', 'RS', 'PR'];

    const logradouro =
      logradouros[Math.floor(Math.random() * logradouros.length)];
    const numero = (Math.floor(Math.random() * 9999) + 1).toString();
    const bairro = bairros[Math.floor(Math.random() * bairros.length)];
    const cidade = cidades[Math.floor(Math.random() * cidades.length)];
    const estado = estados[Math.floor(Math.random() * estados.length)];
    const cep = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    return {
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep: `${cep.slice(0, 5)}-${cep.slice(5)}`,
    };
  }

  private static generateTelefone(): string {
    const ddd = Math.floor(Math.random() * 89) + 11;
    const number = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    return `(${ddd}) 3${number}`;
  }

  private static generateEmail(nomeFantasia: string): string {
    const domains = ['com.br', 'net.br', 'org.br', 'gov.br'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const nome = nomeFantasia.toLowerCase().replace(/\s+/g, '');

    return `contato@${nome}.${domain}`;
  }

  private static generateAtividade(): string {
    const atividades = [
      'Comércio varejista de artigos diversos',
      'Prestação de serviços de consultoria',
      'Desenvolvimento de software',
      'Comércio atacadista de produtos alimentícios',
      'Serviços de engenharia e arquitetura',
      'Comércio de veículos automotores',
      'Serviços de marketing e publicidade',
      'Fabricação de produtos diversos',
      'Serviços de logística e transporte',
      'Comércio eletrônico',
    ];

    return atividades[Math.floor(Math.random() * atividades.length)];
  }

  getDados(): DadosEmpresa {
    return this.dados;
  }

  getRazaoSocial(): string {
    return this.dados.razaoSocial;
  }

  getNomeFantasia(): string {
    return this.dados.nomeFantasia;
  }

  getCnpj(): string {
    return this.dados.cnpj;
  }

  getEndereco(): EnderecoEmpresa {
    return this.dados.endereco;
  }

  getEnderecoCompleto(): string {
    const { logradouro, numero, complemento, bairro, cidade, estado, cep } =
      this.dados.endereco;
    const comp = complemento ? `, ${complemento}` : '';
    return `${logradouro}, ${numero}${comp}, ${bairro}, ${cidade} - ${estado}, CEP: ${cep}`;
  }
}
