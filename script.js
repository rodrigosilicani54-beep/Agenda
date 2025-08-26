<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Sistema de Usuários</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 30px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
        th { background: #f4f4f4; }
        button { margin-right: 5px; }
        input, select { padding: 5px; margin: 5px 0; width: 100%; }
        form { max-width: 400px; }
    </style>
</head>
<body>

<h1>Cadastro de Usuários</h1>

<form id="formUsuario">
    <input type="text" id="nomeCompleto" placeholder="Nome Completo" required>
    <input type="text" id="nomeUsuario" placeholder="Nome de Usuário" required>
    <input type="password" id="senha" placeholder="Senha" required>
    <select id="nivelAcesso" required>
        <option value="">Selecione Nível</option>
        <option value="Admin">Admin</option>
        <option value="Usuário">Usuário</option>
    </select>
    <button type="submit">Adicionar Usuário</button>
</form>

<h2>Usuários Cadastrados</h2>
<table id="tabelaUsuarios">
    <thead>
        <tr>
            <th>Nome Completo</th>
            <th>Nome de Usuário</th>
            <th>Nível de Acesso</th>
            <th>Data de Criação</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        <!-- Usuários serão adicionados aqui via JS -->
    </tbody>
</table>

<script>
// --- LINK DO SEU WEB APP ---
const linkAPI = "https://script.google.com/macros/s/AKfycbyyuNmMTjHkHrkk-c_QTGulEV47QJg_ySili0H3tlSF789Vknykq2RDDOiXvYAAU46D/exec";

// --- Função para adicionar usuário ---
async function addUsuario(nomeCompleto, nomeUsuario, senha, nivelAcesso) {
    const url = `${linkAPI}?nomeCompleto=${encodeURIComponent(nomeCompleto)}&nomeUsuario=${encodeURIComponent(nomeUsuario)}&senha=${encodeURIComponent(senha)}&nivelAcesso=${encodeURIComponent(nivelAcesso)}`;
    const response = await fetch(url, { method: 'POST' });
    const result = await response.text();
    alert(result);
    listarUsuarios();
}

// --- Função para listar usuários ---
async function listarUsuarios() {
    const response = await fetch(linkAPI);
    const data = await response.json();
    const tbody = document.querySelector("#tabelaUsuarios tbody");
    tbody.innerHTML = "";

    data.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user[1]}</td>
            <td>${user[2]}</td>
            <td>${user[4]}</td>
            <td>${user[5] ? new Date(user[5]).toLocaleString() : "Data não disponível"}</td>
            <td>
                <button onclick="alert('Editar ainda não implementado')">Editar</button>
                <button onclick="alert('Excluir ainda não implementado')">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- Capturar envio do formulário ---
document.getElementById("formUsuario").addEventListener("submit", function(e){
    e.preventDefault();
    const nomeCompleto = document.getElementById("nomeCompleto").value;
    const nomeUsuario = document.getElementById("nomeUsuario").value;
    const senha = document.getElementById("senha").value;
    const nivelAcesso = document.getElementById("nivelAcesso").value;

    addUsuario(nomeCompleto, nomeUsuario, senha, nivelAcesso);

    this.reset(); // Limpa formulário
});

// --- Listar usuários ao carregar a página ---
window.onload = listarUsuarios;
</script>

</body>
</html>
