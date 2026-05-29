import re

def mysqlParaSqlite(conteudo_sql):
    # 1. Remove comentários globais do MySQL (/* ... */ e -- ...)
    conteudo_sql = re.sub(r'/\*.*?\*/', '', conteudo_sql, flags=re.DOTALL)
    conteudo_sql = re.sub(r'--.*?\n', '\n', conteudo_sql)
    conteudo_sql = conteudo_sql.replace("AUTO_INCREMENT", "AUTOINCREMENT")

    # 2. Ajusta declarações de chaves primárias e tipos inteiros para o padrão SQLite
    conteudo_sql = re.sub(r'int\(\d+\) NOT NULL AUTOINCREMENT', 'INTEGER PRIMARY KEY AUTOINCREMENT', conteudo_sql, flags=re.IGNORECASE)
    conteudo_sql = re.sub(r'INT NOT NULL AUTOINCREMENT', 'INTEGER PRIMARY KEY AUTOINCREMENT', conteudo_sql, flags=re.IGNORECASE)

    # Divide o arquivo por ";" para isolar cada instrução SQL original
    raw_commands = conteudo_sql.split(';')
    clean_commands = []

    for cmd in raw_commands:
        c = cmd.strip()
        if not c:
            continue

        upper_c = c.upper()

        # Filtra apenas o que for comando de criação de tabela ou inserção de dados
        if "CREATE TABLE" in upper_c or "INSERT INTO" in upper_c:
            c = c.replace('`', '')  # Remove as crases do MySQL

            if "CREATE TABLE" in upper_c:
                # CORREÇÃO CRUCIAL: Localiza a abertura do bloco '(' da tabela
                pos_abertura = c.find('(')
                if pos_abertura != -1:
                    prefixo = c[:pos_abertura+1]
                    corpo = c[pos_abertura+1:]

                    # Contador inteligente para achar o fechamento exato da tabela do SQLite
                    nivel = 1
                    pos_fechamento = -1
                    for i, char in enumerate(corpo):
                        if char == '(':
                            nivel += 1
                        elif char == ')':
                            nivel -= 1
                            if nivel == 0:
                                pos_fechamento = i
                                break

                    if pos_fechamento != -1:
                        # Mantém estritamente o conteúdo até o parêntese de fechamento correto
                        c = prefixo + corpo[:pos_fechamento+1]

                # Limpeza final de linhas internas redundantes do MySQL
                linhas = c.split('\n')
                linhas_limpas = []
                for linha in linhas:
                    if "PRIMARY KEY (ID)" in linha.upper():
                        continue
                    linhas_limpas.append(linha)

                c = "\n".join(linhas_limpas).strip()
                # Remove possíveis vírgulas que sobraram presas antes de fechar a tabela
                c = re.sub(r',\s*\)', '\n)', c)
            else:
                # Se for INSERT INTO, faz uma limpeza básica padrão de fim de instrução
                c = re.sub(r'ENGINE=.*$', '', c, flags=re.IGNORECASE | re.MULTILINE)
                c = re.sub(r'DEFAULT CHARSET=.*$', '', c, flags=re.IGNORECASE | re.MULTILINE)
                c = re.sub(r'COLLATE=.*$', '', c, flags=re.IGNORECASE | re.MULTILINE)

            if c.strip():
                clean_commands.append(c.strip())

    return clean_commands