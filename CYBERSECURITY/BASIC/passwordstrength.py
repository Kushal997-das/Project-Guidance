import re

def password_strength(password):
    strength = 0
    if len(password) >= 8:
        strength += 1
    if re.search("[a-z]", password):
        strength += 1
    if re.search("[A-Z]", password):
        strength += 1
    if re.search("[0-9]", password):
        strength += 1
    if re.search("[@#$%^&*()!]", password):
        strength += 1
    return strength

password = input("Enter your password: ")
score = password_strength(password)
print(f"Password strength: {score}/5")
