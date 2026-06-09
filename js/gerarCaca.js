let cacaPalavras = []
let cordsJaOcupadas = []
let cacaPalavrasAtualizado = []
let tamanhoCacaPalavras = 20
const mostradorPalavras = document.getElementById('palavras_lista')
let listaPalavras = []

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
     for (let x = 0; x < cacaPalavras.length; x++) {
        const linha = document.createElement('div')
        linha.classList.add('div_linha')
        linha.style.gridTemplateColumns = `repeat(${tamanhoCacaPalavras}, 1fr)`
        divPrincipal.append(linha)
        for (let y = 0; y < tamanhoCacaPalavras; y++) {
            const letra = document.createElement('div')
            letra.textContent = cacaPalavras[x][y]
            linha.append(letra)
        }
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
            palavra = data.word.toUpperCase();
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