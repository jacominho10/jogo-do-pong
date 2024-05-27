//variáveis da Bola
let xBola = 300;
let yBola = 200;
let diametrob = 14;
let raio = diametrob /2;

//velocidade da Bola
let velocidadeXbola = 6;
let velocidadeYbola = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteCom = 6;
let raqueteAl = 75;

//variáveis do oponente
let xRaqueteOp = 587;
let yRaqueteOp = 150;
let velocidadeYOp = 6;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOp = 0;

//chance de ganhar
let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
 trilha = loadSound("trilha.mp3");
 ponto = loadSound("ponto.mp3");
 raquetada = loadSound("raquetada.mp3");

}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(5, 57, 7);
  mostraBola();
  movimentoBola();
  seBorda();
  mostraRaquete(xRaquete, yRaquete);
  movMinhaRaquete();
  //seRaquete();
  secolisaoRaquete (xRaquete, yRaquete);
  mostraRaquete (xRaqueteOp,yRaqueteOp);
  movRaqueteOp ();
  secolisaoRaquete (xRaqueteOp, yRaqueteOp);
  oPlacar();
  marcaPonto();
 calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}

function mostraBola (){
  circle(xBola, yBola, diametrob);
}
function movimentoBola (){
  xBola += velocidadeXbola;
  yBola += velocidadeYbola;
}
function seBorda(){
  if(xBola + raio > width || xBola - raio < 0){
    velocidadeXbola *= -1;
  }
  
  if(yBola + raio > height || yBola - raio < 0 ){
    velocidadeYbola *= -1;
  }
}
function mostraRaquete(x,y){
  rect (x, y, raqueteCom, raqueteAl);
}


function movMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
   yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
   yRaquete += 10;
  }
}
function seRaquete(){
  if(xBola - raio < xRaquete + raqueteCom &&
     yBola - raio  < yRaquete + raqueteAl && 
    yBola + raio> yRaquete){
 velocidadeXbola *= -1;
  raquetada.play();
}
}

function secolisaoRaquete(x,y) {
  colidiu =
  collideRectCircle (x,y,raqueteCom,raqueteAl,xBola, yBola,raio);
  if (colidiu){
  velocidadeXbola *= -1;
  raquetada.play();
  }
}

function movRaqueteOp (){
  velocidadeYOp = yBola - yRaqueteOp - raqueteCom /2 - 30;
  yRaqueteOp += velocidadeYOp;
  calculaChanceDeErrar()

}

function oPlacar (){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color (228, 197, 252));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color (228, 197, 252));
  rect(450,10,40,20);
  fill(255);
  text(pontosOp,470,26);
}

function marcaPonto(){
 if(xBola > 590){
 meusPontos += 1;
 ponto.play();
}
 if(xBola < 10){
 pontosOp += 1;
 ponto.play();
}
}

function calculaChanceDeErrar() {
  if (pontosOp >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (xBola - raio < 0){
    xBola= 23
    }
}
