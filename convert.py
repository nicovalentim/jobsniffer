import sqlite3  # The library to talk to SQLite databases (built into Python)
import re       # 'Regular Expressions' - used for searching/replacing text patterns

def convert_and_setup():
    # Opens your MySQL file in 'read' mode using UTF-8 to handle accents/special chars
    with open('db/jobsniffer.sql', 'r', encoding='utf-8') as f:
        # Reads the file line-by-line into a list
        lines = f.readlines()

    clean_lines = []
    for line in lines:
        # 1. Skip MySQL-only commands that SQLite doesn't understand.
        # 'LOCK/UNLOCK' are for servers; 'SET' is for config; '/*' are comments.
        if any(x in line for x in ["LOCK TABLES", "UNLOCK TABLES", "SET ", "/*", "--"]):
            continue
        
        # 2. Remove Backticks (`)
        # MySQL uses them for table/column names, but they are optional in SQLite.
        line = line.replace('`', '')

        # 3. Remove 'AUTO_INCREMENT' 
        # In SQLite, just 'INTEGER PRIMARY KEY' handles auto-counting by default.
        line = line.replace('AUTO_INCREMENT', '')

        # 4. Standardize Integers
        # MySQL uses INT(11); SQLite prefers just 'INTEGER'. 
        # This regex looks for 'INT' followed by numbers in parentheses and removes the (11).
        line = re.sub(r'INT\(\d+\)', 'INTEGER', line)
        line = re.sub(r'INTEGER\(\d+\)', 'INTEGER', line)
        
        # Add the "cleaned" line to our new list
        clean_lines.append(line)

    # Combine all our clean lines back into one long string of SQL commands
    sql = "".join(clean_lines)

    # 5. Remove MySQL Engine/Charset settings
    # MySQL adds 'ENGINE=InnoDB' at the end of CREATE TABLE; we swap it for a simple semicolon.
    sql = re.sub(r'ENGINE=.*?;', ';', sql)
    sql = re.sub(r'DEFAULT CHARSET=.*?;', ';', sql)

    try:
        # Create (or connect to) the binary database file
        conn = sqlite3.connect('my_database.db')
        
        # executescript() runs multiple SQL commands (CREATE, INSERT, etc.) all at once
        conn.executescript(sql)
        
        # Saves the changes to the file
        conn.commit()
        
        # Closes the connection to free up the file
        conn.close()
        
        print("✅ Success! 'my_database.db' is ready and clean.")
        
    except sqlite3.OperationalError as e:
        # If SQLite still finds something it doesn't like, it will print it here
        print(f"❌ Still a syntax error: {e}")

if __name__ == '__main__':
    # Start the process
    convert_and_setup()