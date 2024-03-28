class Mouse {
  under = false; // отслеживаем состояние мыши (находиться ли мыш над объектом)
  pUnder = false; // p --- previous предыдущее состояние мыши

  x = null; // координаты мыши
  y = null;

  pX = null; //  p --- previous  предыдущее координаты мыши
  pY = null;

  left = false; // отслеживание нажатия левой кнопки мыши
  pLeft = false; //  p --- previous  предыдущее состояние

  delta = 0; // отслеживание скролерра
  pDelta = 0;

  constructor(el) {
    this.el = el;

    const update = (e) => {
      this.x = e.clientX;
      this.y = e.clientY;
      this.delta = 0;
      this.under = true;
    };

    // отслеживание ряд событий мышки
    el.addEventListener("mousemove", (e) => {
      this.tick();

      update(e);
    });

    el.addEventListener("mouseenter", (e) => {
      this.tick();

      update(e);
    });

    el.addEventListener("mouseleave", (e) => {
      this.tick();

      update(e);
      this.under = false;
    });

    el.addEventListener("mousedown", (e) => {
      this.tick();

      update(e);

      if (e.button === 0) {
        this.left = true;
      }
    });

    el.addEventListener("mouseup", (e) => {
      this.tick();

      update(e);

      if (e.button === 0) {
        this.left = false;
      }
      if (e.button === 2) {
        this.left = false;
      }
    });

    // отслеживание скролла
    el.addEventListener("wheel", (e) => {
      this.tick();

      this.x = e.clientX;
      this.y = e.clientY;
      this.delta = e.deltaY > 0 ? 1 : -1;
      this.under = true;
    });

    el.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (e.button === 2) {
        this.tick();
        this.left = true;
        this.x = e.clientX;
        this.y = e.clientY;
        this.delta = e.deltaY > 0 ? 1 : -1;
        this.under = true;
      }
    });
  }

  tick() {
    // перезаписываем предыдущее состояние в текушее
    this.pX = this.x;
    this.pY = this.y;
    this.pUnder = this.under;
    this.pLeft = this.left;
    this.pDelta = this.delta;
    this.delta = 0;
  }
}
