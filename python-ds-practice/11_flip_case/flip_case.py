def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    new_str = ""
    for char in phrase:
        if to_swap == char.lower():
            ltr = char.swapcase()
            new_str += ltr
        else:
            new_str += char
        
    return new_str