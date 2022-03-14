Binary search algorithm is an algorithm which helps us to sort an ordered list faster than just scanning through every single element and asking hey, is this it?, this it? or this?, which is very hectic and tiring, time wasting as well. 
This Algorithm works on the principle of divide and conquer. 
Binary search looks for a particular item by comparing the middle most item of the collection. 
If a match occurs, then the index of item is returned. 
If the middle item is greater than the item, then the item is searched in the sub-array to the left of the middle item. 
Otherwise, the item is searched for in the sub-array to the right of the middle item. 
This process continues on the sub-array as well until the size of the subarray reduces to zero.
Along the way, this will be compare with Naive search and prove that Binary search is way faster than Naive search
Naive patterns checks for all character of the main string to the pattern.
