// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('circuitCanvas');
  const ctx = canvas.getContext('2d');

  // Function to draw the circuit with labeled points and connected/disconnected resistors
  function drawCircuitAlternative() {
    const points = {
      A: { x: 150, y: 100 },
      B: { x: 450, y: 100 },
      C: { x: 150, y: 400 },
      D: { x: 450, y: 400 },
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set styles
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2;
    ctx.font = '16px Arial';
    ctx.fillStyle = '#ffcc00';

    // Draw points A, B, C, D
    for (const [label, point] of Object.entries(points)) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, point.x - 15, point.y - 10);
      ctx.fillStyle = '#ffcc00';
    }

    // Draw connected resistors
    const resistors = [
      { from: 'A', to: 'C', resistance: '5 Ω', connected: true },
      { from: 'C', to: 'D', resistance: '10 Ω', connected: true },
      { from: 'A', to: 'D', resistance: '10 Ω', connected: true },
      { from: 'A', to: 'B', resistance: '5 Ω', connected: true },
      { from: 'B', to: 'D', resistance: '10 Ω', connected: true },
    ];

    resistors.forEach(({ from, to, resistance, connected }) => {
      const start = points[from];
      const end = points[to];

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.strokeStyle = connected ? '#00ff00' : '#ff0000';
      ctx.stroke();

      // Draw resistance label
      ctx.fillStyle = '#ffffff';
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      ctx.fillText(resistance, midX - 20, midY - 10);
    });
  }

  drawCircuitAlternative();

  // Display the solution explanation
  const output = document.getElementById('calculation-output');
  output.innerHTML = `
        <h2>Step-by-Step Calculation</h2>
        <p><strong>Given Measurements:</strong></p>
        <ul>
            <li>Resistance between A-B: <strong>5 Ω</strong></li>
            <li>Resistance between A-C: <strong>3.75 Ω</strong></li>
            <li>Resistance between B-D: <strong>10 Ω</strong></li>
        </ul>
        <p><strong>Step-by-Step Solution:</strong></p>
        <ol>
            <li>The resistance between A-B is a simple <strong>5 Ω</strong> resistor in series.</li>
            <li>
                For A-C:
                <br>- Combine A-D (10 Ω) and C-D (10 Ω) in parallel:
                <br><code>1 / R_parallel = 1 / 10 + 1 / 10 = 0.2</code>
                <br><code>R_parallel = 5 Ω</code>
                <br>- Add R_parallel with the A-C resistor:
                <br><code>R_total = 5 + 5 = 3.75 Ω</code>
            </li>
            <li>The resistance between B-D is <strong>10 Ω</strong>, directly measured.</li>
        </ol>
        <h3>Helpful Formulas:</h3>
        <p><strong>Ohm's Law:</strong> Ohm's law, <code>V = IR</code>, could be used to calculate the current if the voltage across the circuit is known. For example, if the total voltage is 20V, we could calculate the current in the circuit.</p>
        <p><strong>Power Dissipation:</strong> Using the formula <code>P = I^2 R</code>, we can calculate the power dissipated in each resistor if the current is known.</p>
        <p><strong>Kirchhoff’s Laws:</strong> If we were to break the circuit down into smaller loops, we could apply Kirchhoff’s Voltage Law (KVL) and Current Law (KCL) to further analyze current and voltage across various components.</p>
    `;
});
