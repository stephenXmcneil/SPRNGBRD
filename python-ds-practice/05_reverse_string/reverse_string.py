def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    saved_list = list(phrase)
    val = ""
    for i in saved_list[::-1]:
        val += i
    return val