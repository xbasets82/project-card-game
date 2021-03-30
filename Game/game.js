class Game{
    constructor(deck){
        this.deckCards = deck.deckCards;
    }
     giveInitialCards(num) {
        let cards = [];
        for (let i = 0; i<num; i++){
            let index = Math.floor(Math.random()*(this.deckCards.length));
            cards.push(this.deckCards[index]);
            this.deckCards.splice(index,1);
        }
        return cards;
    }    
}
export default Game;