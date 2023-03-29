let game = 1;
// Game 1: just translate to Hungarian
let task = document.getElementById("task");
let ansvers = ["1", "2", "3", "4"];
let cardText = "";
let correct = 0;
let dragged = false;

let data = [
    //In the form: [english, hungarian]
    ["iron", "vas"],
    ["putter", "putter"],
    ["golf ball", "golflabda"],
    ["bat", "ütő"],
    ["hockey stick", "hokiütő"],
    ["chess", "sakk"],
    ["motocross", "cross motorozás"],
    ["referee", "játékvezető (pl: kosárlabda, baseball, hoki, stb...)"],
    ["run", "futam"],
    ["tennis", "tenisz"],
    ["table tennis", "ping pong"],
    ["water polo", "vízilabda"],
    ["field", "pálya"],
    ["final", "döntő"],
    ["tournament", "bajnokság"],
    ["marathon", "maraton"],
    ["race", "verseny"],
    ["Olympics", "Olimpiai játékok"],
    ["boxing glove", "boxkesztyű"],
    ["swimming pool", "úszómedence"],
    ["pass", "passzol"],
    ["net", "háló"],
    ["surf", "szörf"],
    ["basket", "kosár"],
    ["basketball", "kosárlabda"],
    ["wrestling", "bírkózás"],
    ["bleed", "vérzés"],
    ["break", "törés"],
    ["bruise", "zúzódás"],
    ["burn", "égés"],
    ["cut", "vágás"],
    ["dislocate", "kificamít"],
    ["sprain", "ficam"],
    ["tear", "izomszakadás"],
    ["running track", "futópálya"],
    ["tennis racket", "teniszütő"],
    ["golf club", "golfütő"],
    ["board", "palánk"],
    ["googles", "úszószemüveg"],
    ["gym mat", "tornaszőnyeg"],
    ["helmet", "bukósisak"],
    ["kit", "felszerelés"],
    ["pad", "lábszárvédő"],
    ["paddle", "evező"],
    ["pole", "rúd"],
    ["sail", "vitorla"],
    ["swimming cap", "úszósapka"],
    ["coach", "edző"],
    ["fencing", "vívás"],
    ["team captain", "csapatkapitány"],
    ["umpire", "játékvezető (pl: foci, krikett, boxing, stb...)"],
    ["goalkeeper", "kapus"],
    ["draw", "döntetlen"],

]

function refresh(){
    for(let i=0; i < 4; i++){
        let ansver = document.getElementById("ansver" + (i + 1));
    
        ansver.innerText = ansvers[i];
        
        ansver.classList.remove("wrong");
        ansver.classList.remove("correct");
    }

    let card = document.getElementById("card");
    if(card){
        card.remove();

    }

    makeCard(cardText);

}

function chooseCards(){
    let choices = new Set();
    let i = 0;
    while(choices.size < 4){
        let num = Math.floor( Math.random() * data.length );
        choices.add(num);

        i++;

    }
    choices = Array.from(choices);
    choices = choices.map((val) => {
        return data[val];
        
    });

    choices.forEach((val, i) => {
        ansvers[i] = val[1];

    });

    correct = Math.floor(Math.random()*4);
    cardText = choices[correct][0];

}

function refreshDrop(){
    let dp = dragged ? "block" : "none";
    for(let i=0; i<4; i++){
        let sensor = document.getElementById("sensor" + (i + 1));
        sensor.style.display = dp;

    }

}

function makeCard(text){
    let card = document.createElement("div");
    card.className = "card";
    card.id = "card";
    card.innerText = text;
    card.draggable = true;
    card.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", event.target.id);
        dragged = true;
        refreshDrop();

    });

    document.getElementById("question").appendChild(card);

}

function validate(){
    chooseCards();
    refresh();

}

for(let i=0; i<4; i++){
    let sensor = document.getElementById("sensor" + (i + 1));
    let ansver = document.getElementById("ansver" + (i + 1));

    sensor.addEventListener("dragover", (event) => {
        event.preventDefault();

    });
    sensor.addEventListener("drop", (event) => {
        let element = document.getElementById(event.dataTransfer.getData("text/plain"));
        element.classList.remove("p1");
        element.classList.remove("p2");
        element.classList.remove("p3");
        element.classList.remove("p4");
        element.classList.add(`p${i+1}`);
        task.appendChild(element);

        dragged = false;
        refreshDrop();

        if(correct == i){
            ansver.classList.add("correct");

        }else{
            ansver.classList.add("wrong");
        }
        console.log(ansver.classList);
    })

}

validate();