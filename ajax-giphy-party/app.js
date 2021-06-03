console.log("Let's get this party started!");

const form = document.querySelector("#gifForm");
const input = form.querySelector("input");

form.addEventListener("submit", function(event){
    event.preventDefault();
    searchGif(input.value);
    console.log(input.value);
    input.value = '';
})

//Giphy Key: sloWarw6maqmPLmdipqi7ethOoTaRPsj

async function searchGif(term){
    let result = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=sloWarw6maqmPLmdipqi7ethOoTaRPsj&q=${term}&limit=25&offset=0&rating=g&lang=en`);
    console.log(result);
    console.log(result.data.data[0].url);
    createImg(result.data.data[0].url);
} 

function createImg(imgUrl){
    const newImg = document.createElement("img");
    newImg.setAttribute("src", imgUrl);
    append(newImg);
}

function append(element){
    const div = document.querySelector("#gifs");
    div.append(element);
}