export function enviarEmail() {
    const form = document.getElementById('contato');
    
    if (!form)
        return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.querySelector('input[name="contatoNome"]').value;
        const assuntoSemFiltro = document.querySelector('input[name="contatoAssunto"]').value;
            const assunto = encodeURIComponent(assuntoSemFiltro);
        const mensagemSemFiltro = document.querySelector('textarea[name="contatoMensagem"]').value;
            const mensagem = encodeURIComponent(mensagemSemFiltro);
        const sucesso = document.getElementById("contatoSucesso");

        const destinatario = "";
        const corpoEmail = `Enviada por: ${nome}\n\nMensagem:\n${mensagem}`;
        const mailtoLink = `mailto:${destinatario}?subject=${assunto}&body=${corpoEmail}`;

        window.location.href = mailtoLink;

        if (sucesso)
            sucesso.innerHTML = "Seu aplicativo de e-mail foi aberto!";
        form.reset();
    });
}
