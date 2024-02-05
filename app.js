//Forma de inserir um texto, seja um paragrafo ou o que for, no html através do JS.
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número Secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function trocarImagem() {
    let imagemPensando = document.getElementById("imagem-pensando");
    let imagemJoinha = document.getElementById("imagem-joinha");

    if (imagemPensando.style.display === "block") {
        imagemPensando.style.display = "none";
        imagemJoinha.style.display = "block";
    } else {
        imagemPensando.style.display = "block";
        imagemJoinha.style.display = "none";
    }

}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.1 });
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

exibirMensagemInicial();

//É de boa prática sempre criar um nome descritivo para a função.
//E é necessario referenciar da mesma forma que está no código HTML.
//Usa-se o return quando é preciso retornar um valor gerado na função e atribui-lo a algo/variavel.
//No caso de um campo input onde se planeja pegar o valor do campo, é necessario o ".value" ao final da do código.
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        trocarImagem();
        exibirTextoNaTela('h1', 'Meus parabéns você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}.`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}.`);
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').addEventListener('click', trocarImagem());
    document.getElementById('reiniciar').setAttribute('disabled', true);
}



