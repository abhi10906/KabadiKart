import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="home">

      <!-- HERO -->
      <section class="hero">
        <div class="hero-bg">
          <div class="hero-grid"></div>
          <div class="hero-glow"></div>
        </div>
        <div class="hero-content">
          <div class="hero-badge">🌿 Eco-Friendly Pickup Service</div>
          <h1 class="hero-title">
            Turn Your<br>
            <span class="hero-accent">Scrap Into Cash</span>
          </h1>
          <p class="hero-sub">
            Schedule a kabadi pickup from your doorstep.<br>
            We collect, weigh, and pay — hassle-free.
          </p>
          <div class="hero-actions">
            <a routerLink="/book" class="btn-primary">
              Schedule Pickup →
            </a>
            <a href="#how-it-works" class="btn-ghost">See How It Works</a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <strong>500+</strong>
              <span>Pickups Done</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <strong>12+</strong>
              <span>Scrap Types</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <strong>24hr</strong>
              <span>Turnaround</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="recycle-ring">
            <div class="ring ring-1"></div>
            <div class="ring ring-2"></div>
            <div class="ring-center">♻</div>
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <section class="section" id="how-it-works">
        <div class="section-label">Process</div>
        <h2 class="section-title">How KabadiKart Works</h2>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-num">01</div>
            <div class="step-icon">📅</div>
            <h3>Book a Slot</h3>
            <p>Fill in your details, choose a scrap type, pick a date and time that works for you.</p>
          </div>
          <div class="step-connector">→</div>
          <div class="step-card">
            <div class="step-num">02</div>
            <div class="step-icon">🚛</div>
            <h3>We Arrange Pickup</h3>
            <p>Our team gets notified and a kabadi agent is dispatched to your address.</p>
          </div>
          <div class="step-connector">→</div>
          <div class="step-card">
            <div class="step-num">03</div>
            <div class="step-icon">⚖</div>
            <h3>Weigh & Estimate</h3>
            <p>Scrap is weighed on-site. You receive a price estimate cart from the admin.</p>
          </div>
          <div class="step-connector">→</div>
          <div class="step-card">
            <div class="step-num">04</div>
            <div class="step-icon">💰</div>
            <h3>Get Paid</h3>
            <p>Payment is settled on the spot. Zero hidden charges, zero hassle.</p>
          </div>
        </div>
      </section>

      <!-- SCRAP TYPES -->
      <section class="section section-dark">
        <div class="section-label">We Accept</div>
        <h2 class="section-title">What Scrap Do We Collect?</h2>
        <div class="scrap-grid">
          <div class="scrap-card" *ngFor="let s of scrapTypes">
            <span class="scrap-icon">{{ s.icon }}</span>
            <strong>{{ s.name }}</strong>
            <span class="scrap-rate">{{ s.rate }}</span>
          </div>
        </div>
        <div class="cta-center">
          <a routerLink="/book" class="btn-primary">Book a Pickup Now →</a>
        </div>
      </section>

      <!-- WHY US -->
      <section class="section">
        <div class="section-label">Why Us</div>
        <h2 class="section-title">Why Choose KabadiKart?</h2>
        <div class="why-grid">
          <div class="why-card" *ngFor="let w of whyUs">
            <div class="why-icon">{{ w.icon }}</div>
            <h3>{{ w.title }}</h3>
            <p>{{ w.desc }}</p>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

    .home { background: #0d0d0d; color: #e8f5e8; font-family: 'Inter', sans-serif; }

    /* HERO */
    .hero {
      min-height: 90vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 4rem;
      padding: 5rem 4rem;
      position: relative;
      overflow: hidden;
    }
    .hero-bg { position: absolute; inset: 0; z-index: 0; }
    .hero-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(74,222,128,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(74,222,128,0.05) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .hero-glow {
      position: absolute;
      top: -20%;
      left: -10%;
      width: 60%;
      height: 60%;
      background: radial-gradient(ellipse, rgba(74,222,128,0.12) 0%, transparent 70%);
    }
    .hero-content { position: relative; z-index: 1; }
    .hero-badge {
      display: inline-block;
      background: rgba(74,222,128,0.1);
      border: 1px solid rgba(74,222,128,0.3);
      color: #4ade80;
      padding: 6px 16px;
      border-radius: 100px;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      margin-bottom: 1.5rem;
    }
    .hero-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      line-height: 1.05;
      margin: 0 0 1.5rem;
      color: #f0fdf4;
    }
    .hero-accent {
      color: #4ade80;
      display: block;
    }
    .hero-sub {
      color: #9ca3af;
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 2.5rem;
    }
    .hero-actions { display: flex; gap: 1rem; align-items: center; margin-bottom: 3rem; }
    .btn-primary {
      background: #4ade80;
      color: #0a0f0a;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      transition: all 0.2s;
      letter-spacing: 0.01em;
    }
    .btn-primary:hover { background: #22c55e; transform: translateY(-1px); }
    .btn-ghost {
      color: #9ca3af;
      text-decoration: none;
      font-size: 0.9rem;
      border-bottom: 1px solid #374151;
      padding-bottom: 2px;
      transition: color 0.2s;
    }
    .btn-ghost:hover { color: #e8f5e8; }
    .hero-stats { display: flex; align-items: center; gap: 2rem; }
    .stat { display: flex; flex-direction: column; gap: 2px; }
    .stat strong { font-size: 1.5rem; font-weight: 800; color: #4ade80; }
    .stat span { font-size: 0.78rem; color: #6b7280; letter-spacing: 0.05em; text-transform: uppercase; }
    .stat-divider { width: 1px; height: 36px; background: #1f2937; }

    /* Hero visual */
    .hero-visual {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
    }
    .recycle-ring {
      position: relative;
      width: 320px;
      height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(74,222,128,0.2);
      animation: spin linear infinite;
    }
    .ring-1 { width: 100%; height: 100%; animation-duration: 20s; border-style: dashed; }
    .ring-2 { width: 70%; height: 70%; animation-duration: 14s; animation-direction: reverse; }
    .ring-center {
      font-size: 5rem;
      animation: pulse 3s ease-in-out infinite;
      filter: drop-shadow(0 0 20px rgba(74,222,128,0.5));
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.08); opacity: 0.85; }
    }

    /* SECTIONS */
    .section { padding: 6rem 4rem; max-width: 1200px; margin: 0 auto; }
    .section-dark {
      max-width: 100%;
      background: #080c08;
      padding: 6rem 4rem;
    }
    .section-dark > * { max-width: 1200px; margin-left: auto; margin-right: auto; }
    .section-label {
      color: #4ade80;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 0.75rem;
    }
    .section-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.8rem, 3vw, 2.5rem);
      font-weight: 800;
      color: #f0fdf4;
      margin: 0 0 3rem;
    }

    /* STEPS */
    .steps-grid {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .step-card {
      flex: 1;
      background: #111811;
      border: 1px solid #1e2d1e;
      border-radius: 12px;
      padding: 2rem 1.5rem;
      position: relative;
      transition: border-color 0.2s, transform 0.2s;
    }
    .step-card:hover { border-color: #4ade80; transform: translateY(-4px); }
    .step-num {
      font-family: 'Syne', sans-serif;
      font-size: 3rem;
      font-weight: 800;
      color: rgba(74,222,128,0.12);
      line-height: 1;
      margin-bottom: 0.5rem;
    }
    .step-icon { font-size: 2rem; margin-bottom: 1rem; display: block; }
    .step-card h3 { color: #e8f5e8; margin: 0 0 0.5rem; font-size: 1rem; font-weight: 600; }
    .step-card p { color: #6b7280; font-size: 0.85rem; line-height: 1.6; margin: 0; }
    .step-connector { color: #374151; font-size: 1.5rem; flex-shrink: 0; }

    /* SCRAP GRID */
    .scrap-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 3rem;
    }
    .scrap-card {
      background: #0d150d;
      border: 1px solid #1e2d1e;
      border-radius: 10px;
      padding: 1.25rem 1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: border-color 0.2s, transform 0.2s;
    }
    .scrap-card:hover { border-color: #4ade80; transform: translateY(-3px); }
    .scrap-icon { font-size: 2rem; }
    .scrap-card strong { color: #d1fae5; font-size: 0.9rem; }
    .scrap-rate { color: #4ade80; font-size: 0.78rem; font-weight: 600; }
    .cta-center { text-align: center; margin-top: 1rem; }

    /* WHY GRID */
    .why-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1.5rem;
    }
    .why-card {
      background: #111811;
      border: 1px solid #1e2d1e;
      border-radius: 12px;
      padding: 2rem 1.5rem;
      transition: border-color 0.2s;
    }
    .why-card:hover { border-color: #4ade80; }
    .why-icon { font-size: 2rem; margin-bottom: 1rem; }
    .why-card h3 { color: #e8f5e8; margin: 0 0 0.5rem; font-size: 1rem; font-weight: 600; }
    .why-card p { color: #6b7280; font-size: 0.85rem; line-height: 1.6; margin: 0; }

    @media (max-width: 768px) {
      .hero { grid-template-columns: 1fr; padding: 3rem 1.5rem; }
      .hero-visual { display: none; }
      .steps-grid { flex-direction: column; }
      .step-connector { transform: rotate(90deg); }
      .section { padding: 4rem 1.5rem; }
      .section-dark { padding: 4rem 1.5rem; }
    }
  `]
})
export class HomeComponent {
  scrapTypes = [
    { icon: '🔩', name: 'Iron / Steel', rate: '₹25–30 /kg' },
    { icon: '🟡', name: 'Copper', rate: '₹450 /kg' },
    { icon: '⚪', name: 'Aluminium', rate: '₹100 /kg' },
    { icon: '📦', name: 'Cardboard', rate: '₹12 /kg' },
    { icon: '🗞', name: 'Newspaper', rate: '₹14 /kg' },
    { icon: '🧴', name: 'Plastic (PET)', rate: '₹8 /kg' },
    { icon: '💻', name: 'E-Waste', rate: '₹50+ /kg' },
    { icon: '🔋', name: 'Batteries', rate: '₹20 /kg' },
    { icon: '🪟', name: 'Glass', rate: '₹3 /kg' },
    { icon: '🟤', name: 'Brass', rate: '₹300 /kg' },
    { icon: '🔌', name: 'Cables / Wire', rate: '₹200 /kg' },
    { icon: '🗑', name: 'Mixed Scrap', rate: 'On inspection' },
  ];
  whyUs = [
    { icon: '🏠', title: 'Doorstep Pickup', desc: 'No need to carry anything. We come to your home or office.' },
    { icon: '⚡', title: 'Same Day Slots', desc: 'Choose morning or evening slots. Fast and flexible scheduling.' },
    { icon: '📊', title: 'Fair Pricing', desc: 'Weight-based transparent pricing. No undercutting, no surprises.' },
    { icon: '🔐', title: 'Verified Agents', desc: 'All pickup agents are verified and tracked for your safety.' },
    { icon: '♻', title: 'Eco Certified', desc: 'All scrap goes to certified recycling facilities, zero landfill.' },
    { icon: '📱', title: 'Easy Booking', desc: 'Book in under 2 minutes. Get confirmation instantly.' },
  ];
}