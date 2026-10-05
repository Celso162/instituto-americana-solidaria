import { aplicarMascara, validarCampo, validarFormulario } from './validacao.js';

function fecharMenuMobile() {
  const menu = document.getElementById('menu-principal');
  const botao = document.getElementById('menu-toggle');
  if (!menu || !botao) return;

  menu.classList.remove('ativo');
  botao.setAttribute('aria-expanded', 'false');
  botao.setAttribute('aria-label', 'Abrir menu de navegação');
}

function alternarMenuMobile() {
  const menu = document.getElementById('menu-principal');
  const botao = document.getElementById('menu-toggle');
  if (!menu || !botao) return;

  const aberto = botao.getAttribute('aria-expanded') === 'true';
  botao.setAttribute('aria-expanded', String(!aberto));
  botao.setAttribute('aria-label', aberto ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
  menu.classList.toggle('ativo', !aberto);
}

export function configurarEventos({ navegarPara, abrirConfirmacao, alternarTema }) {
  document.addEventListener('click', (event) => {
    const linkRota = event.target.closest('[data-rota]');

    if (linkRota) {
      event.preventDefault();
      navegarPara(linkRota.dataset.rota, { adicionarHistorico: true });
      fecharMenuMobile();
      return;
    }

    if (event.target.closest('#menu-toggle')) {
      alternarMenuMobile();
      return;
    }

    if (event.target.closest('#alternar-tema')) {
      alternarTema();
      return;
    }

    if (event.target.closest('[data-modal-fechar]')) {
      document.getElementById('modal-confirmacao')?.close();
    }
  });

  document.addEventListener('submit', (event) => {
    const formulario = event.target;
    if (!(formulario instanceof HTMLFormElement) || formulario.id !== 'form-cadastro') return;

    event.preventDefault();

    if (!validarFormulario(formulario)) {
      document.getElementById('regiao-status').textContent = 'Existem campos que precisam ser corrigidos.';
      return;
    }

    abrirConfirmacao(Object.fromEntries(new FormData(formulario).entries()), formulario);
  });

  document.addEventListener('input', (event) => {
    const campo = event.target;
    if (!(campo instanceof HTMLInputElement || campo instanceof HTMLTextAreaElement)) return;

    if (campo instanceof HTMLInputElement) aplicarMascara(campo);
    if (campo.required) validarCampo(campo, false);
  });

  document.addEventListener('change', (event) => {
    const campo = event.target;
    if (campo instanceof HTMLSelectElement && campo.required) validarCampo(campo, true);
  });

  document.addEventListener('blur', (event) => {
    const campo = event.target;
    if ((campo instanceof HTMLInputElement || campo instanceof HTMLTextAreaElement) && campo.required) {
      validarCampo(campo, true);
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') fecharMenuMobile();
  });
}
