const tamanhoCacaPalavras = 20
let cacaPalavras = []
let cordsJaOcupadas = []
let cacaPalavrasAtualizado = []
const mostradorPalavras = document.getElementById('palavras_lista')
let letrasElementos = []
let listaPalavras = []
// let listaLetrasDiv = []

let segurando = false
let letrasSelecionadas = []

const divPrincipal = document.getElementById('div_principal')
const alfabeto = 'abcdefghijklmnopqrstuvwxyzç'.split('')

function gerarTabuleiro() {
    for (let x = 0; x < tamanhoCacaPalavras; x++) {
        cacaPalavras.push([])
        letrasElementos.push([])
        for (let y = 0; y < tamanhoCacaPalavras; y++) {
            letraAleatoria = alfabeto[Math.floor(Math.random() * alfabeto.length)].toUpperCase()
            cacaPalavras[x].push(letraAleatoria)
        }
    }
}

function gerarPalavra(palavra) {

    let coluna = 0
    let fileira = 0

    let direcao = Math.floor(Math.random() * 4)
    let errado = false
    switch (direcao) {



        case 0:         // cima para baixo
            coluna  = Math.floor(Math.random() * tamanhoCacaPalavras)
            fileira = Math.floor(Math.random() * ((tamanhoCacaPalavras - palavra.length) - 0 + 1));

            for (let i = 0; i < palavra.length; i++) {
                if (cordsJaOcupadas.includes(`${fileira+i},${coluna}`)) {
                    errado = true
                    break;
                }
            }
            if (!errado) {
                let cacaPalavrasAtualizado = structuredClone(cacaPalavras);
                for (let i = 0; i < palavra.length; i++) {
                    cacaPalavrasAtualizado[fileira + i][coluna] = palavra[i];
                    cordsJaOcupadas.push(`${fileira + i},${coluna}`);
                }
                cacaPalavras = cacaPalavrasAtualizado;
                listaPalavras.push(palavra)
                break;
            } else {
                gerarPalavra(palavra)
                break;
            }
            


        case 1:         // esquerda para direita
            fileira  = Math.floor(Math.random() * tamanhoCacaPalavras)
            coluna = Math.floor(Math.random() * ((tamanhoCacaPalavras - palavra.length) - 0 + 1));

            for (let i = 0; i < palavra.length; i++) {
                if (cordsJaOcupadas.includes(`${fileira},${coluna+i}`)) {
                    errado = true
                    break;
                }
            }
            if (!errado) {
                let cacaPalavrasAtualizado = structuredClone(cacaPalavras);
                for (let i = 0; i < palavra.length; i++) {
                    cacaPalavrasAtualizado[fileira][coluna+i] = palavra[i]
                    cordsJaOcupadas.push(`${fileira},${coluna+i}`)
                }
                cacaPalavras = cacaPalavrasAtualizado;
                listaPalavras.push(palavra)
                break;
            } else {
                gerarPalavra(palavra)
                break;
            }



        case 2:         // baixo para cima
            const palavraInvertidaV = inverterString(palavra);
            
            coluna  = Math.floor(Math.random() * tamanhoCacaPalavras);
            fileira = Math.floor(Math.random() * (tamanhoCacaPalavras - palavraInvertidaV.length + 1));

            for (let i = 0; i < palavraInvertidaV.length; i++) {
                if (cordsJaOcupadas.includes(`${fileira+i},${coluna}`)) {
                    errado = true;
                    break;
                }
            }
            if (!errado) {
                let cacaPalavrasAtualizado = structuredClone(cacaPalavras);
                for (let i = 0; i < palavraInvertidaV.length; i++) {
                    cacaPalavrasAtualizado[fileira + i][coluna] = palavraInvertidaV[i];
                    cordsJaOcupadas.push(`${fileira + i},${coluna}`);
                }
                cacaPalavras = cacaPalavrasAtualizado;
                listaPalavras.push(palavra)
                break;
            } else {
                gerarPalavra(palavra);
                break;
            }

        case 3:         // direita para esquerda
            const palavraInvertidaH = inverterString(palavra);
            
            fileira = Math.floor(Math.random() * tamanhoCacaPalavras);
            coluna  = Math.floor(Math.random() * (tamanhoCacaPalavras - palavraInvertidaH.length + 1));

            for (let i = 0; i < palavraInvertidaH.length; i++) {
                if (cordsJaOcupadas.includes(`${fileira},${coluna+i}`)) {
                    errado = true;
                    break;
                }
            }
            if (!errado) {
                let cacaPalavrasAtualizado = structuredClone(cacaPalavras);
                for (let i = 0; i < palavraInvertidaH.length; i++) {
                    cacaPalavrasAtualizado[fileira][coluna+i] = palavraInvertidaH[i];
                    cordsJaOcupadas.push(`${fileira},${coluna+i}`);
                }
                cacaPalavras = cacaPalavrasAtualizado;
                listaPalavras.push(palavra)
                break;
            } else {
                gerarPalavra(palavra);
                break;
            }

    }
}


function mostrarLetras() {
     for (let y = 0; y < cacaPalavras.length; y++) {
        const linha = document.createElement('div')
        linha.classList.add('div_linha')
        linha.style.gridTemplateColumns = `repeat(${tamanhoCacaPalavras}, 1fr)`
        divPrincipal.append(linha)
        for (let x = 0; x < tamanhoCacaPalavras; x++) {
            const letra = document.createElement('div')
            letra.textContent = cacaPalavras[y][x]
            letra.classList.add('div_letra')
            linha.append(letra)
            letrasElementos[y].push(letra)
            // listaLetrasDiv.push(letra)

            letra.addEventListener('mousedown', function() {
                segurando = true
            });

            letra.addEventListener('mouseenter', function() {
                if (segurando) { 
                    let letraSerAdicionada = {}
                    let direcaoSelecao = ''

                    if (letrasSelecionadas[0] && letrasSelecionadas[1]) {
                        
                        if (letrasSelecionadas[0]['y'] === letrasSelecionadas[1]['y']) direcaoSelecao = 'y'
                        if (letrasSelecionadas[0]['x'] === letrasSelecionadas[1]['x']) direcaoSelecao = 'x'
                        
                        if (direcaoSelecao === 'y') {
                            
                            letrasElementos[letrasSelecionadas[0]['y']][x].classList.add('div_letra_selecionada')
                            letraSerAdicionada = {'y': letrasSelecionadas[0]['y'], 'x': x, 'letra': letrasElementos[letrasSelecionadas[0]['y']][x].textContent, 'elemento': letrasElementos[letrasSelecionadas[0]['y']][x]}

                        } else if (direcaoSelecao === 'x') {
                            letrasElementos[y][letrasSelecionadas[0]['x']].classList.add('div_letra_selecionada')
                            letrasSelecionadas.push()
                            letraSerAdicionada = {'y': y, 'x': letrasSelecionadas[0]['x'], 'letra': letrasElementos[y][letrasSelecionadas[0]['x']].textContent, 'elemento': letrasElementos[y][letrasSelecionadas[0]['x']]}
                            
                        } else {
                            letrasSelecionadas.pop()
                        }
                    if (JSON.stringify(letrasSelecionadas.at(-1)) !== JSON.stringify(letraSerAdicionada)) letrasSelecionadas.push(letraSerAdicionada);
                    } else {
                        letrasElementos[y][x].classList.add('div_letra_selecionada')
                        letrasSelecionadas.push({'y': y, 'x': x, 'letra': letra.textContent, 'elemento': letra})
                    }
                    
                }
            })

            letra.addEventListener('mouseup', function() {
                segurando = !segurando
                let palavraGanha = false
                palavraSelecionada = ''
                letrasSelecionadas.forEach(letra => {
                    palavraSelecionada += letra['letra']
                });
                console.log(palavraSelecionada)
                if (listaPalavras.includes(palavraSelecionada) || listaPalavras.includes(inverterString(palavraSelecionada))) {
                    console.log('ganhou (:')
                    palavraGanha = true
                }
                letrasSelecionadas = []

                const elementos = document.querySelectorAll('.div_letra_selecionada');

                elementos.forEach(elemento => {
                    if (palavraGanha) {
                        elemento.classList.add('div_letra_ganha')
                    }
                    elemento.classList.remove('div_letra_selecionada');
                });
            })
        }
    }
    for (letra in letrasSelecionadas) {
        console.log(letra[2])
    }
    for (let i = 0; i < listaPalavras.length; i++) {
        mostradorPalavras.textContent += `${listaPalavras[i]}, `
        if (i === listaPalavras.length-1) {
            mostradorPalavras.textContent = mostradorPalavras.textContent.slice(0, -2)
        }
    }
}

function inverterString(texto) {
    return texto.split('').reverse().join('');
}


async function pegarPalavraAleatoria() {
    let palavras = []
    for (let i = 0; i < tamanhoCacaPalavras/4; i++){
        let palavra = ''
        do {
            const response = await fetch('https://api.dicionario-aberto.net/random');
            const data = await response.json();
            // palavra = data.word.toUpperCase(); 
            palavra = data.word;
        } while (palavra.length > tamanhoCacaPalavras)
        
        palavras.push(palavra)
    }
    return palavras;
}
    
gerarTabuleiro()
pegarPalavraAleatoria().then(p => {
    for (let i = 0; i < p.length; i++) {
        gerarPalavra(p[i])
    }
    mostrarLetras()
})

// TODO: \/ mudar a lógica para, mesmo se as letras não estiverem na ordem, ele ainda sim contar como a palavra correta (por exemplo, selecionar as letras corretas mas em uma ordem errada) (função linha 199)
// TODO: adicionar a mecânica de, caso a palavra já esteja ganha, ela não poder ser selecionada (função linha 164)
// TODO: colocar a capacidade dele tirar a seleção caso passe por ela denovo (função linha 164)
// TODO: resolver o problema da primeira letra selecionada não estar sendo realmente selecionada (a letra inicial) (função linha 164)
// TODO: Adicionar as bordas arredondadas para o fim e o começo da seleção das letras (função linha 164)
