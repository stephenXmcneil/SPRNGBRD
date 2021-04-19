const body = document.querySelector("body");

memeForm.addEventListener('submit', function(event,){
    event.preventDefault();
    let link = document.getElementById("imgLink").value;
    let text1 = document.getElementById("topText").value;
    let text2 = document.getElementById("bottomText").value;
    if((text1 || text2) && link ){
        makeDiv(text1, text2, link);

    }
        document.getElementById("topText").value = '';
        document.getElementById("bottomText").value = '';
        document.getElementById("imgLink").value = '';
});

function makeDiv(toptxt, btmtxt, img){
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const del = document.createElement("button");
    const pic = document.createElement("img");
    const uptxt = document.createElement("p");
    const dwntxt = document.createElement("p");
    div.classList.add("divContainer");
    div2.classList.add("divContainer2");
    div3.classList.add("divContainer2");
    del.classList.add("delBtn");
    pic.classList.add("scale");
    pic.setAttribute("src", img);
    uptxt.innerText = toptxt;
    uptxt.classList.add("topText");
    dwntxt.innerText = btmtxt;
    del.innerText = "X";
    dwntxt.classList.add("bottomText");
    div3.appendChild(uptxt);
    div3.appendChild(dwntxt);
    div.appendChild(div3);
    div2.appendChild(del);
    div.appendChild(div2);
    div.appendChild(pic);
    body.appendChild(div);

    del.addEventListener("click", function(event){
        console.log(event.target);
        const delButton = div.querySelector(".delBtn");
        const grandparent = delButton.parentElement;
        grandparent.parentElement.remove();
    });
}