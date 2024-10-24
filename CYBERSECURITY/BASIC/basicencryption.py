# Function to encrypt the message using Caesar Cipher
def encrypt(message, shift):
    encrypted_message = ""
    for char in message:
        # Encrypt uppercase letters
        if char.isupper():
            encrypted_message += chr((ord(char) + shift - 65) % 26 + 65)
        # Encrypt lowercase letters
        elif char.islower():
            encrypted_message += chr((ord(char) + shift - 97) % 26 + 97)
        else:
            # Keep non-alphabet characters unchanged
            encrypted_message += char
    return encrypted_message

# Function to decrypt the message using Caesar Cipher
def decrypt(message, shift):
    decrypted_message = ""
    for char in message:
        # Decrypt uppercase letters
        if char.isupper():
            decrypted_message += chr((ord(char) - shift - 65) % 26 + 65)
        # Decrypt lowercase letters
        elif char.islower():
            decrypted_message += chr((ord(char) - shift - 97) % 26 + 97)
        else:
            # Keep non-alphabet characters unchanged
            decrypted_message += char
    return decrypted_message

# Main program to take input from the user
def main():
    choice = input("Would you like to (E)ncrypt or (D)ecrypt? ").lower()
    message = input("Enter your message: ")
    shift = int(input("Enter the shift value: "))
    
    if choice == 'e':
        print("Encrypted message:", encrypt(message, shift))
    elif choice == 'd':
        print("Decrypted message:", decrypt(message, shift))
    else:
        print("Invalid choice. Please select 'E' for encrypt or 'D' for decrypt.")

# Run the main program
if __name__ == "__main__":
    main()

