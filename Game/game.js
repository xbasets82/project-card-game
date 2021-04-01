class Game{
    constructor(deck,rules){
        this.deckCards = deck.deckCards;
        this.privateRules = rules;
        this.privateGameEnded = false; 
    }
     giveInitialCards() {
        let cards = [];
        for (let i = 0; i<this.privateRules.initialNumberCards ; i++){
            let index = Math.floor(Math.random()*(this.deckCards.length));
            cards.push(this.deckCards[index]);
            this.deckCards.splice(index,1);
        }
        return cards;
    } 
    giveCrupierInitialCards(){
        let cards = [];
        for (let i = 0; i<this.privateRules.initialCrupierNumberCards ; i++){
            let index = Math.floor(Math.random()*(this.deckCards.length));
            cards.push(this.deckCards[index]);
            this.deckCards.splice(index,1);
        }
        return cards;
    }   
    giveCard(isVisible){

    }
    get rules() { return this.privateRules}
    set rules(newRules) { this.privateRules = newRules}
    get gameEnded() {return this.privateGameEnded}
    set gameEnded(newGameEnded) {this.privateGameEnded = newGameEnded}
}
export default Game;