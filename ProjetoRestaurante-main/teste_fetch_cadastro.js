const formulario = document.querySelector("form");
const URL = "https://projeto-restaurante-marcus.onrender.com/cadastro.html";

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const resposta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome.value,
                email: email.value,
                cpf: cpf.value,
                senha: senha.value
            })
        });

        const dados = await resposta.json();
        console.log(dados);
    } catch (erro) {
        console.error("Erro ao enviar cadastro:", erro);
    }
});
