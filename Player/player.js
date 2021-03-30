class Player {
  constructor(name, order, color, hand) {
    this.name = name;
    this.order = order;
    this.color = color;
    this.hand = hand;
  }
  identify = () =>
    console.log(
      `${this.name} is player number ${this.order}, color ${this.color}`
    );
}

export default Player;
