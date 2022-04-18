// categories is the main data structure for the app; it looks like this:
//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds () {
  const numOfIds = 99
  const idList = [] // list of possible ids
  const gameCategories = [] // list of 6 categories ids that will be used
  const response = await axios.get('https://www.jservice.io/api/categories?count=100')

  // populate list with <numOfIds> category ids
  for (let i = 0; i < numOfIds; i++) {
    idList[i] = [response.data[i].id]
  }
  // get 6 random category ids from list of ids
  for (let i = 0; i < 6; i++) {
    const getRand = Math.floor(Math.random() * 100)
    gameCategories.push(idList[getRand])
  }
  return gameCategories
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategoryData (catId) {
  // take id
  // create an object
  const obj = {}
  // in the object create a key val pair
  // pull from the category data to set the title and the title of the category
  // in the object create another key val pair for clues and an array of objects called clues
  // in the clues array create a key val pair called question and answer for each index
  obj.title = 'category title'
  obj.clues = [{ question: 'question data', answer: 'answer data' }]

  // retrieve data from catId
  // set it as the category title
}

function createObj (title) {
  const obj1 = {}
  const clue = ['bob', 'shirley']
  const arr = ['title', 'clues']
  const arr2 = [title, clue]
  for (const item of arr) {
    for (let i = 0; i < arr2.length; i++) {
      obj1[item][i] = info
    }
  }
  return obj1
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable () {
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick (evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView () {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView () {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart () {
  const categoryIds = await getCategoryIds()
  // get the data for each
  // access the category
  // go to the first category from categoryIds array
  console.log(categoryIds)
  const data = await getCategoryData(categoryIds)
  //
  for (const id of randomID) {
    console.log(id)
    const response = await axios.get(`https://www.jservice.io/api/clues?category=${id}`)
    // getCategory(response.data)
    console.log(response)
    console.log(response.data)
  }
  // getCategory(randomID);
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
