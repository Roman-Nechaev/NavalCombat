class ShipView extends Ship {
  div = null;

  image = null;

  startX = null;
  startY = null;

  constructor(size, direction, startX, startY) {
    super(size, direction);

    const div = document.createElement("div");
    div.classList.add("ship");

    // const image = document.createElement("img");
    // image.classList.add("ship-icon");
    // image.src = `../../public/model/a${size}.png`;
    // image.alt = "Ship icon";
    // div.appendChild(image);

    Object.assign(this, { div, startX, startY });
    this.div = div;
    // this.image = image;
    this.setDirection(direction, true);
  }

  // расстановка караблей
  setDirection(newDirection, force = false) {
    if (!force && this.direction === newDirection) {
      return false;
    }
    this.div.classList.remove(`ship-${this.direction}-${this.size}`);

    // this.image.classList.remove(`icon-${this.direction}`);
    this.direction = newDirection;
    this.div.classList.add(`ship-${this.direction}-${this.size}`);

    // this.image.classList.add(`icon-${this.direction}`);

    return true;
  }

  toggleDirection() {
    const newDirection = this.direction === "row" ? "column" : "row";
    this.setDirection(newDirection);
  }

  isUnder(point) {
    return isUnderPoint(point, this.div);
  }
}
