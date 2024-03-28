class Battlefield {
  ships = [];
  shots = [];

  #martix = null;
  #changed = true;

  // матрица игрового поля
  get matrix() {
    if (!this.#changed) {
      this.#martix;
    }

    const matrix = [];

    for (let y = 0; y < 10; y++) {
      const row = [];

      for (let x = 0; x < 10; x++) {
        const item = {
          x,
          y,
          ship: null,
          free: true,
        };

        row.push(item);
      }
      matrix.push(row);
    }

    for (const ship of this.ships) {
      if (!ship.placed) {
        continue;
      }

      const { x, y } = ship;
      const dX = ship.direction === "row";
      const dY = ship.direction === "column";

      for (let i = 0; i < ship.size; i++) {
        const cx = x + dX * i;
        const cy = y + dY * i;

        const item = matrix[cy][cx];
        item.ship = ship;
      }

      for (let y = ship.y - 1; y < ship.y + ship.size * dY + dX + 1; y++) {
        for (let x = ship.x - 1; x < ship.x + ship.size * dX + dY + 1; x++) {
          if (this.inField(x, y)) {
            const item = matrix[y][x];
            item.free = false;
          }
        }
      }
    }

    this.#martix = matrix;
    this.#changed = false;

    return this.#martix;
  }

  // проверка все ли корабли на поле
  get complete() {
    if (this.ships.length !== 10) {
      return false;
    }

    for (const ship of this.ships) {
      if (!ship.placed) {
        return false;
      }
    }
    return true;
  }

  // метод проверки лежат ли корабли в приделах игрового поля
  inField(x, y) {
    const isNumber = (n) =>
      parseInt(n) === n && !isNaN(n) && ![Infinity, -Infinity].includes(n);

    if (!isNumber(x) || !isNumber(y)) {
      return false;
    }

    return 0 <= x && x < 10 && 0 <= y && y < 10;
  }

  // добавить корабль
  addShip(ship, x, y) {
    // проверяем если корабль есть то не корабль добавлен не будет в противном случае добавлем
    if (this.ships.includes(ship)) {
      return false;
    }

    this.ships.push(ship);

    if (this.inField(x, y)) {
      const dx = ship.direction === "row";
      const dy = ship.direction === "column";

      let placed = true;

      for (let i = 0; i < ship.size; i++) {
        const cx = x + dx * i;
        const cy = y + dy * i;

        if (!this.inField(cx, cy)) {
          placed = false;
          break;
        }

        const item = this.matrix[cy][cx];
        if (!item.free) {
          placed = false;
          break;
        }
      }

      if (placed) {
        Object.assign(ship, { x, y });
      }
    }

    this.#changed = true;
    return true;
  }

  // убрать корабль
  removeShip(ship) {
    if (!this.ships.includes(ship)) {
      // проверяем если нет корабля то возвращаем false
      return false;
    }
    // находим индекс корабля
    const index = this.ships.indexOf(ship);
    // удаляем корабыль из масива выбранного по индексу
    this.ships.splice(index, 1);

    ship.x = null;
    ship.y = null;
    // возвращаем  true в случае успешного удаления
    this.#changed = true;

    return true;
  }

  // убрать все корабли
  removeAllShips() {
    const ships = this.ships.slice(); // делаем копию массива кораблей

    for (const ship of ships) {
      this.removeShip(ship);
    }

    return ships.length; // возвращаем кол-ство удаляемых кораблей
  }

  addShot() {
    this.#changed = true;
  }

  removeShot() {
    this.#changed = true;
  }

  removeAllShots() {
    const shots = this.shots.slice(); // делаем копию массива кораблей

    for (const shot of shots) {
      this.removeShot(shot);
    }

    return shots.length; // возвращаем кол-ство удаляемых кораблей
  }

  // случайная расстановка кораблей
  randomize(ShipClass = Ship) {
    this.removeAllShips();

    for (let size = 4; size >= 1; size--) {
      for (let n = 0; n < 5 - size; n++) {
        const direction = getRandomFrom("row", "column");
        const ship = new ShipClass(size, direction);

        while (!ship.placed) {
          const x = getRandomBetween(0, 9);
          const y = getRandomBetween(0, 9);

          this.removeShip(ship);
          this.addShip(ship, x, y);
        }
      }
    }
  }
}
