import Head from "next/head";
import { useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const STAR_COUNT = 300;
    const LOGO_COUNT = 100;

    const stars = [];
    const logos = [];
    const logoImg = new Image();
    logoImg.src = "/logo.jpg";
    let logoLoaded = false;
    logoImg.onload = () => (logoLoaded = true);

    const rand = (a, b) => Math.random() * (b - a) + a;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: rand(0, W),
        y: rand(0, H),
        z: rand(0.5, 2.5),
        alpha: rand(0.3, 1),
      });
    }

    for (let i = 0; i < LOGO_COUNT; i++) {
      logos.push({
        x: rand(0, W),
        y: rand(0, H),
        vx: rand(-0.25, 0.25),
        vy: rand(-0.15, 0.15),
        s: rand(0.1, 0.25),
        r: rand(0, 6.28),
        rs: rand(-0.002, 0.002),
        a: rand(0.05, 0.4),
      });
    }

    function draw() {
      const gradient = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        W / 1.2
      );
      gradient.addColorStop(0, "#030314");
      gradient.addColorStop(1, "#000010");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      for (const s of stars) {
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.z, 0, Math.PI * 2);
        ctx.fill();
        s.y += 0.05 * s.z;
        if (s.y > H) s.y = 0;
      }

      if (logoLoaded) {
        for (const p of logos) {
          p.x += p.vx;
          p.y += p.vy;
          p.r += p.rs;
          if (p.x > W + 80) p.x = -80;
          if (p.x < -80) p.x = W + 80;
          if (p.y > H + 80) p.y = -80;
          if (p.y < -80) p.y = H + 80;
          ctx.save();
          ctx.globalAlpha = p.a;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.r);
          const size = 100 * p.s;
          ctx.drawImage(logoImg, -size / 2, -size / 2, size, size);
          ctx.restore();
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>VOTV RUSSIAN FANDOM — Переходник</title>
        <meta
          name="description"
          content="Самый большой фандом по Voices of the Void в России"
        />
        <link rel="icon" type="image/png" href="/logo.jpg" />
      </Head>

      <canvas id="bg-canvas" aria-hidden="true"></canvas>

      <div className={`${inter.className} wrap`}>
        <div className="logo-top">
          <img src="/logo.jpg" alt="VOTV логотип" />
        </div>

        <div className="card">
          <h1>VOTV RUSSIAN FANDOM</h1>
          <p className="lead">
            Самый большой фандом по Voices of the Void в России
          </p>
          <div className="links">
            <a
              className="link"
              href="https://t.me/votvrus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon">
                <img src="/tg.png" alt="Telegram" />
              </div>
              <div className="meta">
                <div className="title">Телеграм канал</div>
                <div className="sub">@votvrus</div>
              </div>
            </a>
            <a
              className="link"
              href="https://t.me/+6U-xwLlb9Gw4NmQy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon">
                <img src="/tg.png" alt="Telegram чат" />
              </div>
              <div className="meta">
                <div className="title">Телеграм чат</div>
                <div className="sub">Присоединиться к обсуждению</div>
              </div>
            </a>
            <a
              className="link"
              href="https://vk.ru/voicesofthevoid_meme"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon">
                <img src="/vk.png" alt="VK" />
              </div>
              <div className="meta">
                <div className="title">Группа VK</div>
                <div className="sub">voicesofthevoid_meme</div>
              </div>
            </a>
            <a
              className="link"
              href="https://vk.me/join/rEez8Vx7USC5BiGtE0W8HI5ZiK_IfhBiI9o="
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon">
                <img src="/vk.png" alt="VK чат" />
              </div>
              <div className="meta">
                <div className="title">Чат ВК</div>
                <div className="sub">Приглашение в беседу</div>
              </div>
            </a>
          </div>
          <div className="foot">
            Нажми любую кнопку, чтобы открыть ресурс в новой вкладке.
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --bg: #04030a;
          --accent: #3b82f6;
          --accent-2: #93c5fd;
          --text: #e6eef8;
          --muted: rgba(230, 238, 248, 0.7);
        }
        * {
          box-sizing: border-box;
        }
        html,
        body {
          height: 100%;
          margin: 0;
        }
        body {
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto,
            'Helvetica Neue', Arial;
          background: var(--bg);
          color: var(--text);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow: hidden;
        }
        #bg-canvas {
          position: fixed;
          inset: 0;
          z-index: 0;
        }
        .wrap {
          position: relative;
          z-index: 5;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px;
        }
        .logo-top {
          position: relative;
          top: -60px;
          z-index: 6;
          width: 100px;
          height: 100px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
          margin-bottom: -30px;
        }
        .logo-top img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card {
          width: 100%;
          max-width: 740px;
          backdrop-filter: blur(8px) saturate(120%);
          background: linear-gradient(
            180deg,
            rgba(147, 197, 253, 0.25),
            rgba(59, 130, 246, 0.25)
          );
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 28px;
          box-shadow: 0 10px 40px rgba(2, 3, 10, 0.6);
          text-align: center;
          color: #f5f8ff !important;
        }
        h1 {
          font-size: 22px;
          margin: 0;
          font-weight: 800;
          letter-spacing: 0.4px;
        }
        p.lead {
          margin: 6px 0 20px;
          color: var(--muted);
          font-size: 14px;
        }
        .links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .link {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 14px 16px;
          border-radius: 12px;
          text-decoration: none;
          color: var(--text);
          font-weight: 600;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.02)
          );
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 6px 18px rgba(4, 5, 10, 0.45);
        }
        .link:active {
          transform: translateY(2px);
        }
        .link:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(4, 5, 10, 0.6);
        }
        .link .icon {
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          overflow: hidden;
        }
        .link .icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .link .meta {
          flex: 1;
          text-align: left;
        }
        .link .meta .title {
          font-size: 15px;
        }
        .link .meta .sub {
          font-size: 12px;
          color: var(--muted);
          margin-top: 3px;
        }
        .tg {
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
        }
        .vk {
          background: linear-gradient(135deg, #4c63f6, #0091ff);
        }
        @media (max-width: 560px) {
          .links {
            grid-template-columns: 1fr;
          }
          h1 {
            font-size: 20px;
          }
        }
        .foot {
          margin-top: 18px;
          font-size: 12px;
          color: var(--muted);
        }
      `}</style>
    </>
  );
}
