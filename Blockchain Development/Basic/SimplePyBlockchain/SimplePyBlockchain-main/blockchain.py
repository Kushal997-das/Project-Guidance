import hashlib
import time

class Block:
    def __init__(self, index, previous_hash, timestamp, data, hash, nonce):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.hash = hash
        self.nonce = nonce

class Blockchain:
    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        # Create the first block (genesis block)
        genesis_block = Block(0, "0", int(time.time()), "Genesis Block", self.calculate_hash(0, "0", int(time.time()), "Genesis Block", 0), 0)
        self.chain.append(genesis_block)

    def add_block(self, data):
        previous_block = self.chain[-1]
        index = previous_block.index + 1
        timestamp = int(time.time())
        previous_hash = previous_block.hash
        nonce = self.proof_of_work(index, previous_hash, timestamp, data)
        new_hash = self.calculate_hash(index, previous_hash, timestamp, data, nonce)
        new_block = Block(index, previous_hash, timestamp, data, new_hash, nonce)
        self.chain.append(new_block)

    def proof_of_work(self, index, previous_hash, timestamp, data):
        nonce = 0
        while True:
            new_hash = self.calculate_hash(index, previous_hash, timestamp, data, nonce)
            if new_hash[:4] == "0000":
                return nonce
            nonce += 1

    def calculate_hash(self, index, previous_hash, timestamp, data, nonce):
        value = str(index) + str(previous_hash) + str(timestamp) + str(data) + str(nonce)
        return hashlib.sha256(value.encode('utf-8')).hexdigest()

    def print_chain(self):
        for block in self.chain:
            print(vars(block))

if __name__ == '__main__':
    blockchain = Blockchain()
    blockchain.add_block("Transaction Data 1")
    blockchain.add_block("Transaction Data 2")
    blockchain.print_chain()
