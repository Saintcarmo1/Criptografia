const chaves = ["e", "i", "a", "o", "u"];
const crip = ["enter", "imes", "ai", "ober", "ufat"];
const areaDeTexto = document.querySelector(".text1");
const resultado = document.querySelector(".text2");
const placeholderImage = document.getElementById("placeholder_Image");
const historicoList = document.getElementById("historico_List");
const historicoContainer = document.querySelector(".historico_Container");
const aviso = document.querySelector(".Aviso");

// Carregar histórico do localStorage
function carregarHistorico() {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    historico.forEach(texto => addHistorico(texto));
}

// Salvar histórico no localStorage
function salvarHistorico() {
    const historico = Array.from(historicoList.children).map(item => item.textContent);
    localStorage.setItem('historico', JSON.stringify(historico));
}

// Função para validar texto
function validarTexto(texto) {
    const regex = /^[a-z\s]*$/; // Apenas letras minúsculas e espaços
    return regex.test(texto);
}

// Função para o botão de criptografia
function criptografar() {
    const texto = areaDeTexto.value;
    if (!validarTexto(texto)) {
        alert("Por favor, use apenas letras minúsculas e sem acentuação.");
        return;
    }
    const segredo = cripto(texto);
    resultado.value = segredo;
    addHistorico("Texto Original: " + texto);
    addHistorico("Texto Criptografado: " + segredo);
    addHistorico("-------------------------------------");
    areaDeTexto.value = "";
    mostrarResultado();
    salvarHistorico(); // Salvar após adicionar ao histórico
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

// Função para o botão de descriptografia
function desencriptar() {
    const texto = areaDeTexto.value;
    if (!validarTexto(texto)) {
        alert("Por favor, use apenas letras minúsculas e sem acentuação.");
        return;
    }
    const resolvida = descripto(texto);
    resultado.value = resolvida;
    addHistorico("Texto Original: " + texto);
    addHistorico("Texto Descriptografado: " + resolvida);
    addHistorico("-------------------------------------");
    areaDeTexto.value = "";
    mostrarResultado();
    salvarHistorico(); // Salvar após adicionar ao histórico
}

// Função para alterar a imagem de place holder para a caixa de texto original
function mostrarResultado() {
    // Esconde a imagem placeholder
    placeholderImage.style.display = "none";
    // Exibe a textarea com o resultado
    resultado.style.display = "block";
}

// Função para executar copiar da caixa de texto
function copiar() {
    resultado.select();
    document.execCommand("copy");
}

// Funções relacionadas com funcionalidade do histórico de mensagens
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
    localStorage.removeItem('historico'); // Remove o histórico do localStorage
}

// Carregar o histórico ao carregar a página
window.onload = carregarHistorico;
