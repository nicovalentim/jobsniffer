import { validarCampoFormatado, inicializarFormatarEventos } from "./formulariosAutoformatar.js";
import { validarRegrasSenha, verificarSenhas } from "./formulariosValidacoes.js";
import { popUp } from "./globalPopups.js";

const cadastroBtn = document.getElementById('cadastroBtn');
const cadastroMenu = document.getElementById('cadastroMenu');
const cadastroSucesso = document.getElementById('cadastroSucesso');

inicializarFormatarEventos();

if (cadastroBtn && cadastroMenu) {
    popUp(cadastroMenu, cadastroBtn);
}

const cadastro_formulario = document.querySelector('.cadastro_form');

if (cadastro_formulario) {
    cadastro_formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const senhaInput = document.getElementById("cadastro_senha");
        const senhaTexto = senhaInput ? senhaInput.value : "";

        const senhaValida = validarRegrasSenha(senhaTexto);
        const senhasIguais = verificarSenhas();

        if (!senhaValida || !senhasIguais) {
            alert("Por favor, verifique os requisitos de senha.");
            return;
        }

        const nascimentoInput = cadastro_formulario.querySelector('[name="usuario_nascimento"]');
        const telefoneInput = cadastro_formulario.querySelector('[name="usuario_telefone"]');
        const CEPInput = cadastro_formulario.querySelector('[name="usuario_CEP"]');

        const nascimentoValor = nascimentoInput ? nascimentoInput.value : "";
        const telefoneValor = telefoneInput ? telefoneInput.value : "";
        const CEPValor = CEPInput ? CEPInput.value : "";

        if (!validarCampoFormatado("usuarioNascimento", nascimentoValor, validarRegrasSenha) ||
            !validarCampoFormatado("usuarioTelefone", telefoneValor, validarRegrasSenha) ||
            !validarCampoFormatado("usuarioCEP", CEPValor, validarRegrasSenha)) {
            return; 
        }

        const dadosFormulario = {
            usuario_nome: cadastro_formulario.querySelector('[name="usuario_nome"]').value,
            usuario_nascimento: nascimentoValor,
            usuario_telefone: telefoneValor,
            usuario_CEP: CEPValor,
            usuario_linkedin: cadastro_formulario.querySelector('[name="usuario_linkedin"]').value,
            usuario_folio: cadastro_formulario.querySelector('[name="usuario_folio"]').value,
            usuario_email: cadastro_formulario.querySelector('[name="usuario_email"]').value.toLowerCase(),
            usuario_senha: senhaTexto
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
                popUp(cadastroSucesso, null);
                setTimeout(() => {
                    location.reload();
                }, 1500);
            } else {
                const erroJson = await response.json();
                alert("Erro no cadastro: " + erroJson.mensagem);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Não foi possível conectar ao servidor.");
        }
    });
}