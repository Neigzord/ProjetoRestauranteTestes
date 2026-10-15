
console.log("JavaScript do login carregado!");

const botao = document.querySelector("#login");

const email = document.querySelector("#email");
const cpf = document.querySelector("#cpf");
const senha = document.querySelector("#senha");

const erroEmail = document.querySelector("#erroEmail");
const erroCpf = document.querySelector("#errocpf");
const erroSenha = document.querySelector("#erroSenha");

// Validar CPF
function validarCPF(valor) {
    const numero = valor.replace(/\D/g, "");

    if (numero.length !== 11 || /^(\d)\1+$/.test(numero)) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(numero[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    if (resto !== Number(numero[9])) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(numero[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    return resto === Number(numero[10]);
}

// Validar e-mail
function validarEmail(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

// Clique no botão Entrar
botao.addEventListener("click", async () => {
    console.log("Botão Entrar clicado!");

    erroEmail.textContent = "";
    erroCpf.textContent = "";
    erroSenha.textContent = "";

    let valido = true;

    if (!validarEmail(email.value.trim())) {
        erroEmail.textContent = "Digite um e-mail válido.";
        erroEmail.style.color = "white";
        valido = false;
    }

    if (!validarCPF(cpf.value)) {
        erroCpf.textContent = "Seu CPF não está correto ou é inválido.";
        erroCpf.style.color = "white";
        valido = false;
    }

    if (senha.value.length < 8) {
        erroSenha.textContent =
            "A senha precisa ter pelo menos 8 caracteres.";
        erroSenha.style.color = "white";
        valido = false;
    }

    if (!valido) {
        return;
    }

    try {
        
        const URL_LOGIN =
            "https://projeto-restaurante-backend-5mhl.onrender.com/login";

        const resposta = await fetch(URL_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value.trim(),
                cpf: cpf.value.replace(/\D/g, ""),
                senha: senha.value
            })
        });

        const dados = await resposta.json();

        console.log("Status HTTP:", resposta.status);
        console.log("Resposta do servidor:", dados);

        if (!resposta.ok) {
            alert("Não foi possível entrar. Confira seus dados.");
            return;
        }

        alert("Resposta positiva do servidor!");

    } catch (erro) {
        console.error("Erro ao realizar login:", erro);
        alert("Não foi possível conectar ao servidor.");
    }
});
