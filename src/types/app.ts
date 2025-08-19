export type Section =
  | 'cep'
  | 'cnpj'
  | 'feriados'
  | 'registro-br'
  | 'cambio'
  | 'cpf-validator'
  | 'cnpj-validator'
  | 'password-validator'
  | 'cpf-generator'
  | 'cnpj-generator'
  | 'cep-generator'
  | 'password-generator'
  | 'uuid-generator'
  | 'text-deduplicator'
  | 'json-formatter';

export type AppState = {
  activeSection: Section;
  sidebarOpen: boolean;
};

export type SectionComponent = {
  [key: string]: React.ComponentType;
};

export type NavigationItem = {
  id: Section;
  label: string;
  icon: string;
  category: 'searchers' | 'validators' | 'generators';
  description?: string;
};

export type AppConfig = {
  title: string;
  version: string;
  description: string;
  author: string;
  repository: string;
};
