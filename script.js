async function addUsuario(nomeCompleto, nomeUsuario, senha, nivelAcesso){
    const url = `${linkAPI}?nomeCompleto=${encodeURIComponent(nomeCompleto)}&nomeUsuario=${encodeURIComponent(nomeUsuario)}&senha=${encodeURIComponent(senha)}&nivelAcesso=${encodeURIComponent(nivelAcesso)}`;
    const response = await fetch(url, { method: 'POST' });
    const result = await response.text();
    alert(result);
    listarUsuarios();
}
async function listarUsuarios(){
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
            <td>${user[5]}</td>
            <td>
                <button onclick="editarUsuario('${user[0]}')">Editar</button>
                <button onclick="excluirUsuario('${user[0]}')">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
