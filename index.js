var jogadores = []

function gerarNumerosAleatorios(quantidade, min, max){

    if(quantidade > (max - min)){
        console.log("Intervalo insuficiente ...");
        return;
    }

    var numeros = [];

    while(numeros.length < quantidade){
        var aleatorio = Math.floor(Math.random()*(max - min) + min);
        
        if(!numeros.includes(aleatorio)){
            numeros.push(aleatorio);
        }
    }

    return numeros;

}

function gerarCartela(){
    var nomeJogador = prompt('Digite o nome do jogador');

    var cartela = [gerarNumerosAleatorios(5,1,15), gerarNumerosAleatorios(5,16,30), gerarNumerosAleatorios(5,31,45),gerarNumerosAleatorios(5,46,60), gerarNumerosAleatorios(5,61,75)]

    jogadores.push({
        nomeJogador: nomeJogador,
        cartela: cartela
    });

    desenharCartela(nomeJogador, cartela);

    console.log(jogadores)
}

function reiniciarJogo(){
    // Selecione a div pelo ID (substitua "minha-div" pelo ID correto)
    var div = document.getElementById("espaco_cartelas");

    // Atribua um valor vazio à propriedade innerHTML da div
    div.innerHTML = '';

    jogadores = []
}

function desenharCartela(nome, cartela){
    var div = document.getElementById('espaco_cartelas');

    var divTabela = document.createElement('div');
    divTabela.classList.add('divTabela');

    var h3_nome = document.createElement('h3')
    h3_nome.innerText = nome;

    divTabela.appendChild(h3_nome);

    var tabela = document.createElement('table');

    var thead = document.createElement('thead');

    var thB = document.createElement('th');
    thB.innerText = 'B';
    var thI = document.createElement('th');
    thI.innerText = 'I';
    var thN = document.createElement('th');
    thN.innerText = 'N';
    var thG = document.createElement('th');
    thG.innerText = 'G';
    var thO = document.createElement('th');
    thO.innerText = 'O';

    thead.appendChild(thB)
    thead.appendChild(thI)
    thead.appendChild(thN)
    thead.appendChild(thG)
    thead.appendChild(thO)

    for(var i = 0; i < 5; i++){
        var tr = document.createElement('tr');
        for(var j = 0; j < 5; j++){
            var td = document.createElement('td');
            if(i == 2 && j == 2){
                td.innerText = "X";
                tr.appendChild(td);
            }else{
                td.innerText = cartela[j][i]
                tr.appendChild(td);
            }
        }
        tabela.appendChild(tr)
    }

    tabela.appendChild(thead);
    divTabela.appendChild(tabela);
    div.appendChild(divTabela)
}

function jogar() {
    if (jogadores.length < 2) {
        alert('Não é possível jogar sem jogadores');
        return;
    }

    let numeros_sorteados = [];
    let intervalo = setInterval(function () {
        let aleatorio;
        do {
            aleatorio = Math.floor(Math.random() * 75 + 1);
        } while (numeros_sorteados.includes(aleatorio));

        numeros_sorteados.push(aleatorio);
        var div_numeros = document.getElementById('jogo');
        var span = document.createElement('span');
        span.innerText = aleatorio;
        div_numeros.appendChild(span);

        if (verificarGanhador(numeros_sorteados)) {
            clearInterval(intervalo);
        }
    }, 300);
}


function verificarGanhador(numeros_sorteados) {
    let ganhadorEncontrado = false;
  
    jogadores.forEach(function (jogador) {
      let quantidade = 0;
  
      jogador.cartela.forEach(function (coluna, i) {
        coluna.forEach(function (numero, j) {
          if (numeros_sorteados.includes(numero)) {
            let td = document
              .querySelectorAll('.divTabela')
              [jogadores.indexOf(jogador)].querySelectorAll('td');
            td.forEach(function (element) {
              if (element.innerText === numero.toString()) {
                element.style.backgroundColor = 'green';
                quantidade++;
                if (quantidade === 24) {
                  ganhadorEncontrado = true;
                  setTimeout(function () {
                    alert('O jogador vencedor é: ' + jogador.nomeJogador);
                  }, 500);
                }
              }
            });
          }
        });
      });
    });
  
    return ganhadorEncontrado;
  }
  