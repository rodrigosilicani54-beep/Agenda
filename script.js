const linkAPI = "https://script.google.com/macros/s/AKfycbyU61tqB60h1RkhQiIf2tegeG2kgH7-8LswqNIEfGYsTvdRbrA9_wS-Mi39t2SW2g0h/exec"; // coloque aqui o link do Apps Script

// Função para adicionar usuário
async function addUsuario(nome, email, senha) {
    const url = `${linkAPI}?nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`;
    const response = await fetch(url);
    const result = await response.text();
    console.log(result);
    alert(result);
    listarUsuarios(); // atualizar a lista após cadastro
}

// Função para listar usuários
async function listarUsuarios() {
    const response = await fetch(linkAPI);
    const data = await response.json();
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = ""; // limpa lista
    data.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user[1]} (${user[2]})`; // Nome e Email
        lista.appendChild(li);
    });
}

// Evento do formulário
document.getElementById("formCadastro").addEventListener("submit", function(e){
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    addUsuario(nome, email, senha);
    this.reset(); // limpa o formulário
});

// Listar usuários ao carregar a página
window.onload = listarUsuarios;
