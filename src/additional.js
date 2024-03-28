function getRandomBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
} // возвращает рандомное число

function getRandomFrom(...args) {
  const index = Math.floor(Math.random() * args.length);
  return args[index];
} // возвращает случайный элемент

function isUnderPoint(point, element) {
  const { left, top, width, height } = element.getBoundingClientRect();
  const { x, y } = point;

  return left <= x && x <= left + width && top <= y && y <= top + height;
} // поиск перетаискомого элемента

function addEventListener(el, ...args) {
  el.addEventListener(...args);
  return () => el.removeEventListener(...args);
}
