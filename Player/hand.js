class Hand {
  constructor(cards) {
    this.cards = cards;
    this.cardsGameValue = 0;
  }
  printHand = () => {
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].showValue();
    }
  };
  getHandValue = () => {
    let updatedGameValue = 0;  
    for (let i = 0; i < this.cards.length; i++) {
        updatedGameValue = updatedGameValue + this.cards[i].gameValue;
    }
    this.cardsGameValue = updatedGameValue;
    return this.cardsGameValue;
  };
}
export default Hand;
