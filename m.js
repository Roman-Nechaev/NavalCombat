// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// // console.log(canvas.getContext("2d"));
// const ball = {
//   x: 200,
//   y: 200,
//   vx: 10,
//   vy: 10,
// };

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.beginPath();
//   ctx.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
//   ctx.fillStyle = "red";
//   ctx.fill();

//   ball.x += ball.vx;
//   ball.y += ball.vy;

//   if (ball.x < 0 || ball.x > canvas.width) {
//     ball.vx *= -1;
//   }
//   if (ball.y < 0 || ball.y > canvas.height) {
//     ball.vy *= -1;
//   }

//   requestAnimationFrame(draw);
// }

// draw();
