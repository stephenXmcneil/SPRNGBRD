// function createInstructor(firstName, lastName){
//     return {
//       firstName: firstName,
//       lastName: lastName
//     }
//   }


/* Write an ES2015 Version */
  function createInstructor(firstName, lastName){
    return {
      firstName,
      lastName
    }
  }

//   var favoriteNumber = 42;

//   var instructor = {
//     firstName: "Colt"
//   }
  
//   instructor[favoriteNumber] = "That is my favorite!"

/* Write an ES2015 Version */
var favoriteNumber = 42;

var instructor = {
  firstName: "Colt"
  [favoriteNumber] = "That is my favorite!"
}

// Write a function which generates an animal object. The function should accepts 3 arguments:

//         species: the species of animal (‘cat’, ‘dog’)
//         verb: a string used to name a function (‘bark’, ‘bleet’)
//         noise: a string to be printed when above function is called (‘woof’, ‘baaa’)

// Use one or more of the object enhancements we’ve covered.

// const d = createAnimal("dog", "bark", "Woooof!")
// // {species: "dog", bark: ƒ}
// d.bark()  //"Woooof!"

// const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
// // {species: "sheep", bleet: ƒ}
// s.bleet() //"BAAAAaaaa"

/* Write an ES2015 Version */
const createAnimal = (species, verb, noise) => {
    return animal = {
        species,
        [verb](){
            return noise;
        }
    }
    
}