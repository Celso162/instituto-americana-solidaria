# Instituto Americana Solidária

Aplicação front-end acadêmica desenvolvida para consolidar HTML5 semântico, CSS responsivo, JavaScript modular, SPA, acessibilidade, versionamento e preparação para produção.

## Tecnologias

- HTML5
- CSS3
- JavaScript ES Modules
- LocalStorage
- SweetAlert2
- Git e GitHub
- Vite

## Execução local

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

- `index.html`: base da SPA
- `css/`: reset e estilos do design system
- `js/`: templates, eventos, validação, armazenamento e inicialização
- `imagens/`: recursos visuais do projeto

## Acessibilidade

O projeto utiliza HTML semântico, navegação por teclado, foco visível, textos alternativos, rótulos associados aos formulários, ARIA em componentes interativos, contraste adequado e suporte a `prefers-reduced-motion`.


## Acessibilidade

O projeto foi desenvolvido considerando as diretrizes WCAG 2.1 nível AA.

Foram aplicadas práticas como:

- estrutura semântica com header, nav, main e footer;
- navegação por teclado;
- estados de foco visíveis;
- associação correta entre labels e campos de formulário;
- textos alternativos em imagens;
- uso de aria-label, aria-expanded e aria-controls;
- contraste adequado entre texto e fundo;
- suporte a leitores de tela;
- preferência por redução de movimento quando aplicável.

## Fluxo de versionamento

O projeto utiliza Git e GitHub seguindo uma estratégia baseada em GitFlow.

- main: versão estável e pronta para produção;
- develop: integração das alterações em desenvolvimento;
- feature/*: desenvolvimento de novas funcionalidades;
- hotfix/*: correções urgentes em produção.

As mensagens de commit seguem o padrão Conventional Commits para manter o histórico claro e organizado.
