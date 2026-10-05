const PREFIXO = 'ias:';
const CHAVE_TEMA = `${PREFIXO}tema`;
const CHAVE_ROTA = `${PREFIXO}ultima-rota`;
const CHAVE_CADASTROS = `${PREFIXO}cadastros-resumo`;

function lerJSON(chave, valorPadrao) {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : valorPadrao;
  } catch (erro) {
    console.warn(`Não foi possível ler ${chave} do localStorage.`, erro);
    return valorPadrao;
  }
}

function escreverJSON(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch (erro) {
    console.warn(`Não foi possível guardar ${chave} no localStorage.`, erro);
    return false;
  }
}

export function salvarTema(tema) {
  localStorage.setItem(CHAVE_TEMA, tema);
}

export function recuperarTema() {
  return localStorage.getItem(CHAVE_TEMA);
}

export function salvarUltimaRota(rota) {
  localStorage.setItem(CHAVE_ROTA, rota);
}

export function recuperarUltimaRota() {
  return localStorage.getItem(CHAVE_ROTA);
}

export function salvarResumoCadastro(dados) {
  const atuais = lerJSON(CHAVE_CADASTROS, []);

  // Por segurança, o exemplo não persiste CPF, telefone, e-mail ou endereço.
  const resumo = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    interesse: dados.interesse,
    cidade: dados.cidade,
    estado: dados.estado,
    criadoEm: new Date().toISOString()
  };

  atuais.push(resumo);
  return escreverJSON(CHAVE_CADASTROS, atuais);
}

export function recuperarResumosCadastro() {
  return lerJSON(CHAVE_CADASTROS, []);
}
