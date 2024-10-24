import itertools
import time

def brute_force_crack(target_password, max_length):
    charset = "abcdefghijklmnopqrstuvwxyz"  # Lowercase letters only
    attempts = 0

    # Iterate through all combinations of the specified length
    for length in range(1, max_length + 1):
        for guess in itertools.product(charset, repeat=length):
            guess_password = ''.join(guess)
            attempts += 1
            if guess_password == target_password:
                print(f"Password found: {guess_password} after {attempts} attempts.")
                return guess_password
            
    print("Password not found within the given length.")
    return None

if __name__ == "__main__":
    target_password = input("Enter the target password to crack (lowercase letters only): ")
    max_length = int(input("Enter the maximum length of the password: "))
    
    start_time = time.time()
    brute_force_crack(target_password, max_length)
    end_time = time.time()
    
    print(f"Cracking completed in {end_time - start_time:.2f} seconds.")