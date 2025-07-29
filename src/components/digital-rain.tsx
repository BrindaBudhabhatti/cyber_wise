
'use client';

import { useEffect, useRef } from 'react';

export function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setting the width and height of the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Setting up the letters
    var letters = '01'.split('');

    // Setting up the columns
    var fontSize = 10;
    var columns = canvas.width / fontSize;

    // Setting up the drops
    var drops: number[] = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Setting up the draw function
    function draw() {
      ctx!.fillStyle = 'rgba(3, 7, 18, 0.1)'; // Fading effect
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];
        ctx!.fillStyle = '#00b300';
        ctx!.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.85) {
          drops[i] = 0;
        }
      }
    }

    // Loop the animation
    const interval = setInterval(draw, 50);

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        drops = [];
        for (var i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    }

    window.addEventListener('resize', handleResize);

    // Cleanup function to stop the animation and remove event listener
    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  return <canvas ref={canvasRef} className="digital-rain" />;
}
