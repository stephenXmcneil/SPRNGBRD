def last_element(lst):
    """Return last item in list (None if list is empty.
    
        >>> last_element([1, 2, 3])
        3
        
        >>> last_element([]) is None
        True
    """
    
    if len(lst) > 0:
        last_item = lst[len(lst) - 1]
        return last_item
    else:
        return "None"