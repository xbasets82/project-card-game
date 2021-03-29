class Player {
  constructor(name, order, color) {
    this.name = name;
    this.order = order;
    this.color = color;
  }
  identify = () =>
    console.log(
      `${this.name} is player number ${this.order}, color ${this.color}`
    );
}

export default Player;
