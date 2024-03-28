class Scene {
  name = null;
  app = null;

  constructor(name, app) {
    Object.assign(this, { name, app });

    // вместо
    this.name = name;
    this.app = app;
  }

  init() {}
  start() {}
  update() {}
  stop() {}
}
