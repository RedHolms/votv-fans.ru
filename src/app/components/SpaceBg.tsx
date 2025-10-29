"use client";

import { useEffect, useRef } from "react";

const MIN_STAR_SIZE = 7;
const MAX_STAR_SIZE = 11;

const AVG_STAR_SIZE = (MIN_STAR_SIZE + MAX_STAR_SIZE) / 2;

const MIN_VELOCITY = 15;
const MAX_VELOCITY = 70;

const MIN_ANGULAR_VELOCITY = -Math.PI;
const MAX_ANGULAR_VELOCITY = Math.PI;

interface StarObject {
  // size
  s: number;
  // position
  x: number; y: number;
  // angle
  a: number;
  // horizontal velocity
  vx: number;
  // angular velocity
  av: number;
}

export default function SpaceBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<StarObject[]>([]);

  const randomizeStarProperties = (object: Partial<StarObject>): StarObject => {
    const [width, height] = [window.innerWidth, window.innerHeight];
    
    object.s = Math.round(Math.random() * (MAX_STAR_SIZE - MIN_STAR_SIZE)) + MIN_STAR_SIZE;
    object.x = Math.random() * width;
    object.y = Math.random() * height;
    object.a = Math.random() * Math.PI * 2;
    object.vx = (Math.random() * (MAX_VELOCITY - MIN_VELOCITY)) + MIN_VELOCITY;
    object.av = (Math.random() * (MAX_ANGULAR_VELOCITY - MIN_ANGULAR_VELOCITY)) + MIN_ANGULAR_VELOCITY;

    const reallyFast = Math.random() < 0.01;
    if (reallyFast) {
      object.vx *= 10;
      object.av *= 3;
    }

    return object as StarObject;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas)
      return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      alert("Не удалось создать 2D контекст. Задний фон будет пустым :-(");
      return;
    }

    const starImage = new Image();
    starImage.src = "/star.jpg";

    let width = 0, height = 0;
    const updateSize = () => {
      width = (canvas.width = window.innerWidth);
      height = (canvas.height = window.innerHeight)

      const starsCount = Math.round(((height / AVG_STAR_SIZE) + (width / AVG_STAR_SIZE)) * 1.2);

      const difference = starsCount - stars.current.length;
      if (difference === 0)
        return;

      if (difference > 0) {
        console.log("add %d new stars", difference);
        for (let i = 0; i < difference; ++i)
          stars.current.push(randomizeStarProperties({}));
      }
      else {
        stars.current.length = starsCount;
      }
    };

    updateSize();

    let done = false, paused = false;
    let lastFrameTime = performance.now();

    const loop = () => {
      const now = performance.now();
      const dt = (now - lastFrameTime) / 1000;
      lastFrameTime = now;

      ctx.clearRect(0, 0, width, height);

      for (const s of stars.current) {
        s.x += s.vx * dt;
        s.a += s.av * dt;

        if (s.x - s.s > width) {
          let newX = s.x;
          while (newX  > width)
            newX -= (width + (MAX_STAR_SIZE * 2));

          randomizeStarProperties(s);
          s.x = newX;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.a);
        ctx.drawImage(starImage, -s.s / 2, -s.s / 2, s.s, s.s);
        ctx.restore();
      }

      if (!done && !paused)
        requestAnimationFrame(loop);
    };

    starImage.onload = () => requestAnimationFrame(loop);

    const pauseRendering = () => {
      // stop rendering until page is reopened
      paused = true;
    };

    const resumeRendering = () => {
      paused = false;
      lastFrameTime = performance.now();
      requestAnimationFrame(loop);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resumeRendering();
      }
      else {
        pauseRendering();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", updateSize);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", updateSize);
      done = true;
    };
  }, [canvasRef]);

  return <canvas className="absolute top-0 left-0 w-screen h-screen z-[-1]" ref={canvasRef} />;
}
