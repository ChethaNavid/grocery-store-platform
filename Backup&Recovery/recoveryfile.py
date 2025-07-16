import subprocess

import os

def restore_database(host, user, password, db_name, input_file):
    mysql_path = r"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
    
    if not os.path.exists(mysql_path):
        print(f"Error: mysql not found at {mysql_path}")
        return

    if not os.path.exists(input_file):
        print(f"Error: Backup file '{input_file}' not found.")
        return

    command = [
        mysql_path,
        f"--host={host}",
        f"--user={user}",
        f"--password={password}",
        db_name
    ]
    print("Running command:", " ".join(command))
    
    with open(input_file, "r") as infile:
        result = subprocess.run(command, stdin=infile, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    if result.returncode == 0:
        print(f"Restore successful from {input_file}.")
    else:
        print(f"Error: {result.stderr.decode('utf-8')}")

# Example usage
restore_database("localhost", "root", "1234", "groceries_ecommerce", "groceries_ecommerce_backup.sql")

