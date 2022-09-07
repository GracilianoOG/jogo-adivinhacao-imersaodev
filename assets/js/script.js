const personagemDoomGuy = document.querySelector(".jogo__doomguy");
const personagemImp = document.querySelector(".jogo__imp");
const jogoTitulo = document.querySelector(".jogo__titulo");
const campoEntrada = document.querySelector(".jogo__input");
const botaoChuta = document.querySelector(".jogo__confirma");
const valorMinimo = parseInt(campoEntrada.min);
const valorMaximo = parseInt(campoEntrada.max);
let doomGuyHP = 5;
let impHP = 5;

jogoTitulo.innerHTML = `Chute um valor entre ${valorMinimo} e ${valorMaximo}`;

botaoChuta.addEventListener("click", () => {
    const chute = parseInt(campoEntrada.value);
    const valorAleatorio = Math.floor(Math.random() * (valorMaximo + 1));
    if(chute < valorMinimo || chute > valorMaximo) {
        return;
    }
    
    if((chute == valorAleatorio)) {
        trocaModo(personagemDoomGuy, "ataque");
        impHP--;
    } else {
        trocaModo(personagemImp, "ataque");
        doomGuyHP--;
    }

    console.log(`Num máx: ${valorMaximo} | Num: ${valorAleatorio}`);
    console.log(`Chute: ${chute} | Num: ${valorAleatorio}`);
    console.log(`Doomguy: ${doomGuyHP} | Imp: ${impHP}`);
});

function checaPlacar() {
    if(doomGuyHP == 0) {
        console.log("Doomguy perdeu!");
        trocaModo(personagemImp, "vitoria", false);
        trocaModo(personagemDoomGuy, "morte", false);
        return;
    }

    if(impHP == 0) {
        console.log("Doomguy ganhou!");
        trocaModo(personagemDoomGuy, "vitoria", false);
        trocaModo(personagemImp, "morte", false);
        return;
    }
}

function trocaModo(classe, estado, habilidaTempo = true) {
    botaoChuta.disabled = true;
    classe.classList.remove(classe.classList.item(0) + "--attack");
    classe.classList.remove(classe.classList.item(0) + "--victory");
    classe.classList.remove(classe.classList.item(0) + "--death");
    let novoEstado = "";
    switch(estado) {
        case "ataque":
            novoEstado = "--attack";
            break;
        case "vitoria":
            novoEstado = "--victory";
            break;
        case "morte":
            novoEstado = "--death";
            break;
        default:
            break;
    }
    classe.classList.add(classe.classList.item(0) + novoEstado);
    if(!habilidaTempo) {
        return;
    }
    setTimeout(() => {
        classe.classList.remove(classe.classList.item(0) + novoEstado);
        botaoChuta.disabled = false;
        checaPlacar();
    }, 1500);
}