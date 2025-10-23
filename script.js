const temas = {
  "Filmes mais assistidos": ["Avatar", "Titanic", "Vingadores", "Frozen", "Jurassic Park"],
  "Músicas mais ouvidas": ["Shape of You", "Blinding Lights", "Despacito", "Uptown Funk", "Closer"],
  "Times mais valiosos": ["Real Madrid", "Barcelona", "Manchester United", "Liverpool", "PSG"]
};

let temasRestantes = Object.keys(temas);
let temaAtual = "";
let jogadorAtual = 1;
let pontuacao = {1: 0, 2: 0};
let tentativas = 0;

function escolherTema() {
  if (temasRestantes.length === 0) {
    document.getElementById("tema").textContent = "🎉 Fim do jogo!";
    return;
  }
  temaAtual = temasRestantes.shift();
  document.getElementById("tema").textContent = `Tema atual: ${temaAtual}`;
}

function enviarResposta() {
  const resposta = document.getElementById("resposta").value.trim();
  if (!resposta) return;

  const lista = temas[temaAtual].map(n => n.toLowerCase());
  const index = lista.indexOf(resposta.toLowerCase());
  const resultado = document.getElementById("resultado");

  if (index !== -1) {
    let pontos = index === 0 ? 3 : index < 3 ? 2 : 1;
    pontuacao[jogadorAtual] += pontos;
    resultado.textContent = `✅ Acertou! +${pontos} pontos`;
  } else {
    resultado.textContent = "❌ Errou!";
  }

  document.getElementById(`p${jogadorAtual}`).textContent = pontuacao[jogadorAtual];
  document.getElementById("resposta").value = "";
  
  tentativas++;
  if (tentativas === 3) {
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    document.getElementById("jogador").textContent = jogadorAtual;
    tentativas = 0;
  }
}

function proximoTema() {
  escolherTema();
  document.getElementById("resultado").textContent = "";
}

escolherTema();
