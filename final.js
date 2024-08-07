const chaves = ["e", "i", "a", "o", "u"];
const crip = ["enter", "imes", "ai", "ober", "ufat"];
const areaDeTexto = document.querySelector(".text1");
const resultado = document.querySelector(".text2");
const placeholderImage=document.getElementById("placeholder-image")
const historicoList = document.getElementById("historico-list");
const historicoContainer = document.querySelector(".historico-container");

// Função para o botão de criptografia.

function criptografar() {
    const segredo = cripto(areaDeTexto.value);
    resultado.value = segredo;
    addHistorico("Texto Original: " + areaDeTexto.value);
    addHistorico("Texto Criptografado: " + segredo);
    addHistorico("-------------------------------------");
    areaDeTexto.value = "";
    mostrarResultado();
}

// Função de criptografia
function cripto(texto) {
    let result = "";
    for (let i = 0; i < texto.length; i++) {
        const char = texto[i];
        const index = chaves.indexOf(char);
        result += index !== -1 ? crip[index] : char;
    }
    return result;
}

// Função de descriptografia
function descripto(textoCripto) {
    let result = textoCripto;
    for (let i = 0; i < crip.length; i++) {
        const regex = new RegExp(crip[i], "g");
        result = result.replace(regex, chaves[i]);
    }
    return result;
}

// Função para o botão de descriptografia.

function desencriptar() {
    const resolvida = descripto(areaDeTexto.value);
    resultado.value = resolvida;
    addHistorico("Texto Original: " + areaDeTexto.value);
    addHistorico("Texto Descriptografado: " + resolvida);
    addHistorico("-------------------------------------");
    areaDeTexto.value = "";
    mostrarResultado();
}

// Função para alterar a imagem de place holder para a caixa de texto original.

function mostrarResultado() {
    // Esconde a imagem placeholder
    placeholderImage.style.display = "none";

    // Exibe a textarea com o resultado
    resultado.style.display = "block";
}

// Função para executar copiar da caixa de texto.


function copiar() {
    resultado.select();
    document.execCommand("copy");
}



// Funçoes relacionadas com  funcionalidade do historico de menssagens. 

function addHistorico(texto) {
    const item = document.createElement("div");
    item.className = "historico-item";
    item.textContent = texto;
    historicoList.appendChild(item);
}

function toggleHistorico() {
    historicoContainer.classList.toggle("active");
}


function limparHistorico() {
  historicoList.innerHTML = ""; // Limpa todos os itens do histórico
}

