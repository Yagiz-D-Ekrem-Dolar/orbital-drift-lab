const canvas = document.querySelector("#world");
const ctx = canvas.getContext("2d");

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#71e2c2";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 28, 0, Math.PI * 2);
  ctx.fill();
  requestAnimationFrame(render);
}

render();
