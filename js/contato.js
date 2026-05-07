export function enviarEmail() {
    const form = document.getElementById('contato');
    
    if (!form) {
        console.error("Formulário de contato não encontrado!");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // elementos do HTML
        const nome = document.querySelector('input[name="contatoNome"]').value;
        const assunto = document.querySelector('input[name="contatoAssunto"]').value;
        const mensagem = document.querySelector('textarea[name="contatoMensagem"]').value;
        const sucesso = document.getElementById("contatoSucesso");

        const destinatario = "209572026@eniac.edu.br";
        const corpoEmail = `Nome: ${nome}\n\nMensagem:\n${mensagem}`;
        const mailtoLink = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoEmail)}`;

        window.location.href = mailtoLink;

        if (sucesso) {
            sucesso.innerHTML = "Seu aplicativo de e-mail foi aberto!";
        }
        form.reset(); 
    });
}