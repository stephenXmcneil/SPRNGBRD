// What does the following code return?

new Set([1,1,2,2,3,4]) // [1,2,3,4]


// What does the following code return?

[...new Set("referee")].join("") // 'ref'   


// What does the Map m look like after running the following code?

let m = new Map();
m.set([1,2,3], true); // [[1,2,3],[true]]
m.set([1,2,3], false); // [[1, 2, 3],[false]]

//Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate

hasDuplicate([1,3,2,1]) // true
hasDuplicate([1,5,-1,4]) // false

const hasDuplicate = (array) => {
    const noDuplicates = new Set(array);
    if(array.length > noDuplicates.size){
        return true;
    }
    return false;
}

// Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.

// vowelCount('awesome') // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
// vowelCount('Colt') // Map { 'o' => 1 }

const vowelCount = (string) => {
    const newMap = new Map()
    for( let vowel of string){
        if("aeiou".indexOf(vowel) !== -1){
           //i keep getting undefined but where to i declare and initialize my variable so that every vowel isnt reset each time through the loop
            if(newMap.get(vowel) >= 1){
                console.log(newMap.get(vowel));
                console.log(newMap.get(vowel), "greater than 1");
                newMap.set(vowel, newMap.get(vowel) + 1);
            } else {
                console.log(newMap.get(vowel), "otherwise");
                newMap.set(vowel, 1)
            }
        }
    } return newMap;
}