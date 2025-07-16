import subprocess
import os


def backup_database(host, user, password, db_name, output_file):
    mysqldump_path = r"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"
    
    if not os.path.exists(mysqldump_path):
        print(f"Error: mysqldump not found at {mysqldump_path}")
        return

    command = [
        mysqldump_path,
        f"--host={host}",
        f"--user={user}",
        f"--password={password}",  # Consider alternative method for security
        db_name,
        f"--result-file={output_file}"
    ]

    print("Running command:", " ".join(command))
    
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    if result.returncode == 0:
        print(f"Backup successful. File saved as {output_file}.")
    else:
        print(f"Backup failed. Error:\n{result.stderr.decode('utf-8')}")


# Example usage
backup_database("localhost", "root", "1234", "groceries_ecommerce", "groceries_ecommerce_backup.sql")
