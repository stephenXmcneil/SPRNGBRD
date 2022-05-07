def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    ctr = 0
    new_list = []
        #store number of times a number appears using indeces to sort
        #ex @ index 1 store the int 2 because the number 1 shows up twice in the list
    # for item in nums:
    #     new_list[item] = nums.count(item)
    # print(new_list)

    # for idx in new_list:
    #     #find index containing the highest number and return it