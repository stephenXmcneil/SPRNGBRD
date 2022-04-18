
let categories = [];
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;

// A shuffle function using Durstenfeld's shuffle with ES6 destructuring.
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds(numCategories) {
    const catIdArr = [];
    const categories = await axios.get(`https://jservice.io/api/categories`,
        { params: { count: 100 } });
    const randCatIds = shuffleArray(categories.data);
    for (let i = 0; i < numCategories; i++) {
        catIdArr.push(randCatIds[i].id);
    }

    return catIdArr;
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

async function getCategory(catId) {
    const catClues = await axios.get(`https://jservice.io/api/clues`,
        { params: { category: catId } });
    const randClues = shuffleArray(catClues.data);

    // cluesArr = first NUM_QUESTIONS_PER_CAT from randClues
    const cluesArr = randClues.splice(0, NUM_QUESTIONS_PER_CAT);

    const title = cluesArr[0].category.title;
    const clues = cluesArr.map((clue) => {
        const { question, answer } = clue;
        return {
            question,
            answer,
            showing: null
        };
    });

    return {
        title,
        clues
    };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    hideLoadingView();

    // fill categories th with data
    const allThs = document.querySelectorAll('#jeopardy th');
    for (let i = 0; i < allThs.length; i++) {
        allThs[i].innerHTML = categories[i].title;
    }

    // fill tds with question marks
    const allTds = document.querySelectorAll('#jeopardy td');
    for (let td of allTds) {
        td.innerHTML = '<span>?</span>';
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(e) {
    if (e.target.tagName.toLowerCase() === 'td' && e.target.innerHTML !== '') {
        e.target.className = '';
        const col = e.target.id[0];
        const row = e.target.id[2];

        if (categories[col].clues[row].showing === null) {
            categories[col].clues[row].showing = 'question';

            e.target.innerHTML = categories[col].clues[row].question;
        } else if (categories[col].clues[row].showing === 'question') {
            categories[col].clues[row].showing = 'answer';
            e.target.innerHTML = categories[col].clues[row].answer;
        }
    }
}

/** Create the board with loading spinners
 * 
 */

function showLoadingView() {
    const body = document.querySelector('body');
    const table = document.createElement('table');
    table.id = 'jeopardy';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for (let i = 0; i < NUM_CATEGORIES; i++) {
        const th = document.createElement('th');
        const img = document.createElement('img');
        img.src = 'https://i.giphy.com/media/L05HgB2h6qICDs5Sms/200w.webp';
        th.append(img);
        tr.append(th);
    }
    thead.append(tr);
    table.append(thead);

    const tbody = document.createElement('tbody');
    for (let row = 0; row < NUM_QUESTIONS_PER_CAT; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < NUM_CATEGORIES; col++) {
            const td = document.createElement('td');
            td.id = `${col}-${row}`;
            td.className = 'question';
            tr.append(td);
        }
        tbody.append(tr);
    }
    table.append(tbody);
    body.append(table);
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    const loadingImgs = document.querySelectorAll('#jeopardy img');
    for (let img of loadingImgs) {
        img.remove();
    }
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    categories.length = 0;
    const lastTable = document.querySelector('#jeopardy') || false;
    if (lastTable) {
        lastTable.remove();
    }
    showLoadingView();

    const catIds = await getCategoryIds(NUM_CATEGORIES);

    // add categories/clues data to Global var 'categories' array
    for (let id of catIds) {
        categories.push(await getCategory(id));
    }

    fillTable();
}

// Generate header and start/reset HTML
const body = document.querySelector('body');

const h1 = document.createElement('h1');
h1.textContent = 'Jeopardy!';
body.append(h1);

// const header = document.createElement('header');

const newBtn = document.createElement('button');
newBtn.textContent = 'Start!';
newBtn.className = 'start-btn';
// body.append(newBtn);

// header.append(newBtn);
body.append(newBtn);


/** On click of start / restart button, set up game. */

// TODO
newBtn.addEventListener('click', () => {
    newBtn.innerHTML = 'Restart <span>&#10227;</span>';
    newBtn.className = 'restart-btn';

    setupAndStart();
});

/** On page load, add event handler for clicking clues */

// TODO
body.addEventListener('click', handleClick);
