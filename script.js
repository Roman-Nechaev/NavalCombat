const app = new Application({
  preparation: PreparationScene,
  computer: ComputerScene,
  onLine: OnlineScene,
});

app.start("preparation");
