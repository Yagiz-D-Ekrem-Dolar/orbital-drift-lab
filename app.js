const canvas = document.querySelector("#world");
const ctx = canvas.getContext("2d");
const gravity = 0.18;
const bounce = 0.86;

const particles = [
  { x: 260, y: 180, vx: 2.4, vy: -0.7, radius: 15, color: "#71e2c2" },
  { x: 510, y: 240, vx: -1.5, vy: 0.9, radius: 24, color: "#f6c85f" },
  { x: 700, y: 160, vx: -0.9, vy: 1.4, radius: 18, color: "#ff7a59" },
];

function fadeScene() {
  ctx.fillStyle = "rgba(7, 10, 16, 0.26)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function stepParticle(particle) {
  particle.vy += gravity;
  particle.x += particle.vx;
  particle.y += particle.vy;

  if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
    particle.vx *= -bounce;
    particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
  }

  if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
    particle.vy *= -bounce;
    particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
  }
}

function drawParticle(particle) {
  ctx.fillStyle = particle.color;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
  ctx.fill();
}

function resolveParticleHits() {
  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i];
      const b = particles[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distance = Math.hypot(dx, dy);
      const minDistance = a.radius + b.radius;

      if (distance > 0 && distance < minDistance) {
        const nx = dx / distance;
        const ny = dy / distance;
        const overlap = (minDistance - distance) / 2;
        a.x -= nx * overlap;
        a.y -= ny * overlap;
        b.x += nx * overlap;
        b.y += ny * overlap;

        const push = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
        a.vx -= push * nx * 0.5;
        a.vy -= push * ny * 0.5;
        b.vx += push * nx * 0.5;
        b.vy += push * ny * 0.5;
      }
    }
  }
}

function render() {
  fadeScene();
  particles.forEach(stepParticle);
  resolveParticleHits();
  particles.forEach(drawParticle);
  requestAnimationFrame(render);
}

render();
