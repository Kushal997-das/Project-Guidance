# Implementation of RSA algorithm in Python
# Took inspiration from my university's Discrete Structures class where I learned number theory and cryptography

# To run: Open Terminal in the root of the cloned repository, type "python RSA_Algorithm/RSA_Python.py". Press Enter.

import math
from pprint import pprint
from string import ascii_lowercase

encoding = {c: ascii_lowercase.index(c) + 1 for c in ascii_lowercase}
encoding[" "] = 27


def extended_euclid(a, b):
    # Returns (d,x,y) such that a*x + b*y = d = gcd(a,b)
    # x and y are the Bezout coefficients
    # Implements a recursive version of the Extended Euclidean algorithm
    # from https://www.geeksforgeeks.org/euclidean-algorithms-basic-and-extended/
    if a == 0:
        return b, 0, 1  # Base case, since 0*0 + b*1 = 1

    # By Euclid's Theorem and the recursion
    d, x1, y1 = extended_euclid(b % a, a)

    # // is the integer division in Python
    # Since b = a*q + r, for some integer q, it follows that we can write q = (b//a) and r = b - a * (b//a)
    x = y1 - (b//a)*x1
    y = x1

    return d, x, y


def extended_euclid_iterative(a, b):
    # Same thing as above, but non-recursive

    x0, x1, y0, y1 = 0, 1, 1, 0
    while a != 0:
        q, a, b = math.floor(b/a), b % a, a
        y0, y1 = y1, y0 - q*y1
        x0, x1 = x1, x0 - q*x1

    return b, x0, y0


def modinv(a, m):
    if extended_euclid(a, m)[0] != 1:
        return "Inverse does not exist"
    # We have x such that 1 = ax + ym, so x = inv_a
    _, inv_a, _ = extended_euclid(a, m)
    if inv_a < 0:
        return (inv_a + m)
    return inv_a


def rsa_gen_public_private_keys(p, q):
    found_e = False
    e = 2
    while not found_e and e < (p-1)*(q-1):
        g, _, _ = extended_euclid(e, (p-1)*(q-1))
        if g == 1:
            found_e = True
        else:
            e += 1

    d = modinv(e, (p-1)*(q-1))
    return (e, d)


def rsa_encrypt(message, n, e):
    C = message**e % n
    return C


def rsa_decrypt(encrypted, n, d):
    message = encrypted**d % n
    return message


def encode(message):
    encoded = ""
    for c in message:
        i = encoding[c]
        if i < 10:
            encoded += "0" + str(i)
        else:
            encoded += str(i)
    return int(encoded)


def decode(int_message):
    s_message = str(int_message)
    decoded = ""
    i = 0
    if len(s_message) % 2 != 0:
        s_message = "0" + s_message
    while i < len(s_message):
        int_c = int(s_message[i] + s_message[i+1])
        for k, v in encoding.items():
            if v == int_c:
                decoded += k
        i += 2
    return decoded


def is_prime(n, verbose=False):
    sieve = sorted(list(range(2, math.floor(math.sqrt(n)) + 1)))
    size_of_sieve = len(sieve)
    while size_of_sieve > 0:
        # if verbose:
        # 	print(sieve)
        # 	print(size_of_sieve)
        i = sieve.pop(0)
        if n % i == 0 and i != n:
            if verbose:
                print("%s is a multiple of %s" % (n, i))
            return False
        else:
            mult_of_i = [k for k in sieve if k % i == 0]
            sieve = sorted([x for x in sieve if x not in mult_of_i])
            size_of_sieve = len(sieve)
    if verbose:
        print("%s is prime" % n)
    return True


def gen_big_prime_less_than(upper_bound):
    for i in sorted(range(2, upper_bound), reverse=True):
        if is_prime(i, False):
            return i
    return "No prime found in interval"

# private: p, q, d
# public: n, e
# All values are generated locally
# upper_bound is an upper bound on the prime numbers p and q generated
# message is the message to encode -> encrypt -> decrypt -> decode


def have_fun_rsa(upper_bound, message):
    p = gen_big_prime_less_than(upper_bound)
    q = gen_big_prime_less_than(p)
    e, d = rsa_gen_public_private_keys(p, q)
    n = p*q

    encoded = encode(message)
    if encoded > n:
        pprint((message, encoded))
        messages = split_into_smaller_messages(encoded, n)
        for encoded_i in messages:
            encrypted_i = rsa_encrypt(encoded_i, n, e)
            decrypted_i = rsa_decrypt(encrypted_i, n, d)
            decoded_i = decode(decrypted_i)
            pprint((encoded_i, encrypted_i, decrypted_i, decoded_i))

# If gcd(message, n) > 1, we split into smaller messages


def split_into_smaller_messages(message, n):
    len_of_message = len(str(message))
    num_of_digits = len(str(n))
    messages = []
    if num_of_digits > 2:
        size_of_messages = max([i for i in range(num_of_digits) if i % 2 == 0])
        numb_of_messages = math.ceil(len_of_message / size_of_messages)
        for i in range(0, numb_of_messages):
            mes_i = ""
            for c in range(i*size_of_messages, (i+1)*size_of_messages):
                if c < len_of_message:
                    mes_i += str(message)[c]
            messages.append(int(mes_i))
    return messages


have_fun_rsa(1000, "julie is eating bread")
