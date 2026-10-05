const projetos = [
  {
    titulo: 'Educação que Transforma',
    descricao: 'Apoio educacional e incentivo à leitura para crianças e adolescentes de Americana.',
    categoria: 'Educação'
  },
  {
    titulo: 'Rede de Apoio Solidário',
    descricao: 'Campanhas de arrecadação de alimentos, roupas e itens de higiene para famílias em vulnerabilidade.',
    categoria: 'Assistência social'
  },
  {
    titulo: 'Comunidade em Movimento',
    descricao: 'Ações de voluntariado, oficinas e mobilização comunitária para fortalecer vínculos locais.',
    categoria: 'Voluntariado'
  }
];

function gerarCardsProjetos() {
  return projetos.map((projeto) => `
    <article class="card-projeto">
      <span class="badge">${projeto.categoria}</span>
      <h2>${projeto.titulo}</h2>
      <p>${projeto.descricao}</p>
      <div class="acoes-card">
        <a class="botao" href="#cadastro" data-rota="cadastro">Quero participar</a>
      </div>
    </article>
  `).join('');
}

export function templateInicio() {
  return `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-conteudo">
          <h1>Juntos por uma Americana mais solidária</h1>
          <p class="hero-subtitulo">
            Projetos sociais, voluntariado e apoio comunitário para ampliar oportunidades em Americana/SP.
          </p>
          <div class="acoes-hero">
            <a class="botao" href="#projetos" data-rota="projetos">Conhecer projetos</a>
            <a class="botao botao-secundario" href="#cadastro" data-rota="cadastro">Seja voluntário</a>
          </div>
        </div>
        <div class="hero-imagem">
          <img
            src="./imagens/voluntarios.jpg"
            alt="Voluntários do Instituto Americana Solidária reunidos durante uma ação comunitária"
            width="1200"
            height="675"
            fetchpriority="high"
          >
        </div>
      </div>
    </section>

    <section class="secao">
      <div class="container grid-12">
        <article class="painel coluna-6">
          <h2>Quem somos</h2>
          <p>
            O Instituto Americana Solidária é uma organização sem fins lucrativos dedicada a apoiar pessoas e famílias em situação de vulnerabilidade e a estimular a participação voluntária.
          </p>
        </article>
        <article class="painel coluna-6">
          <h2>Nossa missão</h2>
          <p>
            Promover solidariedade, inclusão social e melhoria da qualidade de vida por meio de projetos que fortaleçam a comunidade de Americana.
          </p>
        </article>
      </div>
    </section>
  `;
}

export function templateProjetos() {
  return `
    <section class="secao">
      <div class="container">
        <h1>Projetos sociais</h1>
        <p>Conheça algumas iniciativas e descubra como fazer parte.</p>

        <img
          class="imagem-destaque"
          src="./imagens/projetos.jpg"
          alt="Voluntária auxiliando uma criança em atividade educativa"
          width="1200"
          height="675"
          loading="lazy"
        >

        <div class="grid-12 cards-projetos" id="lista-projetos">
          ${gerarCardsProjetos()}
        </div>
      </div>
    </section>
  `;
}

export function templateCadastro() {
  return `
    <section class="secao">
      <div class="container grid-12">
        <div class="coluna-6">
          <h1>Seja voluntário</h1>
          <p>Preencha o formulário para demonstrar interesse em participar das ações do Instituto.</p>
          <img
            class="imagem-destaque"
            src="./imagens/apoio.jpg"
            alt="Mãos formando um coração, representando solidariedade e apoio"
            width="1200"
            height="675"
            loading="lazy"
          >
        </div>

        <div class="painel coluna-6">
          <form id="form-cadastro" class="formulario" action="#" method="post">
            <fieldset>
              <legend>Dados pessoais</legend>

              <div class="grupo-campo">
                <label for="nome">Nome completo</label>
                <input id="nome" name="nome" type="text" autocomplete="name" minlength="3" required aria-describedby="nome-erro">
                <span id="nome-erro" class="erro-campo" aria-live="polite"></span>
              </div>

              <div class="grupo-campo">
                <label for="cpf">CPF</label>
                <input id="cpf" name="cpf" type="text" inputmode="numeric" placeholder="000.000.000-00" pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}" maxlength="14" required aria-describedby="cpf-ajuda cpf-erro">
                <small id="cpf-ajuda" class="ajuda-campo">Formato: 000.000.000-00</small>
                <span id="cpf-erro" class="erro-campo" aria-live="polite"></span>
              </div>

              <div class="grupo-campo">
                <label for="nascimento">Data de nascimento</label>
                <input id="nascimento" name="nascimento" type="date" required aria-describedby="nascimento-erro">
                <span id="nascimento-erro" class="erro-campo" aria-live="polite"></span>
              </div>

              <div class="grupo-campo">
                <label for="email">E-mail</label>
                <input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-erro">
                <span id="email-erro" class="erro-campo" aria-live="polite"></span>
              </div>

              <div class="grupo-campo">
                <label for="telefone">Telefone</label>
                <input id="telefone" name="telefone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(19) 99999-9999" pattern="\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}" maxlength="15" required aria-describedby="telefone-ajuda telefone-erro">
                <small id="telefone-ajuda" class="ajuda-campo">Formato: (19) 99999-9999</small>
                <span id="telefone-erro" class="erro-campo" aria-live="polite"></span>
              </div>
            </fieldset>

            <fieldset>
              <legend>Endereço</legend>

              <div class="grupo-campo">
                <label for="cep">CEP</label>
                <input id="cep" name="cep" type="text" inputmode="numeric" autocomplete="postal-code" placeholder="00000-000" pattern="[0-9]{5}-[0-9]{3}" maxlength="9" required aria-describedby="cep-ajuda cep-erro">
                <small id="cep-ajuda" class="ajuda-campo">Formato: 00000-000</small>
                <span id="cep-erro" class="erro-campo" aria-live="polite"></span>
              </div>

              <div class="grupo-campo">
                <label for="endereco">Endereço</label>
                <input id="endereco" name="endereco" type="text" autocomplete="address-line1" required aria-describedby="endereco-erro">
                <span id="endereco-erro" class="erro-campo" aria-live="polite"></span>
              </div>

              <div class="grupo-campo">
                <label for="cidade">Cidade</label>
                <input id="cidade" name="cidade" type="text" autocomplete="address-level2" value="Americana" required aria-describedby="cidade-erro">
                <span id="cidade-erro" class="erro-campo" aria-live="polite"></span>
              </div>

              <div class="grupo-campo">
                <label for="estado">Estado</label>
                <select id="estado" name="estado" autocomplete="address-level1" required aria-describedby="estado-erro">
                  <option value="">Selecione</option>
                  <option value="SP">São Paulo</option>
                </select>
                <span id="estado-erro" class="erro-campo" aria-live="polite"></span>
              </div>
            </fieldset>

            <fieldset>
              <legend>Interesse em participar</legend>

              <div class="grupo-campo">
                <label for="interesse">Como gostaria de contribuir?</label>
                <select id="interesse" name="interesse" required aria-describedby="interesse-erro">
                  <option value="">Selecione</option>
                  <option value="voluntariado">Trabalho voluntário</option>
                  <option value="doacao">Doações</option>
                  <option value="parceria">Parcerias</option>
                </select>
                <span id="interesse-erro" class="erro-campo" aria-live="polite"></span>
              </div>

              <div class="grupo-campo">
                <label for="mensagem">Mensagem (opcional)</label>
                <textarea id="mensagem" name="mensagem" rows="5"></textarea>
              </div>
            </fieldset>

            <div class="acoes-formulario">
              <button class="botao" type="submit">Enviar cadastro</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function templateContato() {
  return `
    <section class="secao">
      <div class="container grid-12">
        <article class="painel coluna-6">
          <h1>Contato</h1>
          <address>
            <p><strong>Cidade:</strong> Americana/SP</p>
            <p><strong>E-mail:</strong> <a href="mailto:contato@americanasolidaria.org.br">contato@americanasolidaria.org.br</a></p>
            <p><strong>Telefone:</strong> <a href="tel:+5519999999999">(19) 99999-9999</a></p>
          </address>
        </article>

        <article class="painel coluna-6">
          <h2>Como ajudar</h2>
          <ul class="lista-beneficios">
            <li>Participe como voluntário.</li>
            <li>Doe alimentos, roupas ou materiais.</li>
            <li>Divulgue nossos projetos.</li>
            <li>Construa parcerias com a instituição.</li>
          </ul>
          <div class="acoes-card">
            <a class="botao" href="#cadastro" data-rota="cadastro">Quero participar</a>
          </div>
        </article>
      </div>
    </section>
  `;
}
