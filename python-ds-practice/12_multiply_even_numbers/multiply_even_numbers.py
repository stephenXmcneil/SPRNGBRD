def multiply_even_numbers(nums):
    """Multiply the even numbers.
    
        >>> multiply_even_numbers([2, 3, 4, 5, 6])
        48
        
        >>> multiply_even_numbers([3, 4, 5])
        4
        
    If there are no even numbers, return 1.
    
        >>> multiply_even_numbers([1, 3, 5])
        1
    """
    new_lst = []
    strt = 1
    for num in nums:
        if num%2 == 0:
            new_lst.append(num) 
    for num in new_lst:
        strt *= num
    return strt           
