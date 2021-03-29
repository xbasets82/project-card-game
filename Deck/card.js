class Card {
    constructor(suit,numValue,isJoker,litValue){
        this.suit = suit;
        this.numValue = numValue;
        this.litValue = litValue;
        this.isJoker = isJoker;
    }
     showValue= ()=> console.log(`${this.litValue} of ${this.suit}`);    
}


export default Card;