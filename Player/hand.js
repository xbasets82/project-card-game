class Hand{
    constructor(cards){
        this.cards = cards;
    }
printHand = ()=>{
    for(let i = 0; i < this.cards.length; i++) {
        this.cards[i].showValue();
    }
}
}
export default Hand;