
const emojis = [
    "🐶", "🐱", "🦊", "🐼", "🦁",
    "🐸", "🐵", "🐧", "🦄", "🐙"
];

let cartas = [];
let primeira = null;
let segunda = null;
let jogador = 1;
let pontos = [0, 0];
let jogadas = 0;
let pares = 0;
let bloqueado = false;

function criarJogo() {
    const tabuleiro = document.getElementById("tabuleiro");

    cartas = [...emojis, ...emojis]
        .sort(() => Math.random() - 0.5);

    tabuleiro.innerHTML = "";

    cartas.forEach((emoji, indice) => {
        const carta = document.createElement("button");

        carta.className = "carta";
        carta.textContent = "?";

        carta.onclick = () => virarCarta(carta, emoji);

        tabuleiro.appendChild(carta);
    });
}

function virarCarta(carta, emoji) {
    if (
        bloqueado ||
        carta.classList.contains("aberta") ||
        carta.classList.contains("acertada")
    ) {
        return;
    }

    carta.textContent = emoji;
    carta.classList.add("aberta");

    if (primeira === null) {
        primeira = { carta, emoji };
        return;
    }

    segunda = { carta, emoji };

    jogadas++;
    document.getElementById("jogadas").textContent = jogadas;

    if (primeira.emoji === segunda.emoji) {

        primeira.carta.classList.add("acertada");
        segunda.carta.classList.add("acertada");

        pontos[jogador - 1]++;
        pares++;

        atualizarPlacar();

        document.getElementById("mensagem").textContent =
            "🎉 Par encontrado! Você joga novamente.";

        limparSelecao();

        if (pares === 10) {
            finalizarJogo();
        }

    } else {

        bloqueado = true;

        document.getElementById("mensagem").textContent =
            "Não encontrou! A vez vai passar.";

        setTimeout(() => {

            primeira.carta.textContent = "?";
            segunda.carta.textContent = "?";

            primeira.carta.classList.remove("aberta");
            segunda.carta.classList.remove("aberta");

            jogador = jogador === 1 ? 2 : 1;

            limparSelecao();
            atualizarPlacar();

        }, 1000);
    }
}

function limparSelecao() {
    primeira = null;
    segunda = null;
    bloqueado = false;
}

function atualizarPlacar() {
    document.getElementById("pontos1").textContent = pontos[0];
    document.getElementById("pontos2").textContent = pontos[1];

    const nome = document.getElementById(
        jogador === 1 ? "nome1" : "nome2"
    ).value || `Jogador ${jogador}`;

    document.getElementById("vez").textContent =
        "Vez de: " + nome;
}

function finalizarJogo() {
    const nome1 = document.getElementById("nome1").value || "Jogador 1";
    const nome2 = document.getElementById("nome2").value || "Jogador 2";

    let resultado;

    if (pontos[0] > pontos[1]) {
        resultado = "🏆 " + nome1 + " venceu!";
    } else if (pontos[1] > pontos[0]) {
        resultado = "🏆 " + nome2 + " venceu!";
    } else {
        resultado = "🤝 Empate!";
    }

    document.getElementById("mensagem").textContent =
        resultado + " Placar: " + pontos[0] + " x " + pontos[1];

    document.getElementById("vez").textContent =
        "Partida encerrada!";
}

function reiniciar() {
    pontos = [0, 0];
    jogador = 1;
    jogadas = 0;
    pares = 0;
    primeira = null;
    segunda = null;
    bloqueado = false;

    document.getElementById("jogadas").textContent = "0";
    document.getElementById("mensagem").textContent =
        "Encontre os pares!";

    atualizarPlacar();
    criarJogo();
}

criarJogo();
atualizarPlacar();
