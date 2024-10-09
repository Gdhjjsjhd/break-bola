const canva = document.getElementById('gameCanvas'); // pegar o id do html
const ctx = canva.getContext('2d'); // entra dentro do canva e adiciona o elemento 2d

canva.width = 480; // uma variável que tem um tamanho determinado
canva.height = 320;

let raquelAltura = 10;
let raquelLargura = 75;
let raquel = (canva.width - raquelLargura) / 2; // pega o elemento canva.width e subtrai com o elemento raquelLargura e o resultado / por 2

let bola = 10; // "tamanho" da bola
let x = canva.width / 2; // pega o elemento canva.width e divide por 2
let y = canva.height - 30;
let dx = 2; // deslocamento da bola
let dy = -2;

const linha = 3;
const coluna = 5;
const largura = 75;
const altura = 20;
const padding = 10;
const blocotop = 30;
const esquerdinhaigualoSergio = 30;

const blocos = [];
for (let c = 0; c < coluna; c++) { // adiciona colunas de blocos
    blocos[c] = [];
    for (let r = 0; r < linha; r++) { // adiciona linhas de blocos
        blocos[c][r] = {
            x: 0, y: 0, status: 1
        };
    }
}

function desenhodaBola() {
    ctx.beginPath();
    ctx.arc(x, y, bola, 0, Math.PI * 2); // deve ser Math.PI * 2 para um círculo completo
    ctx.fillStyle = "#0095DD"; // deve ter o # na cor
    ctx.fill();
    ctx.closePath();
}

function desenhodaRaquete() {
    ctx.beginPath();
    ctx.rect(raquel, canva.height - raquelAltura, raquelLargura, raquelAltura); // desenha a raquete como um retângulo
    ctx.fillStyle = "#0095DD"; // cor da raquete
    ctx.fill();
    ctx.closePath();
}

function desenhoBlocos() {
    for (let c = 0; c < coluna; c++) {
        for (let r = 0; r < linha; r++) {
            if (blocos[c][r].status === 1) {
                const blocoX = c * (largura + padding) + esquerdinhaigualoSergio;
                const blocoY = r * (altura + padding) + blocotop; // deve usar r aqui, não c
                blocos[c][r].x = blocoX;
                blocos[c][r].y = blocoY;
                ctx.beginPath();
                ctx.rect(blocoX, blocoY, largura, altura);
                ctx.fillStyle = "#0095DD"; // cor dos blocos
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function colisao() {
    for (let c = 0; c < coluna; c++) {
        for (let r = 0; r < linha; r++) {
            const b = blocos[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + largura &&
                    y > b.y && y < b.y + altura) {
                    dy = -dy; // inverte a direção da bola
                    b.status = 0; // marca o bloco como destruído
                }
            }
        }
    }
}

function posicaoBola() {
    if (x + dx > canva.width - bola || x + dx < bola) {
        dx = -dx; // inverte a direção no eixo x
    }
    if (y + dy < bola) {
        dy = -dy; // inverte a direção no eixo y
    } else if (y + dy > canva.height - bola) {
        if (x > raquel && x < raquel + raquelLargura) {
            dy = -dy; // bola rebate na raquete
        } else {
            document.location.reload(); // deve ser document.location.reload()
        }
    }

    x += dx; // atualiza a posição x
    y += dy; // atualiza a posição y
}

document.addEventListener('mousemove', mouseMecher); // deve ser 'mousemove', estava 'nousemeve'

function mouseMecher(e) {
    const relativo = e.clientX - canva.offsetLeft; // deve ser offsetLeft, estava offsetLefet
    if (relativo > 0 && relativo < canva.width) { // deve ser canva.width, estava CSSMathValue.width
        raquel = relativo - raquelLargura / 2; // atualiza a posição da raquete
    }
}

function desenho() {
    ctx.clearRect(0, 0, canva.width, canva.height); // limpa a tela
    desenhodaBola();
    desenhoBlocos();
    desenhodaRaquete();
    colisao();
    posicaoBola();
}

setInterval(desenho, 10); // inicia o loop de desenho