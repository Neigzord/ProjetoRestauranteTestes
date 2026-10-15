const botao = document.querySelector("#cadastro");
const URL = "https://projeto-restaurante-backend-5mhl.onrender.com/cliente";

const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const cpf = document.querySelector("#cpf");
const senha = document.querySelector("#senha");

botao.addEventListener("click", async (event) => {
    event.preventDefault();

    console.log("CLIQUEI EM CADASTRAR!");

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

        console.log("Status HTTP:", resposta.status);
        console.log("Resposta do servidor:", dados);

        if (!resposta.ok) {
            console.error("O servidor recusou o cadastro.");
            return;
        }

        console.log("Cadastro enviado com sucesso!");

    } catch (erro) {
        console.error("Erro ao enviar cadastro:", erro);
    }
});