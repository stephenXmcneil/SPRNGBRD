def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    return phrase.capitalize()

    # new_str = ""
    # upper = ""
    # if type(phrase) == str:
    #     for char in phrase:
    #         if phrase[0]:
    #             upper = char.upper()
    #             new_str += upper
    #         else:
    #             new_str += char

    # return new_str