let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// criar função para selecionar <tag>, modifica-la e exibi-la
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //faz o programa ler para o usuário em portugues com voz feminina numa velocidade 1.2x
}

function exibirMensagemInicial() {
    exibirTextoNaTela ('h1', 'Jodo do número secreto!');
    exibirTextoNaTela ('p', 'Escolha um número entre 1 e 10: ');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value; //vai pegar APENAS o valor no 'input'

    // vai fazer a comparação do chute com o numero secreto dentro da função que pegou e armazenou o numero secreto
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

//função para gerar número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) { //vai limpar a lista de numeros sorteados para sortear novamente
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //verifica se o numero escolhido está na lista de numeros sorteados
        return gerarNumeroAleatorio(); //um novo numero sera gerado se numero escolhido ja estiver na lista
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//função para limpar o campo "chute" se você não acertou o numero
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}