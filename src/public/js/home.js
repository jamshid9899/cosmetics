const canvas = document.getElementById("liquidCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class LiquidParticle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = w/2 + (Math.random() - 0.5) * 200;
    this.y = h/2 + (Math.random() - 0.5) * 200;
    this.radius = Math.random() * 8 + 5;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * 0.5 + 0.2;
    this.color = `rgba(255,182,193,${Math.random() * 0.7 + 0.3})`;
  }
  update() {
    this.angle += this.speed * 0.01;
    this.x += Math.sin(this.angle) * 0.7;
    this.y += Math.cos(this.angle) * 0.7;
    if(this.x < -50 || this.x > w+50 || this.y < -50 || this.y > h+50) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const particles = [];
for(let i=0;i<120;i++) {
  particles.push(new LiquidParticle());
}

function animate() {
  ctx.clearRect(0,0,w,h);
  particles.forEach(p=>{
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

animate();




