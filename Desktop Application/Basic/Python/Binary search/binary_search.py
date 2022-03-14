"""python project: Binary search algorithm implementation by Fatimah Adwan"""

# Implementation of Binary search algorithm
# we will prove that binary search is faster than Naive search
# Naive search: it scan the entire list and ask if it is equal to the target
# if yes, return the index
# if no then return -1
# for Binary search O(log n)
# naive search O(n)

import random
import time

def naive_search(n, target):
    for i in range (len(n)):
        # for instance l = [1, 3 10, 12]
        if n[i] == target:
            return i
    return -1
    # Binary Search uses divide and conquer
    # we will leverage the fact that our list is sorted
def binary_search(n, target, low = None, high = None):
    if low is None:
        low = 0
    if high is None:
        high = len(n)-1
    if high < low:
        return -1
    # example n = [1,3,5,1o,13], should return 3
    midpoint = ( low+ high ) // 2 # 2
    # we check if n[midpoint] == target, and if not, we can find out if
    # target will be to the left or right of midpoint
    # we know everything to the left of midpoint is smaller than the midpoint
    # and everything to the right is larger
    
    if n[midpoint] == target: 
        return midpoint
    elif target < n[midpoint]:
        return binary_search(n, target, low, low-1)
    else:
        # target > n{midpoint]
        return binary_search( n, target, midpoint+1, high)
if __name__ == "__main__":
    n = [1, 3, 5, 10,]
    target = 5
    print(naive_search(n, target))
    print(binary_search(n, target))
    

    # checking the time to see which is better between binary and naive search algorithms.
    # build a sorted list of 2000
    length = 20000
    sorted_list = set()
    while len(sorted_list) < length:
        sorted_list.add(random.randint(-3*length, 3*length))
    sorted_list = sorted(list(sorted_list))

    start = time.time()
    for target in sorted_list:
        naive_search(sorted_list, target)
    end = time.time()
    print("naive search time:", (end-start), "seconds")

    start = time.time()
    for target in sorted_list:
        binary_search(sorted_list, target)
    end = time.time()
    print("Binary search time: ", (end-start), "seconds")


