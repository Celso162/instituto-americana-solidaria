import {
  templateInicio,
  templateProjetos,
  templateCadastro,
  templateContato
} from './templates.js';
import {
  recuperarTema,
  salvarTema,
  recuperarUltimaRota,
  salvarUltimaRota,
  salvarResumoCadastro
} from './storage.js';
import { configurarEventos } from './eventos.js';

const app = document.getElementById('app');
const regiaoStatus = document.getElementById('regiao-status');
const modal = document.getElementById('modal-confirmacao');
const confirmarCadastro = document.getElementById('confirmar-cadastro');

const rotas = {
  inicio: templateInicio,
  projetos: templateProjetos,
  cadastro: templateCadastro,
  contato: templateContato
};

let cadastroPendente = null;
let formularioPendente = null;
let elementoAntesDoModal = null;

function rotaDaURL() {
  const rota = location.hash.replace('#', '').trim();
  return rotas[rota] ? rota : null;
}

function atualizarNav(rota) {
  document.querySelectorAll('[data-rota]').forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) return;
    const atual = link.dataset.rota === rota;
    if (atual) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function focarTituloDaPagina() {
  const titulo = app.querySelector('h1');
  if (!titulo) return;
  titulo.setAttribute('tabindex', '-1');
  titulo.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderizarRota(rota) {
  const rotaSegura = rotas[rota] ? rota : 'inicio';
  app.innerHTML = rotas[rotaSegura]();
  atualizarNav(rotaSegura);
  salvarUltimaRota(rotaSegura);
  focarTituloDaPagina();
}

export function navegarPara(rota, { adicionarHistorico = true } = {}) {
  const rotaSegura = rotas[rota] ? rota : 'inicio';

  if (adicionarHistorico) {
    const url = new URL(window.location.href);
    url.hash = rotaSegura;
    history.pushState({ rota: rotaSegura }, '', url);
  }

  renderizarRota(rotaSegura);
}

function aplicarTema(tema) {
  document.documentElement.dataset.theme = tema;
  const botao = document.getElementById('alternar-tema');
  if (!botao) return;

  const escuro = tema === 'dark';
  botao.setAttribute('aria-pressed', String(escuro));
  botao.querySelector('.texto-tema').textContent = escuro ? 'Claro' : 'Escuro';
}

export function alternarTema() {
  const atual = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const proximo = atual === 'dark' ? 'light' : 'dark';
  aplicarTema(proximo);
  salvarTema(proximo);
  regiaoStatus.textContent = `Tema ${proximo === 'dark' ? 'escuro' : 'claro'} ativado.`;
}

function inicializarTema() {
  const salvo = recuperarTema();
  const prefereEscuro = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  aplicarTema(salvo ?? (prefereEscuro ? 'dark' : 'light'));
}

function mostrarToast(mensagem) {
  const existente = document.querySelector('.toast');
  existente?.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `<strong>Cadastro enviado!</strong><br>${mensagem}`;
  document.body.append(toast);

  setTimeout(() => toast.remove(), 4500);
}

function mostrarFeedbackSucesso() {
  const mensagem = 'Recebemos seus dados com sucesso.';
  regiaoStatus.textContent = mensagem;

  if (window.Swal?.fire) {
    window.Swal.fire({
      icon: 'success',
      title: 'Cadastro enviado!',
      text: mensagem,
      confirmButtonText: 'OK',
      confirmButtonColor: '#0B4F6C'
    });
  } else {
    mostrarToast(mensagem);
  }
}

export function abrirConfirmacao(dados, formulario) {
  cadastroPendente = dados;
  formularioPendente = formulario;
  elementoAntesDoModal = document.activeElement;

  if (typeof modal?.showModal === 'function') {
    modal.showModal();
    confirmarCadastro?.focus();
  } else {
    concluirCadastro();
  }
}

function concluirCadastro() {
  if (!cadastroPendente || !formularioPendente) return;

  salvarResumoCadastro(cadastroPendente);
  formularioPendente.reset();
  formularioPendente.querySelectorAll('.campo-valido, .campo-invalido').forEach((campo) => {
    campo.classList.remove('campo-valido', 'campo-invalido');
    campo.removeAttribute('aria-invalid');
  });

  modal?.close();
  cadastroPendente = null;
  formularioPendente = null;

  mostrarFeedbackSucesso();
  elementoAntesDoModal?.focus?.();
}

confirmarCadastro?.addEventListener('click', concluirCadastro);

modal?.addEventListener('close', () => {
  cadastroPendente = null;
  formularioPendente = null;
  elementoAntesDoModal?.focus?.();
});

window.addEventListener('popstate', (event) => {
  const rota = event.state?.rota ?? rotaDaURL() ?? 'inicio';
  renderizarRota(rota);
});

function inicializar() {
  inicializarTema();
  configurarEventos({ navegarPara, abrirConfirmacao, alternarTema });

  const inicial = rotaDaURL() ?? recuperarUltimaRota() ?? 'inicio';
  if (!location.hash) {
    const url = new URL(window.location.href);
    url.hash = inicial;
    history.replaceState({ rota: inicial }, '', url);
  }

  renderizarRota(inicial);
}

inicializar();
