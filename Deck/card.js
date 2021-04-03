class Card {
    constructor(suit,numValue,isJoker,litValue,isVisible,gameValue){
        this.suit = suit;
        this.numValue = numValue;
        this.litValue = litValue;
        this.isJoker = isJoker;
        this.privateIsVisible = isVisible;
        this.gameValue= gameValue;
    }
     showValue= ()=> console.log(`${this.litValue} of ${this.suit}`);    
     get isVisible() {return this.privateIsVisible}
     set isVisible(newIsVisible) {this.privateIsVisible = newIsVisible}

}
export default Card;