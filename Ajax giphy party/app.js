console.log("Let's get this party started!");

const form = document.querySelector("#gifForm");
const input = form.querySelector("input");

//take user input
form.addEventListener("submit", function(event){
    event.preventDefault();
    searchGif(input.value);
    //console.log(input.value);
    input.value = '';
})

//Giphy Key: sloWarw6maqmPLmdipqi7ethOoTaRPsj

//request an img based on user input
async function searchGif(term){
    let result = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=sloWarw6maqmPLmdipqi7ethOoTaRPsj&q=${term}&limit=25&offset=0&rating=g&lang=en`);
    //console.log(result);
    //console.log(result.data.data[0].url);
    createImg(result.data.data[0].images.original.url);
} 

//create img from response
function createImg(imgUrl){
    const newImg = document.createElement("img");
    newImg.setAttribute("src", imgUrl);
    newImg.setAttribute("class", "image");
    append(newImg);
}

//add response img to div
function append(element){
    const div = document.querySelector("#gifs");
    div.append(element);
}

//delete all the img in the search list
const del = document.querySelector("#delete");

del.addEventListener("click", function(){ //listen for click on delete button
    const div = document.querySelector("#gifs");
    const images = div.querySelectorAll("img");
    const list = Array.from(images);
    for(let img of list){
        img.remove();
    }   
});