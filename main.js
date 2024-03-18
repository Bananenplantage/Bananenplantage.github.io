//JSON
let text = '{"cards":[' +
'{"path":"images/black.png","name":"black" },' +
'{"path":"images/blue.png","name":"blue" },' +
'{"path":"images/bordeaux.png","name":"bordeaux" },' +
'{"path":"images/cyan.png","name":"cyan" },' +
'{"path":"images/green.png","name":"green" },' +
'{"path":"images/grey.png","name":"grey" },' +
'{"path":"images/purple.png","name":"purple" },' +
'{"path":"images/red.png","name":"red" },' +
'{"path":"images/yellow.png","name":"yellow" }]}';

let json_obj = JSON.parse(text); 
const gridContainer = document.querySelector(".grid-wrapper");
//let cards_elements = document.querySelectorAll('.card');
let lock_board = false;
let first_card, second_card;
let cards = [...json_obj.cards, ...json_obj.cards];
const max_pairs = cards.length/2;
let no_pairs_found = 0;
let game_over = false;
let time = 0;

shuffleCards();
create_cards();

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function create_cards(){
  for (let card of cards) {
    const sceneElement = document.createElement("div");
    const cardElement = document.createElement("div");

    sceneElement.classList.add("scene");
    sceneElement.classList.add("scence--card");
    cardElement.classList.add("card");

    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="card__face card__face--front">
      </div>
      <div class="card__face card__face--back" style="background-image:url('`+card.path+`');"></div>
    `;

    cardElement.addEventListener('click', function() {
      if (!lock_board && !(cardElement.getAttribute("is_locked") === "yes")){
        if (!first_card){
          first_card = cardElement;
          cardElement.classList.toggle('is-flipped');
        }
        else if (!second_card){
          if(cardElement === first_card){
            console.log("Clicked on same card.");
          }
          else{
            cardElement.classList.toggle('is-flipped');
            lock_board = true;
            //second_card = cardElement;

            //check cards
            if(first_card.getAttribute("data-name") === cardElement.getAttribute("data-name")){
              console.log("MATCH!");
              no_pairs_found += 1;

              if (!(no_pairs_found === max_pairs)){
                first_card.setAttribute("is_locked", "yes");
                cardElement.setAttribute("is_locked", "yes");
                first_card = null;
                lock_board = false;
              }
              else{
                game_over = true;
                document.querySelector("#countdown").innerHTML = "GAME OVER! You took: "+ time + " Seconds";
              }
              
            }
            else{
              setTimeout(() => {
                first_card.classList.toggle('is-flipped');  
                cardElement.classList.toggle('is-flipped');
                lock_board = false;
                first_card = null;
                //second_card = null;
              }, 1000);
            }
          }
        }
        else{
          console.log("ERROR")
        }
      }
    });

    sceneElement.appendChild(cardElement);
    gridContainer.appendChild(sceneElement);
    //cardElement.addEventListener("click", flipCard);
  }
}

function restart(){
  document.querySelector("#countdown").innerHTML = "RESTARTING";
  time = 0;
  game_over = false;
  lock_board = false;
  first_card = null;
  no_pairs_found = 0;

  gridContainer.innerHTML = "";
  // Shuffle cards
  shuffleCards();
  create_cards();
  // Toggle all cards
}


setInterval(function () {
    if (game_over){
      time = 0
    }
    else{
      time = time + 1
      document.querySelector("#countdown").innerHTML = "Time elapsed: " +  time + " Seconds";
    }
}, 1000);