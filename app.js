const canvas = document.querySelector("#world");
const ctx = canvas.getContext("2d");

const particles = [
  { x: 260, y: 180, vx: 2.4, vy: -0.7, radius: 15, color: "#71e2c2" },
  { x: 510, y: 240, vx: -1.5, vy: 0.9, radius: 24, color: "#f6c85f" },
  { x: 700, y: 160, vx: -0.9, vy: 1.4, radius: 18, color: "#ff7a59" },
];

function stepParticle(particle) {
  particle.x += particle.vx;
  particle.y += particle.vy;
}

function drawParticle(particle) {
  ctx.fillStyle = particle.color;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
  ctx.fill();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    stepParticle(particle);
    drawParticle(particle);
  });
  requestAnimationFrame(render);
}

render();
