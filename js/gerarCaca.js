const configuracoes = JSON.parse(localStorage.getItem('configuracoes'));

const tamanhoCacaPalavras = configuracoes['tamanho']
const mostradorPalavras = document.getElementById('palavras_lista')

let cacaPalavras = []
let letrasElementos = []

let cordsJaOcupadas = []
let cacaPalavrasAtualizado = []
let listaPalavras = []
let segurando = false
let letrasSelecionadas = []
// let listaLetrasDiv = []

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
    if (!configuracoes['inverter']) {
        while (direcao === 2 || direcao === 3) {
            direcao = Math.floor(Math.random() * 4)
        }
    }
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
                entrarMouse()
            });

            letra.addEventListener('mouseenter', entrarMouse)

            function entrarMouse() {
                if (!letra.classList.contains('div_letra_selecionada')) {
                    
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
                        if (!letrasSelecionadas.some(l => l.y === letraSerAdicionada.y && l.x === letraSerAdicionada.x)) letrasSelecionadas.push(letraSerAdicionada);
                        } else {
                            letrasElementos[y][x].classList.add('div_letra_selecionada')
                            letrasSelecionadas.push({'y': y, 'x': x, 'letra': letra.textContent, 'elemento': letra})
                        }
                        console.log(letrasSelecionadas)
                    }
                } else {
                    letrasSelecionadas.at(-1)['elemento'].classList.remove('div_letra_selecionada')
                    letrasSelecionadas.pop()
                    console.log(letrasSelecionadas)
                }
            }

            letra.addEventListener('mouseup', function() {
                segurando = !segurando
                let palavraGanha = false
                // palavraSelecionada = ''
                    listaPalavras.forEach(palavraAlvo => {
                        let similaridade = 0
                        if (letrasSelecionadas.length > palavraAlvo.length) return
                        letrasSelecionadas.forEach(letra => {
                            if (palavraAlvo.includes(letra['letra'])) similaridade += 1
                        });
                        if (similaridade === palavraAlvo.length) palavraGanha = true
                    })

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
    for (let i = 0; i < configuracoes['quantidade']; i++){
        let palavra = ''
        do {
            const response = await fetch('https://api.dicionario-aberto.net/random');
            const data = await response.json();

            if (!configuracoes['minusculo']) palavra = data.word.toUpperCase(); 
            else palavra = data.word;
            
        } while (palavra.length > tamanhoCacaPalavras)
        
        palavras.push(palavra)
    }
    return palavras;
}
    
function renderizar() {
    console.log('chamando API...')
    gerarTabuleiro()
    pegarPalavraAleatoria().then(p => {
        for (let i = 0; i < p.length; i++) {
            gerarPalavra(p[i])
        }
        mostrarLetras()
    })
}

renderizar()

// TODO: Adicionar as bordas arredondadas para o fim e o começo da seleção das letras (função linha 164) (chato pra krl)

// TODO: juntar alguns dos Loops e deixar o código mais optimizado e organizado em geral

// TODO: mudar a interfaçe na aba de jogar para mostrar a pontuação e mostrar quais palavras ja foram marcadas

// TODO: mudar a lógica para, quando o mouse sair do eixo e ir para uma letra ja selecionada, ele deselecionar todas as letras depois dessa

// TODO: adicionar a compatibilidade com o celular