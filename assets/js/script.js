const personagemDoomGuy = document.querySelector(".jogo__doomguy");
const hudDoomguy = document.querySelector(".jogo__vida__doomguy");
const hudImp = document.querySelector(".jogo__vida__imp");
const personagemImp = document.querySelector(".jogo__imp");
const jogoTitulo = document.querySelector(".jogo__titulo");
const campoEntrada = document.querySelector(".jogo__input");
const botaoChuta = document.querySelector(".jogo__confirma");
const botaoReiniciar = document.querySelector(".jogo__reiniciar");
const jogoResultado = document.querySelector(".jogo__resultado");
const valorMinimo = parseInt(campoEntrada.min);
const valorMaximo = parseInt(campoEntrada.max);
let maxHP = 5;
let doomGuyHP = maxHP;
let impHP = maxHP;

jogoTitulo.innerHTML = `Chute um valor entre <span class="jogo__destaque">${valorMinimo}</span> e <span class="jogo__destaque">${valorMaximo}</span>`;

botaoChuta.addEventListener("click", () => {

    const chute = parseInt(campoEntrada.value);
    const valorAleatorio = Math.ceil(Math.random() * (valorMaximo));
    if(chute < valorMinimo || chute > valorMaximo) {
        return;
    }
    
    let calc;
    if((chute == valorAleatorio)) {
        trocaModo(personagemDoomGuy, "ataque");
        impHP--;
        calc = ((impHP * 100) / maxHP) + "%";
        hudImp.style.width = calc;
    } else {
        trocaModo(personagemImp, "ataque");
        doomGuyHP--;
        calc = ((doomGuyHP * 100) / maxHP) + "%";
        hudDoomguy.style.width = calc;
    }

    // console.log(`Num máx: ${valorMaximo} | Num: ${valorAleatorio}`);
    // console.log(`Chute: ${chute} | Num: ${valorAleatorio}`);
    // console.log(`Doomguy: ${doomGuyHP} | Imp: ${impHP}`);
});

function checaPlacar() {
    if(doomGuyHP == 0) {
        trocaModo(personagemImp, "vitoria", false);
        trocaModo(personagemDoomGuy, "morte", false);
        jogoResultado.innerHTML = "Perdedor!";
        return;
    }

    if(impHP == 0) {
        trocaModo(personagemDoomGuy, "vitoria", false);
        trocaModo(personagemImp, "morte", false);
        jogoResultado.innerHTML = "Vencedor!";
        return;
    }
}

function trocaModo(classe, estado, habilidaTempo = true) {
    botaoChuta.disabled = true;
    botaoChuta.classList.add("jogo__botao--disabled");
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
        botaoChuta.classList.remove("jogo__botao--disabled");
        checaPlacar();
    }, 1500);
}

botaoReiniciar.addEventListener("click", () => {
    doomGuyHP = maxHP;
    impHP = maxHP;
    jogoResultado.innerHTML = "";
    personagemDoomGuy.classList.remove(personagemDoomGuy.classList.item(0) + "--victory");
    personagemDoomGuy.classList.remove(personagemDoomGuy.classList.item(0) + "--death");
    personagemImp.classList.remove(personagemImp.classList.item(0) + "--victory");
    personagemImp.classList.remove(personagemImp.classList.item(0) + "--death");
    botaoChuta.disabled = false;
    botaoChuta.classList.remove("jogo__botao--disabled");
    hudDoomguy.style.width = "100%";
    hudImp.style.width = "100%";
});