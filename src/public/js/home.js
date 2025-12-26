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
    this.x = w/2 + (Math.random() - 0.5) * 400;
    this.y = h/2 + (Math.random() - 0.5) * 400;
    this.radius = Math.random() * 20 + 10; // Kattaroq zarralar
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * 0.8 + 0.3; // Tezroq harakat
    
    // Gradient ranglar - ko'proq ta'sirchan
    const colors = [
      `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
      `rgba(147, 197, 253, ${Math.random() * 0.5 + 0.3})`,
      `rgba(196, 181, 253, ${Math.random() * 0.5 + 0.3})`,
      `rgba(251, 207, 232, ${Math.random() * 0.5 + 0.3})`,
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.angle += this.speed * 0.015;
    this.x += Math.sin(this.angle) * 1.2;
    this.y += Math.cos(this.angle) * 1.2;
    
    // Radiusni o'zgartirish - pulsatsiya effekti
    this.radius += Math.sin(Date.now() * 0.001) * 0.1;
    
    if(this.x < -100 || this.x > w+100 || this.y < -100 || this.y > h+100) {
      this.reset();
    }
  }
  draw() {
    // Gradient bilan chizish
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Blur effekti uchun
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 0; // Reset
  }
}

const particles = [];
for(let i=0; i<150; i++) { // Ko'proq zarralar
  particles.push(new LiquidParticle());
}

function animate() {
  // Fade effect - oldingi kadrni to'liq o'chirmaslik
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, w, h);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  requestAnimationFrame(animate);
}

animate();