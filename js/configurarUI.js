
function jogar() {
    const tamanho = document.getElementById('tamanhoInput').value
    const quantidade = document.getElementById('quantidadePalavras').value
    const inverter = document.getElementById('inverterPalavras').checked
    const minusculo = document.getElementById('minusculo').checked

    localStorage.setItem('configuracoes', JSON.stringify({'tamanho': tamanho, 'quantidade': quantidade, 'inverter': inverter, 'minusculo': minusculo}))
    window.open('jogo.html', '_blank')
}

const config = {
    jogar
}