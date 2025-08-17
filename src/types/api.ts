export type CepData = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: {
    type: string;
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
};

export type CnpjData = {
  uf: string;
  cep: string;
  qsa: any[] | null;
  cnpj: string;
  pais: string | null;
  email: string | null;
  porte: string;
  bairro: string;
  numero: string;
  ddd_fax: string;
  municipio: string;
  logradouro: string;
  cnae_fiscal: number;
  codigo_pais: string | null;
  complemento: string;
  codigo_porte: number;
  razao_social: string;
  nome_fantasia: string;
  capital_social: number;
  ddd_telefone_1: string;
  ddd_telefone_2: string;
  opcao_pelo_mei: boolean;
  codigo_municipio: number;
  cnaes_secundarios: Array<{
    codigo: number;
    descricao: string;
  }>;
  natureza_juridica: string;
  regime_tributario: string | null;
  situacao_especial: string;
  opcao_pelo_simples: boolean;
  situacao_cadastral: number;
  data_opcao_pelo_mei: string;
  data_exclusao_do_mei: string;
  cnae_fiscal_descricao: string;
  codigo_municipio_ibge: number;
  data_inicio_atividade: string;
  data_situacao_especial: string | null;
  data_opcao_pelo_simples: string;
  data_situacao_cadastral: string;
  nome_cidade_no_exterior: string;
  codigo_natureza_juridica: number;
  data_exclusao_do_simples: string;
  motivo_situacao_cadastral: number;
  ente_federativo_responsavel: string;
  identificador_matriz_filial: number;
  qualificacao_do_responsavel: number;
  descricao_situacao_cadastral: string;
  descricao_tipo_de_logradouro: string;
  descricao_motivo_situacao_cadastral: string;
  descricao_identificador_matriz_filial: string;
};

export type DominioInfo = {
  status: string;
  fqdn: string;
  hosts: string[];
  ['expires-at']: string;
  created: string;
  updated: string;
  nameservers: string[];
  status_code: number;
};

export type Feriado = {
  date: string;
  name: string;
  type: string;
};

export type CambioData = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

export interface CepApi {
  searchCep(cep: string): Promise<CepData>;
}

export interface CnpjApi {
  searchCnpj(cnpj: string): Promise<CnpjData>;
}

export interface DominiosApi {
  searchDomain(domain: string): Promise<DominioInfo>;
}

export interface FeriadosApi {
  getFeriados(year: number): Promise<Feriado[]>;
}

export interface CambioApi {
  getCambio(): Promise<CambioData[]>;
}
