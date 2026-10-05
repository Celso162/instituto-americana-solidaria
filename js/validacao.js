function somenteDigitos(valor) {
  return valor.replace(/\D/g, '');
}

export function aplicarMascara(campo) {
  const nome = campo.name;
  const digitos = somenteDigitos(campo.value);

  if (nome === 'cpf') {
    campo.value = digitos
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  if (nome === 'telefone') {
    const limitado = digitos.slice(0, 11);
    campo.value = limitado
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{4})$/, '$1-$2');
  }

  if (nome === 'cep') {
    campo.value = digitos
      .slice(0, 8)
      .replace(/(\d{5})(\d{1,3})$/, '$1-$2');
  }
}

function mensagemDeErro(campo) {
  if (campo.validity.valueMissing) return 'Este campo é obrigatório.';
  if (campo.validity.typeMismatch) return 'Informe um valor no formato esperado.';
  if (campo.validity.patternMismatch) return 'O valor não corresponde ao formato solicitado.';
  if (campo.validity.tooShort) return `Digite pelo menos ${campo.minLength} caracteres.`;
  return 'Verifique este campo.';
}

export function validarCampo(campo, exibirMensagem = true) {
  if (!(campo instanceof HTMLInputElement || campo instanceof HTMLSelectElement || campo instanceof HTMLTextAreaElement)) {
    return true;
  }

  const erro = document.getElementById(`${campo.id}-erro`);
  const valido = campo.checkValidity();

  campo.classList.toggle('campo-valido', valido && campo.value.trim() !== '');
  campo.classList.toggle('campo-invalido', !valido);
  campo.setAttribute('aria-invalid', String(!valido));

  if (erro && exibirMensagem) {
    erro.textContent = valido ? '' : mensagemDeErro(campo);
  }

  return valido;
}

export function validarFormulario(formulario) {
  const campos = [...formulario.querySelectorAll('input, select, textarea')]
    .filter((campo) => campo.required);

  let primeiroInvalido = null;
  let valido = true;

  for (const campo of campos) {
    const campoValido = validarCampo(campo, true);
    if (!campoValido && !primeiroInvalido) primeiroInvalido = campo;
    valido = campoValido && valido;
  }

  if (!valido) primeiroInvalido?.focus();
  return valido;
}
