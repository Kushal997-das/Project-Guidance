from blockchain import Blockchain

if __name__ == '__main__':
    blockchain = Blockchain()
    blockchain.add_block("Transaction Data 1")
    blockchain.add_block("Transaction Data 2")
    blockchain.print_chain()
