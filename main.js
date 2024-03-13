var cards = document.querySelectorAll('.card');
var flipped_cards = 0;
var first_card = null;
var second_card = null;
var my_cards = ["😍","🤡", "🐸", "❤", "🏆"];
const const_cards = my_cards + my_cards;
console.log(const_cards) 
const cards_length = 10;


// [...cards].forEach((card)=>{
//     card.innerHTML = "🥶";
// });

[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
    
    flipped_cards +=1
    
    if (flipped_cards == 0){
        first_card = card;
        flipped_cards = 1
    }
    else if (flipped_cards == 1){
        second_card = card;
        flipped_cards = 0;
    }
    else{
        console.log("ERROR")
    }
    console.log(flipped_cards)
  });
});

var time = 0;
setInterval(function () {
    time = time + 1
    document.getElementById("countdown").innerHTML = time
}, 1000);