import "./formulariosAutoformatar.js";
import "./formulariosReceberArquivo.js";
import { validarRegrasSenha, verificarSenhas } from "./formulariosValidacoes.js";

import { popUp } from "./globalPopups.js";

const cadastroBtn = document.getElementById('cadastroBtn');
const cadastroMenu = document.getElementById('cadastroMenu');
const cadastroSucesso = document.getElementById('cadastroSucesso');
const senhaInput = document.getElementById("cadastro_senha");

if (cadastroBtn && cadastroMenu)
    popUp(cadastroMenu, cadastroBtn);

const cadastro_formulario = document.querySelector('.cadastro_form');

cadastro_formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const senhaValida = validarRegrasSenha(senhaInput.value);
    const senhasIguais = verificarSenhas();

    if (!senhaValida || !senhasIguais) {
        alert("Por favor, verifique os requisitos de senha.");
        return;
    }

    const dadosFormulario = {
        usuario_nome: cadastro_formulario.querySelector('[name="usuario_nome"]').value,
        usuario_nascimento: cadastro_formulario.querySelector('[name="usuario_nascimento"]').value,
        usuario_telefone: cadastro_formulario.querySelector('[name="usuario_telefone"]').value,
        usuario_CEP: cadastro_formulario.querySelector('[name="usuario_CEP"]').value,
        usuario_linkedin: cadastro_formulario.querySelector('[name="usuario_linkedin"]').value,
        usuario_folio: cadastro_formulario.querySelector('[name="usuario_folio"]').value,
        usuario_email: cadastro_formulario.querySelector('[name="usuario_email"]').value,
        usuario_senha: cadastro_formulario.querySelector('[name="usuario_senha"]').value
    };

    try {
        const response = await fetch('/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosFormulario)
        });

        if (response.ok) {
            if (cadastroMenu) cadastroMenu.style.display = "none";
            cadastro_formulario.reset();

            async function f5Delay() {
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }

            popUp(cadastroSucesso, null, f5Delay());
        } else {
            const erroJson = await response.json();
            alert("Erro no cadastro: " + erroJson.mensagem);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível conectar ao servidor.");
    }
});