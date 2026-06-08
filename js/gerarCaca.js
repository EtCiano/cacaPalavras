let cacaPalavras = []
let cordsJaOcupadas = []
let tamanhoCacaPalavras = 15

const divPrincipal = document.getElementById('div_principal')
const alfabeto = 'abcdefghijklmnopqrstuvwxyzç'.split('')

function gerarTabuleiro() {
    for (let x = 0; x < tamanhoCacaPalavras; x++) {
        cacaPalavras.push([])
        for (let y = 0; y < tamanhoCacaPalavras; y++) {
            letraAleatoria = alfabeto[Math.floor(Math.random() * alfabeto.length)].toUpperCase()
            cacaPalavras[x].push(letraAleatoria)
        }
    }
}

function gerarPalavra(palavra) {

    let coluna = 0
    let fileira = 0
    
    cacaPalavrasAtualizado = [...cacaPalavras]

    let direcao = Math.floor(Math.random() * 4)
    console.log(direcao)
    let errado = false
    switch (direcao) {



        case 0:
            coluna  = Math.floor(Math.random() * tamanhoCacaPalavras)
            fileira = Math.floor(Math.random() * ((tamanhoCacaPalavras - palavra.length) - 0 + 1));

            for (let i = 0; i < palavra.length; i++) {
                if (cordsJaOcupadas.includes(`${fileira+i},${coluna}`)) {
                    errado = true
                    break;
                }
                cacaPalavrasAtualizado[fileira+i][coluna] = palavra[i]
                cordsJaOcupadas.push(`${fileira+i},${coluna}`)
            }

            if (!errado) {
                cacaPalavras = [...cacaPalavrasAtualizado]
                break;
            } else {
                // gerarPalavra(palavra)
                break;
            }
            


        case 1:
            fileira  = Math.floor(Math.random() * tamanhoCacaPalavras)
            coluna = Math.floor(Math.random() * ((tamanhoCacaPalavras - palavra.length) - 0 + 1));

            for (let i = 0; i < palavra.length; i++) {
                if (cordsJaOcupadas.includes(`${fileira},${coluna+i}`)) {
                    errado = true
                    break;
                }
                cacaPalavrasAtualizado[fileira][coluna+i] = palavra[i]
                cordsJaOcupadas.push(`${fileira},${coluna+i}`)
            }

            if (!errado) {
                cacaPalavras = [...cacaPalavrasAtualizado]
                break;
            } else {
                // gerarPalavra(palavra)
                break;
            }



        case 2:         
            palavra = inverterString(palavra)
            coluna  = Math.floor(Math.random() * tamanhoCacaPalavras)
            fileira = Math.floor(Math.random() * ((tamanhoCacaPalavras - palavra.length) - 0 + 1));

            for (let i = 0; i < palavra.length; i++) {
                if (cordsJaOcupadas.includes(`${fileira+i},${coluna}`)) {
                    errado = true
                    break;
                }
                cacaPalavrasAtualizado[fileira+i][coluna] = palavra[i]
                cordsJaOcupadas.push(`${fileira+i},${coluna}`)
            }

            if (!errado) {
                cacaPalavras = [...cacaPalavrasAtualizado]
                break;
            } else {
                // gerarPalavra(inverterString(palavra)) 
                break;
            }



        case 3:
            palavra = inverterString(palavra)
            fileira  = Math.floor(Math.random() * tamanhoCacaPalavras)
            coluna = Math.floor(Math.random() * ((tamanhoCacaPalavras - palavra.length) - 0 + 1));

            for (let i = 0; i < palavra.length; i++) {
                if (cordsJaOcupadas.includes(`${fileira+i},${coluna}`)) {
                    errado = true
                    break;
                }
                cacaPalavrasAtualizado[fileira][coluna+i] = palavra[i]
                cordsJaOcupadas.push(`${fileira},${coluna+i}`)
            }

            if (!errado) {
                cacaPalavras = [...cacaPalavrasAtualizado]
                break;
            } else {
                // gerarPalavra(inverterString(palavra)) 
                break;
            }

    }
}



function mostrarLetras() {
     for (let x = 0; x < cacaPalavras.length; x++) {
        const linha = document.createElement('div')
        linha.classList.add('div_linha')
        divPrincipal.append(linha)
        for (let y = 0; y < tamanhoCacaPalavras; y++) {
            const letra = document.createElement('div')
            letra.textContent = cacaPalavras[x][y]
            linha.append(letra)
        }
    }
}

function inverterString(texto) {
    return texto.split('').reverse().join('');
}

gerarTabuleiro()
gerarPalavra('......')
gerarPalavra('------')
gerarPalavra(',,,,,,')
gerarPalavra('++++++')
mostrarLetras()