def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    new_str = " "
    new_lst = phrase.split(" ")
    cap = [word.capitalize() for word in new_lst]
    return new_str.join(cap)