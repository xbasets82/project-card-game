class Card {
    constructor(suit,value,isJoker){
        this.suit = suit;
        this.value = value;
        this.isJoker = isJoker;
    }
     showValue= ()=> console.log(`${this.value} of ${this.suit}`);
}

export default Card;