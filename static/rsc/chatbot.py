def responder_usuario(msg):

    msg = msg.lower()


    # cumprimento
    if "oi" in msg or "olá" in msg or "ola" in msg:
        return "Oi! Posso te ajudar a encontrar vagas, enviar currículo ou entender o processo seletivo."


    # vagas
    elif "vaga" in msg or "emprego" in msg:
        return "Temos vagas disponíveis em diversas áreas. Você pode escolher a vaga desejada e se candidatar diretamente pelo site."


    elif "home office" in msg:
        return "Sim, temos vagas presenciais, híbridas e também home office."


    elif "perto" in msg:
        return "Você pode filtrar as vagas por localização diretamente no site."


    elif "jovem aprendiz" in msg:
        return "Sim, temos vagas para jovem aprendiz e também para iniciantes."


    # experiência
    elif "experiência" in msg or "experiencia" in msg:
        return "Algumas vagas exigem experiência, mas também temos oportunidades para quem está começando."


    # currículo
    elif "curriculo" in msg or "currículo" in msg:
        return "Você pode enviar seu currículo diretamente pelo site no momento da candidatura."


    elif "pdf" in msg:
        return "Sim, você pode enviar seu currículo em PDF."


    elif "atualizar" in msg:
        return "Você pode atualizar seu currículo acessando sua conta no site."


    # processo seletivo
    elif "entrevista" in msg:
        return "Algumas vagas possuem entrevista online ou presencial, dependendo da empresa."


    elif "tempo" in msg or "demora" in msg:
        return "O tempo de resposta depende da empresa, mas normalmente ocorre em alguns dias."


    # cadastro
    elif "cadastro" in msg or "conta" in msg:
        return "Você precisa criar um cadastro para se candidatar às vagas."


    elif "senha" in msg:
        return "Caso tenha esquecido sua senha, utilize a opção de recuperação no site."


    # segurança
    elif "taxa" in msg or "pagar" in msg or "cobram" in msg:
        return "Não cobramos nenhuma taxa para participar das vagas. O serviço é gratuito para candidatos."


    # empresa
    elif "empresa" in msg or "site seguro" in msg:
        return "Somos uma plataforma de RH focada em conectar candidatos e empresas de forma segura."


    # padrão
    else:
        return "Posso te ajudar com vagas, currículo, cadastro ou processo seletivo."