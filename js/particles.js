/* grid-interaction.js — Fondo de red interactiva */
(function () {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, mouse = { x: -1000, y: -1000 };
  const step = 40; // Espaciado de la red

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(45, 212, 191, 0.05)'; // Usa tu color accent aquí
    ctx.lineWidth = 1;

    for (let x = 0; x < W; x += step) {
      for (let y = 0; y < H; y += step) {
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Si el mouse está cerca, los puntos de la red se "mueven"
        const offset = Math.max(0, 100 - dist) * 0.1;
        const angle = Math.atan2(dy, dx);

        ctx.beginPath();
        ctx.arc(x + Math.cos(angle) * offset, y + Math.sin(angle) * offset, 1, 0, Math.PI * 2);
        ctx.fillStyle = dist < 150 ? 'rgba(45, 212, 191, 0.3)' : 'rgba(255,255,255,0.05)';
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();