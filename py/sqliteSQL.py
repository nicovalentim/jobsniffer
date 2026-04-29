import re

def mysqlParaSqlite(conteudo_sql):
    conteudo_sql = re.sub(r'/\*.*?\*/', '', conteudo_sql, flags=re.DOTALL)    # remove comentários com /* */
    conteudo_sql = re.sub(r'--.*?\n', '\n', conteudo_sql)                     # remove comentários com --
    conteudo_sql = conteudo_sql.replace("AUTO_INCREMENT", "AUTOINCREMENT")    # substitui AUTO_INCREMENT (mySQL) por AUTOINCREMENT (sqlite)
    
    # Ajusta tipos INT com autoincremento para padrão SQLite
    conteudo_sql = re.sub(r'int\(\d+\) NOT NULL AUTOINCREMENT', 'INTEGER PRIMARY KEY AUTOINCREMENT', conteudo_sql, flags=re.IGNORECASE)
    conteudo_sql = re.sub(r'INT NOT NULL AUTOINCREMENT', 'INTEGER PRIMARY KEY AUTOINCREMENT', conteudo_sql, flags=re.IGNORECASE)

    raw_commands = conteudo_sql.split(';')                                   # divide o sql em comandos separados por ";"
    
    clean_commands = []

    # percorre cada comando
    for cmd in raw_commands:
        c = cmd.strip()  # remove espaços extras
        if not c: 
            continue  # ignora comandos vazios
        
        upper_c = c.upper()
        
        # só mantém comandos CREATE TABLE ou INSERT INTO
        if upper_c.startswith("CREATE TABLE") or upper_c.startswith("INSERT INTO"):
            c = c.replace('`', '')                                                          # remove crases (`) usadas no mySQL
            c = re.sub(r'ENGINE=.*$', '', c, flags=re.IGNORECASE | re.MULTILINE)            # remove ENGINE=... (não existe no sqlite)
            c = re.sub(r'DEFAULT CHARSET=.*$', '', c, flags=re.IGNORECASE | re.MULTILINE)   # remove DEFAULT CHARSET=... (não usado no sqlite)

            # se já tiver PRIMARY KEY definida no campo
            if "INTEGER PRIMARY KEY" in c:
                lines = c.split('\n')
                filtered_lines = []
                
                # eemove duplicações de PRIMARY KEY (ID)
                for line in lines:
                    if "PRIMARY KEY (ID)" in line.upper() or "PRIMARY KEY (ID)" in line.upper():
                        continue
                    filtered_lines.append(line)

                content = "\n".join(filtered_lines)                                         # junta novamente o conteúdo
                content = content.replace(",\n)", "\n)").replace(", )", ")")                # corrige vírgulas sobrando antes do fechamento

                c = content
            clean_commands.append(c.strip()) # adiciona comando limpo à lista
    return clean_commands