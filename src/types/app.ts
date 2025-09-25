import React from 'react';

export type Section =
  | 'cep'
  | 'cnpj'
  | 'feriados'
  | 'registro-br'
  | 'cambio'
  | 'cpf-validator'
  | 'cnpj-validator'
  | 'password-validator'
  | 'uuid-validator'
  | 'credit-card-validator'
  | 'personal-document-validator'
  | 'global-document-validator'
  | 'cpf-generator'
  | 'cnpj-generator'
  | 'cep-generator'
  | 'password-generator'
  | 'uuid-generator'
  | 'credit-card-generator'
  | 'fake-company-generator'
  | 'lorem-ipsum-generator'
  | 'hash-generator'
  | 'personal-document-generator'
  | 'vehicle-document-generator'
  | 'fiscal-document-generator'
  | 'global-document-generator'
  | 'text-deduplicator'
  | 'json-formatter'
  | 'text-sorter'
  | 'base64'
  | 'regex-tester'
  | 'case-converter'
  | 'text-counter'
  | 'number-converter'
  | 'cron-generator';

import React from 'react';

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
