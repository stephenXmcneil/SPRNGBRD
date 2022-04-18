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

const categories = []
const CATEGORY_COUNT = 6
const QUESTION_COUNT = 5
const CATEGORY_FETCH_LIMIT = 100
let num = 0 //to give each box a unique id to ref 
/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
const catIds = []
async function getCategoryIds() {
  const response = await axios.get(`https://www.jservice.io/api/categories?count=${CATEGORY_FETCH_LIMIT}`)
  if (response.data && Array.isArray(response.data)) {
    for (let i = 1; i <= CATEGORY_COUNT; i++) {
      catIds.push(response.data[getRandomNum(CATEGORY_FETCH_LIMIT)].id)
    }
  }
  return catIds
}

function getRandomNum(limit) {
  return Math.floor(Math.random() * limit) + 1
}

async function getCategory(id) {
  const category = await axios.get(`https://www.jservice.io/api/category?id=${id}`)
  const categoryObj = {
    id: category.data.id,
    title: category.data.title,
    clues: []
  }
  for (let i = 0; i < QUESTION_COUNT; i++) {
    const clue = {
      question: category.data.clues[i].question,
      answer: category.data.clues[i].answer,
      showing: null
    }
    categoryObj.clues.push(clue)
  }
  console.log(categoryObj)
  return categoryObj
}

async function makeObject() {
  for (let i = 0; i <= catIds.length; i++) {
    // make an object
    const obj1 = {} // overall object container for a category
    const obj2 = {} // container for question, answer and showing
    const result = await axios.get(`https://www.jservice.io/api/categories?id=${ids}`)
    const cluesResult = await axios.get(`https://jservice.io/api/clues?category=${ids}`)
    // get info from responses
    // use response data to pass arguments
    obj1.title = result.data[i].title
    // console.log(result.data[i].title)
    // console.log(cluesResult.data[0])
    // function to populate clues array
    function Clues(question, answer, showing) {
      this.question = question
      this.answer = answer
      this.showing = showing
    }

    const container = new Clues(cluesResult.data[0].question, cluesResult.data[0].answer, cluesResult.data[0].showing)
    obj1.clues = {}

    // push to object
    categories.push(obj1)
    // console.log(categories)
  }
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

async function createJeopardyTable() {
  console.log('Cats', categories)
  $('body').append('<table></table>')
  const CATEGORY_TRACKER = 4
  const CLUES_TRACKER = 4
  const $table = $('table')
  const tr = '<tr></tr>'
  const thead = '<thead></thead>'
  const tbody = '<tbody></tbody>'
  const th = '<th></th>'
  num = 0
  $(thead).appendTo($table)
  const $thead = $('thead')
  $thead.append(tr)
  $table.append(tbody)

  //getting the titles
  for (let i = 0; i < categories.length; i++) {
    const title = categories[i].title
    const $headerCat = $('<th>')
    const loadedCat = $headerCat.text(`${title}`)
    $('tr').append(loadedCat)
  }

  //get the questions
  for (let i = 0; i < 5; i++) {
    let $newTr = $('<tr>')
    $('tbody').append($newTr)

    for (let j = 0; j < 6; j++) {
      let $newTd = $('<td>')
      $newTd.addClass(`${num}`)
      num++
      let answerTxt = categories[j].clues[i].answer
      const $divAnswer = $(`<p id="answer" class="hide">${answerTxt}</p>`)
      $newTd.append($divAnswer)

      let questionTxt = categories[j].clues[i].question
      const $divQuestion = $(`<p id="question" class="hide">${questionTxt} ?</p>`)
      $newTd.append($divQuestion)

      const $questionMark = $('<p id="qmark">?</p>')
      $newTd.append($questionMark)

      $newTd.on("click", handleClick)

      $newTr.append($newTd)
    }

  }
  //class containing the styles
  $('th').addClass('headerBox')
  $('td').addClass('blueBox')
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {

  // Get question mark and add class hide to it
  $(this).find('#qmark').addClass('hide')

  if ($(this).find('#question').hasClass('hide')) {
    $(this).find('#question').removeClass('hide')

  } else if ($(this).find('#answer').hasClass('hide')) {
    $(this).find('#question').addClass('hide2')
    $(this).find('#question').removeClass('hide')
    $(this).find('#answer').removeClass('hide')
  }

  // showLoadingView()
  // hideLoadingView()
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  console.log("hello")
  $('body').append('<button>Reset</button>')
  num = 0

  for (let i = 0; i <= 29; i++) {
    let $x = $(`td.${i}.blueBox`)
    console.log("emptying:", $x)
    $x.empty()
    console.log("adding loading img")
    let imgSrc = 'https://i.giphy.com/media/L05HgB2h6qICDs5Sms/200w.webp';
    let $img = $('<img>')
    $img.attr('src', imgSrc)
    $x.append($img)
  }

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  const $allLoadingImgs = $('img')
  for (let img of $allLoadingImgs) {
    img.remove()
  }

}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

const $body = $('body')
const $startBtn = $('<button>Start</button>')
$body.append($startBtn)

$($startBtn).click(function () {
  $('thead').empty()
  $('tbody').empty()
  setupAndStart()
  showLoadingView()
  hideLoadingView()

})


async function setupAndStart() {
  const ids = await getCategoryIds()
  for (let i = 0; i < ids.length; i++) {
    categories.push(await getCategory(ids[i]))
  }
  await createJeopardyTable()

}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
//setupAndStart()
