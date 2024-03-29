const shipDatas = [
  { size: 4, direction: "row", startX: 10, startY: 345 },
  { size: 3, direction: "row", startX: 10, startY: 390 },
  { size: 3, direction: "row", startX: 120, startY: 390 },
  { size: 2, direction: "row", startX: 10, startY: 435 },
  { size: 2, direction: "row", startX: 88, startY: 435 },
  { size: 2, direction: "row", startX: 167, startY: 435 },
  { size: 1, direction: "row", startX: 10, startY: 480 },
  { size: 1, direction: "row", startX: 55, startY: 480 },
  { size: 1, direction: "row", startX: 100, startY: 480 },
  { size: 1, direction: "row", startX: 145, startY: 480 },
];

class PreparationScene extends Scene {
  draggedShip = null;
  draggetOffSetX = 0;
  draggetOffSetY = 0;

  removeEventListeners = [];

  init() {
    // this.randomize = this.randomize.bind(this);
    // this.manually = this.manually.bind(this);
    // this.startComputer = this.startComputer.bind(this);

    this.manually();
  }

  start() {
    this.removeEventListeners = [];

    document
      .querySelectorAll(".app-actions")
      .forEach((el) => el.classList.add("hidden"));

    document
      .querySelector('[data-scene="preparation"]')
      .classList.remove("hidden");

    const randomizeButton = document.querySelector('[data-action="randomize"]');
    const manuallyButton = document.querySelector('[data-action="manually"]');
    const simpleButton = document.querySelector('[data-computer="simple"]');
    const middleButton = document.querySelector('[data-computer="middle"]');
    const hardButton = document.querySelector('[data-computer="hard"]');

    this.removeEventListeners.push(
      addEventListener(randomizeButton, "click", () => this.randomize())
    );

    this.removeEventListeners.push(
      addEventListener(manuallyButton, "click", () => this.manually())
    );
    this.removeEventListeners.push(
      addEventListener(simpleButton, "click", () =>
        this.startComputer("simple")
      )
    );
    this.removeEventListeners.push(
      addEventListener(middleButton, "click", () =>
        this.startComputer("middle")
      )
    );
    this.removeEventListeners.push(
      addEventListener(hardButton, "click", () => this.startComputer("hard"))
    );
  }

  stop() {
    for (const removeEventListener of this.removeEventListeners) {
      removeEventListener();
    }

    this.removeEventListeners = [];
  }

  update() {
    const { mouse, player } = this.app;

    // потенциально хотим перетаскивать корабль
    if (!this.draggedShip && mouse.left && !mouse.pLeft) {
      const ship = player.ships.find((ship) => ship.isUnder(mouse));

      if (ship) {
        const shipRect = ship.div.getBoundingClientRect();

        this.draggedShip = ship;
        this.draggetOffSetX = mouse.x - shipRect.left;
        this.draggetOffSetY = mouse.y - shipRect.top;

        ship.x = null;
        ship.y = null;
      }
    }

    //перетаскивание
    if (mouse.left && this.draggedShip) {
      const { left, top } = player.root.getBoundingClientRect();
      const x = mouse.x - left - this.draggetOffSetX;
      const y = mouse.y - top - this.draggetOffSetY;

      this.draggedShip.div.style.left = `${x}px`;
      this.draggedShip.div.style.top = `${y}px`;
    }

    // бросание
    if (!mouse.left && this.draggedShip) {
      const ship = this.draggedShip;
      this.draggedShip = null;

      const { left, top } = ship.div.getBoundingClientRect();
      const { width, height } = player.cells[0][0].getBoundingClientRect();

      const point = {
        x: left + width / 2,
        y: top + height / 2,
      };

      const cell = player.cells
        .flat()
        .find((cell) => isUnderPoint(point, cell));

      if (cell) {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);

        player.removeShip(ship);
        player.addShip(ship, x, y);
      } else {
        player.removeShip(ship);
        player.addShip(ship);
      }
    }

    // Вращение
    if (this.draggedShip && mouse.delta) {
      this.draggedShip.toggleDirection();
    }

    if (player.complete) {
      document.querySelector('[data-computer="simple"]').disabled = false;
      document.querySelector('[data-computer="middle"]').disabled = false;
      document.querySelector('[data-computer="hard"]').disabled = false;
    } else {
      document.querySelector('[data-computer="simple"]').disabled = true;
      document.querySelector('[data-computer="middle"]').disabled = true;
      document.querySelector('[data-computer="hard"]').disabled = true;
    }
  }

  randomize() {
    const { player } = this.app;
    player.randomize(ShipView);

    for (let i = 0; i < 10; i++) {
      const ship = player.ships[i];
      ship.startX = shipDatas[i].startX;
      ship.startY = shipDatas[i].startY;
    }
  }

  manually() {
    const { player } = this.app;

    player.removeAllShips();

    for (const { size, direction, startX, startY } of shipDatas) {
      const ship = new ShipView(size, direction, startX, startY);
      player.addShip(ship);
    }
  }

  startComputer(level) {
    console.log(level);

    this.app.start("computer");
  }
}
