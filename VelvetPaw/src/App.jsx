import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');`;
const isVideo = (url) => url && /\.(mp4|mov|webm|avi)([?#]|$)/i.test(url); 
const css = `
  ${FONTS}

  :root {
    --gold: #a07828;
    --gold-light: #c09a40;
    --gold-dim: #7a5e18;
    --dark: #f7f2e8;
    --dark2: #f0e8d6;
    --dark3: #e8dfc8;
    --surface: #ddd3bc;
    --surface2: #cfc3aa;
    --ivory: #1c1610;
    --ivory2: #4a3c28;
    --ivory3: #7a6a4a;
    --text: #1c1610;
    --text2: #5a4a32;
    --text3: #9a8a68;
    --radius: 2px;
    --radius-lg: 4px;
    --transition: 0.4s cubic-bezier(0.4,0,0.2,1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body { background: var(--dark); color: var(--text); font-family: 'Jost', sans-serif; font-weight: 300; overflow-x: hidden; }

  .serif { font-family: 'Playfair Display', serif; }
  .cormorant { font-family: 'Cormorant Garamond', serif; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 60px;
    background: rgba(247,242,232,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 0.5px solid rgba(160,120,40,0.15);
    transition: var(--transition);
  }
  .nav.scrolled { background: rgba(247,242,232,0.97); border-bottom: 0.5px solid rgba(160,120,40,0.25); }
  .nav-logo { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:300; color:var(--gold); letter-spacing:0.12em; }
  .nav-links a { color: var(--text2); }
  .nav-links a:hover { color: var(--gold); }
  .nav-logo { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:300; color:var(--gold); letter-spacing:0.12em; }
  .nav-logo span { color: var(--ivory); }
  .nav-links { display:flex; gap:32px; align-items:center; }
  .nav-links a { font-size:11px; letter-spacing:0.2em; color:var(--text2); text-decoration:none; text-transform:uppercase; transition:color 0.3s; cursor:pointer; }
  .nav-links a:hover { color:var(--gold); }
  .nav-cta {
    font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#f7f2e8;
    background:var(--gold); border:none; padding:10px 24px; cursor:pointer;
    font-family:'Jost',sans-serif; font-weight:400; transition:var(--transition);
  }
  .nav-cta:hover { background:var(--gold-light); }

  /* HERO */
  .hero {
    position:relative; min-height:100vh; display:flex; align-items:center;
    overflow:hidden; background:#f7f2e8;
  }
  .hero-bg {
    position:absolute; inset:0; z-index:0;
    background: radial-gradient(ellipse 75% 65% at 65% 50%, #f0e5cc 0%, #f7f2e8 70%);
  }
  .hero-ornament {
    position:absolute; right:-80px; top:50%; transform:translateY(-50%);
    width:600px; height:600px; border-radius:50%;
    border: 0.5px solid rgba(160,120,40,0.3);
    z-index:0;
  }
  .hero-ornament::before {
    content:''; position:absolute; inset:40px; border-radius:50%;
    border: 0.5px solid rgba(160,120,40,0.2);
  }
  .hero-ornament::after {
    content:''; position:absolute; inset:80px; border-radius:50%;
    border: 0.5px solid rgba(160,120,40,0.12);
  }
  .hero-content { position:relative; z-index:2; padding: 120px 60px 80px; max-width:680px; }
  .hero-eyebrow {
    font-size:10px; letter-spacing:0.4em; text-transform:uppercase; color:var(--gold);
    margin-bottom:28px; display:flex; align-items:center; gap:16px;
  }
  .hero-eyebrow::before { content:''; display:block; width:40px; height:0.5px; background:var(--gold); }
  .hero-headline {
    font-family:'Playfair Display',serif; font-size:clamp(48px,6vw,80px);
    font-weight:400; line-height:1.1; color:#1c1610; margin-bottom:20px;
  }
  .hero-headline em { font-style:italic; color:var(--gold); font-weight:500; }
  .hero-subline {
    font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:300;
    color:#7a6a4a; line-height:1.7; margin-bottom:48px; font-style:italic;
  }
  .hero-actions { display:flex; gap:16px; align-items:center; }
  .btn-primary {
    font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.3em; text-transform:uppercase;
    background:var(--gold); color:var(--dark); border:none; padding:16px 36px; cursor:pointer;
    transition:var(--transition); font-weight:400;
  }
  .btn-primary:hover { background:var(--gold-light); }
  .btn-ghost {
    font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.3em; text-transform:uppercase;
    background:transparent; color:var(--ivory2); border:0.5px solid rgba(160,120,40,0.45);
    padding:16px 36px; cursor:pointer; transition:var(--transition); font-weight:400;
  }
  .btn-ghost:hover { border-color:var(--gold); color:var(--gold); }
  .hero-stats {
    position:absolute; right:60px; bottom:60px; z-index:2;
    display:flex; gap:48px;
  }
  .hero-stat-num {
    font-family:'Cormorant Garamond',serif; font-size:40px; font-weight:300; color:#1c1610;
    line-height:1;
  }
  .hero-stat-label {
    font-size:9px; letter-spacing:0.25em; text-transform:uppercase; color:#9a8a68;
    margin-top:4px;
  }
  .hero-divider { width:0.5px; background:rgba(160,120,40,0.3); align-self:stretch; }

  /* SECTION COMMONS */
  .section { padding: 100px 60px; }
  .section-eyebrow {
    font-size:9px; letter-spacing:0.5em; text-transform:uppercase; color:var(--gold);
    margin-bottom:16px; display:flex; align-items:center; gap:16px;
  }
  .section-eyebrow::before { content:''; display:block; width:30px; height:0.5px; background:var(--gold); }
  .section-title {
    font-family:'Playfair Display',serif; font-size:clamp(36px,4vw,54px);
    font-weight:400; color:var(--ivory); line-height:1.15; margin-bottom:16px;
  }
  .hero .section-title { color: #f0e8d8; }
  .section-title em { font-style:italic; color:var(--gold); }
  .section-subtitle {
    font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--text2);
    font-style:italic; line-height:1.7; max-width:560px;
  }
  .section-header { margin-bottom:64px; }
  .divider-line { width:calc(100% - 120px); height:0.5px; background:rgba(160,120,40,0.2); margin: 0 60px; }

  /* PERSONALITIES */
  .personalities-bg { background:var(--dark3); }
  .personalities-grid {
    display:grid; grid-template-columns:repeat(5, 1fr); gap:1px;
    background:rgba(160,120,40,0.15);
  }
  .personality-card {
    background:var(--dark2); padding:40px 28px; cursor:pointer;
    transition:var(--transition); position:relative; overflow:hidden;
  }
  .personality-card:hover { background:var(--surface); }
  .personality-card::before {
    content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
    background:var(--gold); transform:scaleX(0); transition:var(--transition);
    transform-origin:left;
  }
  .personality-card:hover::before { transform:scaleX(1); }
  .personality-num {
    font-family:'Cormorant Garamond',serif; font-size:48px; font-weight:300;
    color:rgba(196,160,74,0.15); line-height:1; margin-bottom:16px;
  }
  .personality-name {
    font-family:'Playfair Display',serif; font-size:17px; color:var(--ivory);
    margin-bottom:6px; font-weight:400; transition: color 0.3s;
  }
  .personality-card:hover .personality-name { color: var(--gold); }
  .personality-tagline {
    font-family:'Cormorant Garamond',serif; font-size:13px; color:var(--text3);
    font-style:italic; line-height:1.5;
  }

  /* MEDIA SHOWCASE */
  .media-bg { background:var(--dark2); }
  .media-grid {
    display:grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: 280px 280px;
    gap:4px;
  }
  .media-item {
    position:relative; overflow:hidden; cursor:pointer; background:var(--surface);
    display:flex; align-items:center; justify-content:center;
  }
  .media-item.featured { grid-row: span 2; }
  .media-item-overlay {
    position:absolute; inset:0; background:linear-gradient(to top, rgba(20,15,8,0.85) 0%, transparent 60%);
    opacity:0; transition:var(--transition);
  }
  .media-item:hover .media-item-overlay { opacity:1; }
  .media-item-content {
    position:absolute; bottom:20px; left:20px; right:20px;
    opacity:0; transform:translateY(8px); transition:var(--transition);
  }
  .media-item:hover .media-item-content { opacity:1; transform:translateY(0); }
  .media-item-name {
    font-family:'Cormorant Garamond',serif; font-size:16px; color:var(--ivory); font-style:italic;
  }
  .media-item-breed { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); }
  .media-placeholder {
    width:100%; height:100%;
    display:flex; align-items:center; justify-content:center; flex-direction:column; gap:8px;
  }
  .media-icon { font-size:32px; color:rgba(196,160,74,0.3); }
  .media-label { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:var(--text3); }

  /* GET FEATURED */
  .featured-bg { background:var(--dark); }
  .featured-split { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
  .featured-visual {
    position:relative; aspect-ratio:4/5; background:var(--surface2);
    border:0.5px solid rgba(160,120,40,0.25);
    display:flex; align-items:center; justify-content:center; flex-direction:column; gap:12px;
  }
  .featured-visual::before {
    content:''; position:absolute; inset:-16px;
    border:0.5px solid rgba(196,160,74,0.1);
    pointer-events:none;
  }
  .featured-visual-text { font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:var(--text3); }
  .upload-zone {
    border:0.5px dashed rgba(160,120,40,0.3); padding:48px; text-align:center;
    margin-bottom:20px; cursor:pointer; transition:var(--transition); position:relative;
  }
  .upload-zone:hover { border-color:var(--gold); background:rgba(160,120,40,0.04); }
  .upload-zone input { position:absolute; inset:0; opacity:0; cursor:pointer; }
  .upload-icon { font-size:28px; color:rgba(196,160,74,0.4); margin-bottom:12px; }
  .upload-text { font-size:12px; color:var(--text3); line-height:1.6; }
  .upload-text span { color:var(--gold); }
  .upload-preview { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
  .upload-chip {
    font-size:10px; letter-spacing:0.1em; color:var(--ivory2);
    background:var(--surface); border:0.5px solid rgba(196,160,74,0.2);
    padding:6px 14px; display:flex; align-items:center; gap:8px;
  }
  .upload-chip button { background:none; border:none; color:var(--text3); cursor:pointer; font-size:12px; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; }
  .form-group { margin-bottom:16px; }
  .form-label { font-size:9px; letter-spacing:0.3em; text-transform:uppercase; color:var(--text3); margin-bottom:8px; display:block; }
  .form-input {
    width:100%; background:var(--surface); border:0.5px solid rgba(160,120,40,0.25);
    color:var(--ivory); font-family:'Jost',sans-serif; font-size:13px; font-weight:300;
    padding:12px 16px; outline:none; transition:border-color 0.3s;
  }
  .form-input:focus { border-color:var(--gold); }
  .form-input::placeholder { color:var(--text3); }
  .form-textarea { min-height:100px; resize:vertical; }

  /* FLOATING BUTTON */
  .float-btn {
    position:fixed; bottom:36px; right:36px; z-index:99;
    background:var(--gold); color:var(--dark); border:none;
    font-family:'Jost',sans-serif; font-size:9px; letter-spacing:0.35em; text-transform:uppercase;
    padding:14px 24px; cursor:pointer; transition:var(--transition); font-weight:500;
    box-shadow: 0 4px 32px rgba(160,120,40,0.35);
  }
  .float-btn:hover { background:var(--gold-light); transform:translateY(-2px); box-shadow:0 8px 40px rgba(160,120,40,0.45); }

  /* MODAL */
  .modal-overlay {
    position:fixed; inset:0; z-index:200;
    background:rgba(14,13,11,0.92); display:flex; align-items:center; justify-content:center;
    opacity:0; pointer-events:none; transition:opacity 0.4s; padding:20px;
  }
  .modal-overlay.open { opacity:1; pointer-events:all; }
  .modal {
    background:var(--dark2); border:0.5px solid rgba(160,120,40,0.3);
    max-width:640px; width:100%; max-height:90vh; overflow-y:auto;
    transform:translateY(24px); transition:transform 0.4s; position:relative;
    box-shadow: 0 24px 80px rgba(28,22,16,0.15);
  }
  .modal-overlay.open .modal { transform:translateY(0); }
  .modal-header {
    padding:36px 40px 24px; border-bottom:0.5px solid rgba(160,120,40,0.15);
    position:sticky; top:0; background:var(--dark2); z-index:2;
  }
  .modal-eyebrow { font-size:9px; letter-spacing:0.4em; text-transform:uppercase; color:var(--gold); margin-bottom:8px; }
  .modal-title { font-family:'Playfair Display',serif; font-size:26px; color:var(--ivory); font-weight:400; letter-spacing:0.01em; }
  .modal-close {
    position:absolute; top:24px; right:32px; background:none; border:none;
    color:var(--text3); font-size:20px; cursor:pointer; transition:color 0.3s; line-height:1;
  }
  .modal-close:hover { color:var(--ivory); }
  .modal-footer { border-top:0.5px solid rgba(160,120,40,0.15); }
  .modal-body { padding:32px 40px; }
  .modal-footer { padding:24px 40px; border-top:0.5px solid rgba(160,120,40,0.15); display:flex; justify-content:space-between; align-items:center; gap:12px; }

  /* PROGRESS */
  .progress-bar { height:1px; background:rgba(196,160,74,0.15); position:relative; margin-bottom:32px; }
  .progress-fill { height:100%; background:var(--gold); transition:width 0.5s cubic-bezier(0.4,0,0.2,1); }
  .progress-label { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:var(--text3); margin-bottom:6px; }
  .progress-steps { display:flex; gap:6px; margin-bottom:20px; }
  .progress-step { height:2px; flex:1; background:rgba(160,120,40,0.2); transition:var(--transition); }
  .progress-step.active { background:var(--gold); }
  .progress-step.done { background:var(--gold-dim); }

  /* QUESTION */
  .q-label { font-size:9px; letter-spacing:0.3em; text-transform:uppercase; color:var(--gold); margin-bottom:10px; }
  .q-text { font-family:'Cormorant Garamond',serif; font-size:20px; color:var(--ivory); margin-bottom:24px; font-weight:400; line-height:1.5; }
  .q-options { display:flex; flex-direction:column; gap:8px; }
  .q-option {
    display:flex; align-items:flex-start; gap:14px; padding:14px 18px; cursor:pointer;
    border:0.5px solid rgba(160,120,40,0.2); transition:var(--transition); position:relative;
  }
  .q-option:hover { border-color:rgba(160,120,40,0.5); background:rgba(160,120,40,0.04); }
  .q-option.selected { border-color:var(--gold); background:rgba(160,120,40,0.08); }
  .q-option input { display:none; }
  .q-indicator {
    width:16px; height:16px; border:0.5px solid rgba(160,120,40,0.5); flex-shrink:0;
    margin-top:1px; display:flex; align-items:center; justify-content:center; transition:var(--transition);
  }
  .q-option.selected .q-indicator { border-color:var(--gold); background:var(--gold); }
  .q-indicator::after { content:''; display:none; width:6px; height:6px; background:var(--dark); }
  .q-option.selected .q-indicator::after { display:block; }
  .q-option-text { font-size:13px; color:var(--text2); line-height:1.5; }
  .q-option.selected .q-option-text { color:var(--ivory); }
  .q-option-key { font-size:10px; color:var(--gold); font-weight:500; margin-right:2px; }

  /* MULTI SELECT */
  .q-multi { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .q-check {
    display:flex; align-items:center; gap:10px; padding:12px 16px; cursor:pointer;
    border:0.5px solid rgba(160,120,40,0.2); transition:var(--transition);
  }
  .q-check:hover { border-color:rgba(160,120,40,0.5); }
  .q-check.selected { border-color:var(--gold); background:rgba(160,120,40,0.08); }
  .q-check-box {
    width:14px; height:14px; border:0.5px solid rgba(160,120,40,0.5); flex-shrink:0;
    display:flex; align-items:center; justify-content:center; transition:var(--transition);
  }
  .q-check.selected .q-check-box { background:var(--gold); border-color:var(--gold); }
  .q-check-mark { font-size:8px; color:var(--dark); display:none; }
  .q-check.selected .q-check-mark { display:block; }
  .q-check-text { font-size:12px; color:var(--text2); }
  .q-check.selected .q-check-text { color:var(--ivory); }

  /* PERSONALITY SELECT */
  .pet-categories { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .pet-cat {
    padding:16px 18px; border:0.5px solid rgba(160,120,40,0.2); cursor:pointer;
    transition:var(--transition); display:flex; flex-direction:column; gap:4px;
  }
  .pet-cat:hover { border-color:rgba(160,120,40,0.5); }
  .pet-cat.selected { border-color:var(--gold); background:rgba(160,120,40,0.08); }
  .pet-cat-name { font-family:'Playfair Display',serif; font-size:14px; color:var(--ivory); }
  .pet-cat.selected .pet-cat-name { color:var(--gold); }
  .pet-cat-tag { font-size:10px; color:var(--text3); font-style:italic; font-family:'Cormorant Garamond',serif; }

  /* SUCCESS */
  .success-screen { text-align:center; padding:40px 0; }
  .success-icon { font-size:48px; margin-bottom:20px; }
  .success-title { font-family:'Playfair Display',serif; font-size:28px; color:var(--ivory); margin-bottom:12px; }
  .success-subtitle { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--text2); font-style:italic; }
  .success-gold { color:var(--gold); }

  /* FOOTER */
  .footer { background:#ede6d4; border-top:0.5px solid rgba(160,120,40,0.25); padding:60px; }
  .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:60px; margin-bottom:48px; }
  .footer-brand-name { font-family:'Cormorant Garamond',serif; font-size:22px; color:var(--gold); letter-spacing:0.1em; margin-bottom:12px; }
  .footer-brand-desc { font-size:12px; color:var(--text3); line-height:1.7; max-width:240px; }
  .footer-col-title { font-size:9px; letter-spacing:0.3em; text-transform:uppercase; color:var(--text3); margin-bottom:20px; }
  .footer-links { display:flex; flex-direction:column; gap:10px; }
  .footer-links a { font-size:12px; color:var(--text2); text-decoration:none; transition:color 0.3s; cursor:pointer; }
  .footer-links a:hover { color:var(--gold); }
  .footer-bottom { border-top:0.5px solid rgba(160,120,40,0.2); padding-top:24px; display:flex; justify-content:space-between; align-items:center; }
  .footer-copy { font-size:11px; color:var(--text3); }
  .footer-legal { display:flex; gap:24px; }
  .footer-legal a { font-size:10px; color:var(--text3); text-decoration:none; cursor:pointer; transition:color 0.3s; }
  .footer-legal a:hover { color:var(--gold); }

  /* SCROLL ANIMATIONS */
  .fade-in { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease, transform 0.8s ease; }
  .fade-in.visible { opacity:1; transform:translateY(0); }

  @media (max-width:1024px) {
    .nav { padding:16px 24px; }
    .nav-links { display:none; }
    .hero-content { padding:100px 24px 60px; }
    .hero-stats { right:24px; bottom:40px; }
    .section { padding:70px 24px; }
    .personalities-grid { grid-template-columns:repeat(2,1fr); }
    .featured-split { grid-template-columns:1fr; }
    .footer-grid { grid-template-columns:1fr 1fr; }
    .media-grid { grid-template-columns:1fr 1fr; grid-template-rows:auto; }
    .media-item.featured { grid-row:span 1; }
    .q-multi { grid-template-columns:1fr; }
    .pet-categories { grid-template-columns:1fr; }
  }
  @media (max-width:640px) {
    .hero-headline { font-size:38px; }
    .personalities-grid { grid-template-columns:1fr; }
    .modal { margin:0; max-height:100vh; }
    .modal-header,.modal-body,.modal-footer { padding-left:24px; padding-right:24px; }
    .form-row { grid-template-columns:1fr; }
    .footer-grid { grid-template-columns:1fr; }
    .hero-stats { display:none; }
  }
`;

// ─── Data ───────────────────────────────────────────────────────────────────

const PET_PERSONALITIES = [
  { name: "Guardian", tag: "Love at the door" },
  { name: "Wanderer", tag: "World in scent" },
  { name: "Joyful One", tag: "A tail is a welcome" },
  { name: "Old Soul", tag: "Already home" },
  { name: "Healer", tag: "Quiet as medicine" },
  { name: "Wild One", tag: "The house is a cage" },
  { name: "Dreamer", tag: "The couch is a cathedral" },
  { name: "Keeper", tag: "Where we go, you stay" },
  { name: "Trickster", tag: "Rules are suggestions" },
  { name: "Gentle Giant", tag: "Softness is enormous" },
];

const STEPS = ["Contact", "Lifestyle", "Personality", "Products", "Finish"];

const QUESTIONS = {
  lifestyle: [
    {
      id: "vacation",
      label: "Lifestyle · 1 of 5",
      text: "How do you arrange for your pet when you vacation?",
      options: [
        { key: "A", text: "Friend or neighbor" },
        { key: "B", text: "Standard kennel" },
        { key: "C", text: "Boutique boarding with webcams & suites" },
        { key: "D", text: "Comes with us to our second home" },
      ],
    },
    {
      id: "food",
      label: "Lifestyle · 2 of 5",
      text: "What is your current approach to your pet's nutrition?",
      options: [
        { key: "A", text: "Vet-recommended premium kibble" },
        { key: "B", text: "Fresh / frozen human-grade delivery service" },
        { key: "C", text: "Rotating raw or gently cooked proteins" },
        {
          key: "D",
          text: "Homemade meals with a veterinary nutritionist plan",
        },
      ],
    },
    {
      id: "spend",
      label: "Lifestyle · 3 of 5",
      text: "How much do you spend on your pet monthly?",
      options: [
        { key: "A", text: "₹0 – 5,000" },
        { key: "B", text: "₹5,000 – 10,000" },
        { key: "C", text: "₹10,000 – 15,000" },
        { key: "D", text: "₹15,000+" },
      ],
    },
    {
      id: "purchases",
      label: "Lifestyle · 4 of 5",
      text: "Which of these have you purchased in the last 12 months?",
      multi: true,
      options: [
        { key: "A", text: "Bed over ₹15,000" },
        { key: "B", text: "DNA + health screening" },
        { key: "C", text: "Designer collar (non-pet brand)" },
        { key: "D", text: "Professional pet photography session" },
      ],
    },
    {
      id: "car",
      label: "Lifestyle · 5 of 5",
      text: "What is your car setup for your pet?",
      options: [
        { key: "A", text: "Backseat cover" },
        { key: "B", text: "Custom-fitted SUV liner + crash harness" },
        { key: "C", text: "Crate secured in cargo area" },
        { key: "D", text: "They ride shotgun" },
      ],
    },
  ],
  personality: [
    {
      id: "phrase",
      label: "Personality · 1 of 5",
      text: "Pick the phrase that fits your pet best:",
      options: [
        { key: "A", text: "First to the door. Every. Single. Time." },
        { key: "B", text: "Nose down. The world is fascinating." },
        { key: "C", text: "Tail never stops. Joy is the default." },
        { key: "D", text: "Old soul. Wise beyond years." },
        { key: "E", text: "Calm presence. Soothes everyone." },
        { key: "F", text: "Needs to RUN. Walls feel tight." },
        { key: "G", text: "Couch is life. Luxury is required." },
        { key: "H", text: "Shadows you. Silent guardian." },
        { key: "I", text: "Rules? Cute. I make my own." },
        { key: "J", text: "Big. Soft. Gentle giant." },
      ],
    },
    {
      id: "doorbell",
      label: "Personality · 2 of 5",
      text: "Doorbell rings during your Zoom call. Your pet:",
      options: [
        { key: "A", text: "One deep sound, then checks with you" },
        { key: "B", text: "Silent, appears on screen to charm everyone" },
        { key: "C", text: "Stays close, sensing your stress" },
        { key: "D", text: "Ignores it completely" },
      ],
    },
    {
      id: "restaurant",
      label: "Personality · 3 of 5",
      text: "At a nice outdoor restaurant, your pet is:",
      options: [
        { key: "A", text: "Exploring every scent" },
        { key: "B", text: "Calm and perfectly composed" },
        { key: "C", text: "Energetic and wonderfully social" },
        { key: "D", text: "Well-behaved and quietly observant" },
      ],
    },
    {
      id: "design",
      label: "Personality · 4 of 5",
      text: "Your biggest home design pain point (pet-related)?",
      options: [
        { key: "A", text: "Unattractive crate ruining the aesthetic" },
        { key: "B", text: "Toy clutter everywhere" },
        { key: "C", text: "Gates that ruin the interior flow" },
        { key: "D", text: "Bed that doesn't match the décor" },
      ],
    },
    {
      id: "splurge",
      label: "Personality · 5 of 5",
      text: "Your splurge mentality when it comes to your pet:",
      options: [
        { key: "A", text: '"Family member. They deserve it."' },
        { key: "B", text: '"Their happiness is worth every rupee."' },
        { key: "C", text: '"Buy once, buy premium. Always."' },
      ],
    },
  ],
  products: [
    {
      id: "offleash",
      label: "Products · 1 of 2",
      text: "Off-leash in a safe area — your biggest worry?",
      options: [
        { key: "A", text: "Rolling in something unpleasant" },
        { key: "B", text: "Ignoring recall near danger" },
        { key: "C", text: "Approaching the wrong person or pet" },
        { key: "D", text: "No worries at all" },
      ],
    },
    {
      id: "guests",
      label: "Products · 2 of 2",
      text: "Guests staying over — how do you manage your pet?",
      options: [
        { key: "A", text: "Let them adjust naturally" },
        { key: "B", text: "Provide a separate space or crate" },
        { key: "C", text: "Wish for better training signals" },
        { key: "D", text: "Use calming aids" },
      ],
    },
  ],
};

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useFadeIn() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return scrolled;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function ProgressSteps({ step }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div className="progress-steps">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`progress-step ${i < step ? "done" : i === step ? "active" : ""}`}
          />
        ))}
      </div>
      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--text3)",
        }}
      >
        Step {step + 1} of {STEPS.length} — {STEPS[step]}
      </div>
    </div>
  );
}

function SingleChoice({ q, value, onChange }) {
  return (
    <div>
      <div className="q-label">{q.label}</div>
      <div className="q-text">{q.text}</div>
      <div className="q-options">
        {q.options.map((opt) => (
          <div
            key={opt.key}
            className={`q-option ${value === opt.key ? "selected" : ""}`}
            onClick={() => onChange(opt.key)}
          >
            <div className="q-indicator" />
            <div className="q-option-text">
              <span className="q-option-key">{opt.key}.</span> {opt.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MultiChoice({ q, value = [], onChange }) {
  const toggle = (key) =>
    onChange(
      value.includes(key) ? value.filter((v) => v !== key) : [...value, key],
    );
  return (
    <div>
      <div className="q-label">{q.label}</div>
      <div className="q-text">{q.text}</div>
      <div className="q-multi">
        {q.options.map((opt) => (
          <div
            key={opt.key}
            className={`q-check ${value.includes(opt.key) ? "selected" : ""}`}
            onClick={() => toggle(opt.key)}
          >
            <div className="q-check-box">
              <span className="q-check-mark">✓</span>
            </div>
            <div className="q-check-text">
              <span style={{ color: "var(--gold)", marginRight: 4 }}>
                {opt.key}.
              </span>
              {opt.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Questionnaire Modal ─────────────────────────────────────────────────────

function JoinModal({ open, onClose }) {
  const [step, setStep] = useState(0); // 0=contact, 1=lifestyle, 2=personality, 3=products, 4=finish
  const [lifeIdx, setLifeIdx] = useState(0);
  const [persIdx, setPersIdx] = useState(0);
  const [prodIdx, setProdIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    multiple: "no",
  });
  const [lifestyle, setLifestyle] = useState({});
  const [personality, setPersonality] = useState({});
  const [products, setProducts] = useState({});
  const [petCategory, setPetCategory] = useState("");
  const [earlyAccess, setEarlyAccess] = useState("");

  const scrollRef = useRef(null);
  const scrollTop = () =>
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  const setL = (id, val) => setLifestyle((p) => ({ ...p, [id]: val }));
  const setP = (id, val) => setPersonality((p) => ({ ...p, [id]: val }));
  const setPr = (id, val) => setProducts((p) => ({ ...p, [id]: val }));

  const canNextContact = contact.name && contact.email && contact.city;
  const currentLifeQ = QUESTIONS.lifestyle[lifeIdx];
  const currentPersQ = QUESTIONS.personality[persIdx];
  const currentProdQ = QUESTIONS.products[prodIdx];

  const lifestyleVal = lifestyle[currentLifeQ?.id];
  const persVal = personality[currentPersQ?.id];
  const prodVal = products[currentProdQ?.id];

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      contact,
      lifestyle,
      personality,
      products,
      petCategory,
      earlyAccess,
    };
    try {
      // POST to your Node.js backend: POST /api/submissions
      await fetch(`${import.meta.env.VITE_API_URL}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (_) {
      /* handle gracefully */
    }
    setLoading(false);
    setSubmitted(true);
  };

  const reset = () => {
    setStep(0);
    setLifeIdx(0);
    setPersIdx(0);
    setProdIdx(0);
    setSubmitted(false);
    setContact({ name: "", email: "", phone: "", city: "", multiple: "no" });
    setLifestyle({});
    setPersonality({});
    setProducts({});
    setPetCategory("");
    setEarlyAccess("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div
      className={`modal-overlay ${open ? "open" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="modal" ref={scrollRef}>
        <div className="modal-header">
          <div className="modal-eyebrow">Exclusive Membership</div>
          <div className="modal-title">
            {submitted
              ? "You're in."
              : step === 0
                ? "Tell us about yourself"
                : step === 1
                  ? "Your pet's lifestyle"
                  : step === 2
                    ? "Your pet's personality"
                    : step === 3
                      ? "What matters to you"
                      : "One last thing"}
          </div>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {!submitted && <ProgressSteps step={step} />}

          {submitted ? (
            <div className="success-screen">
              <div className="success-icon">◈</div>
              <div className="success-title">
                Welcome to the{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                  inner circle.
                </em>
              </div>
              <div style={{ marginTop: 12 }} className="success-subtitle">
                Your profile has been received. We'll be in touch with something
                made precisely for {contact.name.split(" ")[0] || "you"}.
              </div>
            </div>
          ) : step === 0 ? (
            <ContactStep contact={contact} setContact={setContact} />
          ) : step === 1 ? (
            currentLifeQ.multi ? (
              <MultiChoice
                q={currentLifeQ}
                value={lifestyle[currentLifeQ.id]}
                onChange={(v) => setL(currentLifeQ.id, v)}
              />
            ) : (
              <SingleChoice
                q={currentLifeQ}
                value={lifestyle[currentLifeQ.id]}
                onChange={(v) => setL(currentLifeQ.id, v)}
              />
            )
          ) : step === 2 ? (
            <SingleChoice
              q={currentPersQ}
              value={personality[currentPersQ.id]}
              onChange={(v) => setP(currentPersQ.id, v)}
            />
          ) : step === 3 ? (
            <SingleChoice
              q={currentProdQ}
              value={products[currentProdQ.id]}
              onChange={(v) => setPr(currentProdQ.id, v)}
            />
          ) : (
            <FinishStep
              petCategory={petCategory}
              setPetCategory={setPetCategory}
              earlyAccess={earlyAccess}
              setEarlyAccess={setEarlyAccess}
            />
          )}
        </div>

        {!submitted && (
          <div className="modal-footer">
            <button
              className="btn-ghost"
              style={{ padding: "10px 24px", fontSize: 10 }}
              onClick={() => {
                if (step === 1 && lifeIdx > 0) {
                  setLifeIdx((i) => i - 1);
                  scrollTop();
                } else if (step === 2 && persIdx > 0) {
                  setPersIdx((i) => i - 1);
                  scrollTop();
                } else if (step === 3 && prodIdx > 0) {
                  setProdIdx((i) => i - 1);
                  scrollTop();
                } else if (step > 0) {
                  setStep((s) => s - 1);
                  scrollTop();
                }
              }}
            >
              ← Back
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {step === 0 && (
                <button
                  className="btn-primary"
                  disabled={!canNextContact}
                  style={{
                    opacity: canNextContact ? 1 : 0.4,
                    padding: "10px 28px",
                    fontSize: 10,
                  }}
                  onClick={() => {
                    setStep(1);
                    scrollTop();
                  }}
                >
                  Continue →
                </button>
              )}
              {step === 1 && (
                <button
                  className="btn-primary"
                  disabled={
                    !lifestyleVal && lifestyleVal !== undefined
                      ? false
                      : !lifestyleVal
                  }
                  style={{
                    opacity:
                      lifestyleVal || lifestyle[currentLifeQ.id]?.length > 0
                        ? 1
                        : 0.4,
                    padding: "10px 28px",
                    fontSize: 10,
                  }}
                  onClick={() => {
                    if (lifeIdx < QUESTIONS.lifestyle.length - 1) {
                      setLifeIdx((i) => i + 1);
                      scrollTop();
                    } else {
                      setStep(2);
                      scrollTop();
                    }
                  }}
                >
                  {lifeIdx < QUESTIONS.lifestyle.length - 1
                    ? "Next →"
                    : "Continue →"}
                </button>
              )}
              {step === 2 && (
                <button
                  className="btn-primary"
                  disabled={!persVal}
                  style={{
                    opacity: persVal ? 1 : 0.4,
                    padding: "10px 28px",
                    fontSize: 10,
                  }}
                  onClick={() => {
                    if (persIdx < QUESTIONS.personality.length - 1) {
                      setPersIdx((i) => i + 1);
                      scrollTop();
                    } else {
                      setStep(3);
                      scrollTop();
                    }
                  }}
                >
                  {persIdx < QUESTIONS.personality.length - 1
                    ? "Next →"
                    : "Continue →"}
                </button>
              )}
              {step === 3 && (
                <button
                  className="btn-primary"
                  disabled={!prodVal}
                  style={{
                    opacity: prodVal ? 1 : 0.4,
                    padding: "10px 28px",
                    fontSize: 10,
                  }}
                  onClick={() => {
                    if (prodIdx < QUESTIONS.products.length - 1) {
                      setProdIdx((i) => i + 1);
                      scrollTop();
                    } else {
                      setStep(4);
                      scrollTop();
                    }
                  }}
                >
                  {prodIdx < QUESTIONS.products.length - 1
                    ? "Next →"
                    : "Continue →"}
                </button>
              )}
              {step === 4 && (
                <button
                  className="btn-primary"
                  disabled={!petCategory || !earlyAccess || loading}
                  style={{
                    opacity: petCategory && earlyAccess && !loading ? 1 : 0.4,
                    padding: "10px 28px",
                    fontSize: 10,
                  }}
                  onClick={handleSubmit}
                >
                  {loading ? "Submitting..." : "Join the Circle →"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactStep({ contact, setContact }) {
  const set = (k) => (e) => setContact((p) => ({ ...p, [k]: e.target.value }));
  return (
    <div>
      <div className="q-text" style={{ marginBottom: 24 }}>
        A few details to personalise your experience.
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            className="form-input"
            placeholder="Your full name"
            value={contact.name}
            onChange={set("name")}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input
            className="form-input"
            type="email"
            placeholder="you@email.com"
            value={contact.email}
            onChange={set("email")}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            className="form-input"
            placeholder="+91 00000 00000"
            value={contact.phone}
            onChange={set("phone")}
          />
        </div>
        <div className="form-group">
          <label className="form-label">City / Country *</label>
          <input
            className="form-input"
            placeholder="Mumbai, India"
            value={contact.city}
            onChange={set("city")}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Do you own more than one pet?</label>
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          {["yes", "no"].map((v) => (
            <div
              key={v}
              className={`q-option ${contact.multiple === v ? "selected" : ""}`}
              style={{ flex: 1 }}
              onClick={() => setContact((p) => ({ ...p, multiple: v }))}
            >
              <div className="q-indicator" />
              <div className="q-option-text">
                {v === "yes" ? "Yes, multiple pets" : "No, just one"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinishStep({
  petCategory,
  setPetCategory,
  earlyAccess,
  setEarlyAccess,
}) {
  return (
    <div>
      <div className="q-label">Final · Category</div>
      <div className="q-text">Which personality matches your pet?</div>
      <div className="pet-categories" style={{ marginBottom: 32 }}>
        {PET_PERSONALITIES.map((p) => (
          <div
            key={p.name}
            className={`pet-cat ${petCategory === p.name ? "selected" : ""}`}
            onClick={() => setPetCategory(p.name)}
          >
            <div className="pet-cat-name">{p.name}</div>
            <div className="pet-cat-tag">{p.tag}</div>
          </div>
        ))}
      </div>
      <div className="q-label">Early Access</div>
      <div className="q-text" style={{ fontSize: 18 }}>
        Want early access to a limited luxury collar collection matched to your
        pet's category?
      </div>
      <div className="q-options">
        <div
          className={`q-option ${earlyAccess === "yes" ? "selected" : ""}`}
          onClick={() => setEarlyAccess("yes")}
        >
          <div className="q-indicator" />
          <div className="q-option-text">Yes — notify me when it drops</div>
        </div>
        <div
          className={`q-option ${earlyAccess === "community" ? "selected" : ""}`}
          onClick={() => setEarlyAccess("community")}
        >
          <div className="q-indicator" />
          <div className="q-option-text">Just here for the community</div>
        </div>
      </div>
    </div>
  );
}

// ─── Get Featured Modal ──────────────────────────────────────────────────────



function FeaturedModal({ open, onClose }) {
  const [files, setFiles] = useState([]);
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [caption, setCaption] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files).map((f) => ({
      name: f.name,
      file: f,
    }));
    setFiles((p) => [...p, ...newFiles].slice(0, 5));
  };
  const removeFile = (i) => setFiles((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("petName", petName);
    fd.append("breed", breed);
    fd.append("caption", caption);
    files.forEach((f) => fd.append("media", f.file));

    // Temp debug — check FormData has files
  for (let [key, val] of fd.entries()) {
    console.log(key, val);
  }
    try {
      // POST to /api/featured with multipart form
      await fetch(`${import.meta.env.VITE_API_URL}/api/featured`, {
        method: "POST",
        body: fd,
      });
    } catch (_) {}
    setSubmitted(true);
  };

  const handleClose = () => {
    setFiles([]);
    setPetName("");
    setBreed("");
    setCaption("");
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className={`modal-overlay ${open ? "open" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="modal">
        <div className="modal-header">
          <div className="modal-eyebrow">Community Spotlight</div>
          <div className="modal-title">Get Featured</div>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {submitted ? (
            <div className="success-screen">
              <div className="success-icon">◈</div>
              <div className="success-title">Submission received.</div>
              <div style={{ marginTop: 12 }} className="success-subtitle">
                Our editors will review and feature worthy submissions on the
                homepage.
              </div>
            </div>
          ) : (
            <>
              <div className="q-text" style={{ marginBottom: 28 }}>
                Upload your pet's finest moments for a chance to be featured on
                our homepage.
              </div>
              <div className="upload-zone">
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFiles}
                />
                <div className="upload-icon">⊕</div>
                <div className="upload-text">
                  Drag & drop or <span>click to browse</span>
                  <br />
                  <span style={{ color: "var(--text3)", fontSize: 11 }}>
                    Images & videos — up to 5 files, max 50MB each
                  </span>
                </div>
              </div>
              {files.length > 0 && (
                <div className="upload-preview">
                  {files.map((f, i) => (
                    <div key={i} className="upload-chip">
                      {f.name.slice(0, 22)}
                      {f.name.length > 22 ? "…" : ""}
                      <button onClick={() => removeFile(i)}>×</button>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ height: 20 }} />
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Pet's Name</label>
                  <input
                    className="form-input"
                    placeholder="Apollo"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Breed</label>
                  <input
                    className="form-input"
                    placeholder="Golden Retriever"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Caption (optional)</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="A moment worth remembering…"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        {!submitted && (
          <div className="modal-footer">
            <button
              className="btn-ghost"
              style={{ padding: "10px 24px", fontSize: 10 }}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              disabled={files.length === 0 || !petName}
              style={{
                opacity: files.length > 0 && petName ? 1 : 0.4,
                padding: "10px 28px",
                fontSize: 10,
              }}
              onClick={handleSubmit}
            >
              Submit for Review →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [joinOpen, setJoinOpen] = useState(false);
  const [featuredOpen, setFeaturedOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(true);
  const scrolled = useScrolled();
  useFadeIn();

  // Fetch live featured pets from backend
  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/api/featured/active`)
  //     .then(r => r.json())
  //     .then(data => {
  //       const items = data.map((m, i) => ({
  //         _id: m._id,
  //         featured: i === 0,
  //         name: m.petName || 'Unknown',
  //         breed: m.breed || '',
  //         caption: m.caption || '',
  //         img: m.files?.[0]
  //           ? `https://velvetpow.onrender.com/uploads/${m.files[0].split(/[\\/]/).pop()}`
  //           : null,
  //       }));
  //       setMediaItems(items);
  //     })
  //     .catch(() => setMediaItems([]))
  //     .finally(() => setMediaLoading(false));
  // }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/featured/active`)
      .then((r) => r.json())
      .then((data) => {
        const items = data.map((m, i) => ({
          _id: m._id,
          featured: i === 0,
          name: m.petName || "Unknown",
          breed: m.breed || "",
          caption: m.caption || "",
          img: m.files?.[0]
            ? m.files[0].startsWith("http")
              ? m.files[0]
              : `${import.meta.env.VITE_API_URL}/${m.files[0].replace(/^\/+/, "")}`
            : null,
        }));
        setMediaItems(items);
      })
      .catch(() => setMediaItems([]))
      .finally(() => setMediaLoading(false));
  }, []);

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          Velvet<span>Paw</span>
        </div>
        <div className="nav-links">
          <a
            onClick={() =>
              document
                .getElementById("community")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Community
          </a>
          <a
            onClick={() =>
              document
                .getElementById("community")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Personalities
          </a>
          <a
            onClick={() =>
              document
                .getElementById("showcase")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Showcase
          </a>
          <a onClick={() => setFeaturedOpen(true)}>Get Featured</a>
        </div>
        <button className="nav-cta" onClick={() => setJoinOpen(true)}>
          Join Us
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-ornament" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            A Private Society for Distinguished Pet Owners
          </div>
          <h1 className="hero-headline">
            Where <em>devotion</em>
            <br />
            becomes an art form.
          </h1>
          <p className="hero-subline">
            An invitation-only community for those who understand that a pet is
            not a companion — they are a presence.
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() =>
                window.open(
                  "mailto:velvetpow@gmail.com?subject=Membership%20Request&body=Hello%20VelvetPaw%2C%0A%0AI%20want%20to%20be%20a%20Member.%0A%0AName%3A%20%0ACity%3A%20%0A%0AThank%20you.",
                  "_blank",
                )
              }
            >
              Request Membership
            </button>
            <button
              className="btn-ghost"
              onClick={() =>
                window.open(
                  "https://chat.whatsapp.com/ExampleCommunityLinkHere",
                  "_blank",
                )
              }
            >
              Explore Community
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-num">10</div>
            <div className="hero-stat-label">Pet Archetypes</div>
          </div>
          <div className="hero-divider" />
          <div>
            <div className="hero-stat-num">∞</div>
            <div className="hero-stat-label">Personalisation</div>
          </div>
          <div className="hero-divider" />
          <div>
            <div className="hero-stat-num">01</div>
            <div className="hero-stat-label">Community</div>
          </div>
        </div>
      </section>

      <div className="divider-line" />

      {/* PERSONALITIES */}
      <section id="community" className="section personalities-bg">
        <div className="section-header fade-in">
          <div className="section-eyebrow">The Archetypes</div>
          <h2 className="section-title">
            Which one is
            <br />
            <em>yours?</em>
          </h2>
          <p className="section-subtitle">
            Every pet carries an essence. We've distilled ten distinct souls —
            each one a lens through which to see your companion differently.
          </p>
        </div>
        <div className="personalities-grid fade-in">
          {PET_PERSONALITIES.map((p, i) => (
            <div
              key={p.name}
              className="personality-card"
              onClick={() => setJoinOpen(true)}
            >
              <div className="personality-num">0{i + 1}</div>
              <div className="personality-name">{p.name}</div>
              <div className="personality-tagline">{p.tag}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-line" />

      {/* MEDIA SHOWCASE */}
      <section
        id="showcase"
        className="section media-bg"
        style={{ paddingBottom: 0 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
          }}
        >
          <div>
            <div className="section-eyebrow">Community Showcase</div>
            <h2 className="section-title">
              Portraits of
              <br />
              <em>distinction.</em>
            </h2>
          </div>
          <button
            className="btn-ghost"
            onClick={() => setFeaturedOpen(true)}
            style={{ whiteSpace: "nowrap" }}
          >
            Submit Your Pet →
          </button>
        </div>
        {mediaLoading ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "var(--text3)",
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Loading showcase…
          </div>
        ) : mediaItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              border: "0.5px solid rgba(160,120,40,0.15)",
            }}
          >
            <div
              style={{
                fontSize: 36,
                color: "rgba(160,120,40,0.2)",
                marginBottom: 16,
              }}
            >
              ◈
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--text3)",
                marginBottom: 8,
              }}
            >
              No featured pets yet
            </div>
            <div style={{ fontSize: 12, color: "var(--text3)" }}>
              Be the first — submit your pet above.
            </div>
          </div>
        ) : (
          <div className="media-grid" style={{ opacity: 1, transform: "none" }}>
            {mediaItems.map((item, i) => (
              <div
                key={item._id || i}
                className={`media-item ${item.featured ? "featured" : ""}`}
              >
                {item.img ? (
                  isVideo(item.img) ? (
                    <video
                      src={item.img}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: "brightness(0.88) saturate(0.85)",
                      }}
                    />
                  ) : (
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: "brightness(0.88) saturate(0.85)",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  )
                ) : (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 8,
                      background: "var(--surface)",
                    }}
                  >
                    <div
                      style={{ fontSize: 32, color: "rgba(160,120,40,0.2)" }}
                    >
                      ◈
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--text3)",
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                )}
                <div
                  className="media-item-overlay"
                  style={{
                    opacity: 1,
                    background:
                      "linear-gradient(to top, rgba(14,13,11,0.75) 0%, transparent 55%)",
                  }}
                />
                <div
                  className="media-item-content"
                  style={{ opacity: 1, transform: "translateY(0)" }}
                >
                  <div className="media-item-name">{item.name}</div>
                  <div className="media-item-breed">{item.breed}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div style={{ height: 80 }} />
      <div className="divider-line" />

      {/* GET FEATURED */}
      <section className="section featured-bg">
        <div className="featured-split">
          <div className="fade-in">
            <div className="section-eyebrow">Get Featured</div>
            <h2 className="section-title">
              Share their
              <br />
              <em>story.</em>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 40 }}>
              The most remarkable pets deserve to be seen. Submit your images
              and video — our editors handpick the finest for the homepage
              spotlight.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                marginBottom: 40,
              }}
            >
              {[
                {
                  icon: "◈",
                  text: "Upload photos and short video clips of your pet",
                },
                {
                  icon: "◇",
                  text: "Our curatorial team reviews all submissions weekly",
                },
                {
                  icon: "◉",
                  text: "Selected pets appear on the homepage — seen by thousands",
                },
              ].map((item) => (
                <div
                  key={item.icon}
                  style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      color: "var(--gold)",
                      fontSize: 16,
                      marginTop: 2,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "var(--text2)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn-primary"
              onClick={() => setFeaturedOpen(true)}
            >
              Submit Your Pet →
            </button>
          </div>
          <div className="fade-in">
            <div className="featured-visual">
              <div style={{ fontSize: 48, color: "rgba(196,160,74,0.2)" }}>
                ◈
              </div>
              <div className="featured-visual-text">Your pet could be here</div>
              <div style={{ position: "absolute", top: 20, right: 20 }}>
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    opacity: 0.6,
                  }}
                >
                  Featured
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-line" />

      {/* DATA / JOIN CTA */}
      <section
        className="section"
        style={{ background: "var(--dark3)", textAlign: "center" }}
      >
        <div className="fade-in" style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            Membership
          </div>
          <h2 className="section-title" style={{ marginBottom: 20 }}>
            This is not a newsletter.
            <br />
            It's a <em>private circle.</em>
          </h2>
          <p
            className="section-subtitle"
            style={{
              maxWidth: 480,
              margin: "0 auto 40px",
              textAlign: "center",
            }}
          >
            Take our five-minute questionnaire. Discover your pet's archetype.
            Receive what was made for them specifically.
          </p>
          <button
            className="btn-primary"
            style={{ padding: "18px 48px", fontSize: 11 }}
            onClick={() => setJoinOpen(true)}
          >
            Begin Your Profile
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">VelvetPaw</div>
            <div className="footer-brand-desc">
              A curated community for ultra-discerning pet owners. By invitation
              only.
            </div>
          </div>
          <div>
            <div className="footer-col-title">Community</div>
            <div className="footer-links">
              <a
                onClick={() =>
                  document
                    .getElementById("community")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Member Directory
              </a>
              <a
                onClick={() =>
                  document
                    .getElementById("community")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Archetypes
              </a>
              <a onClick={() => setFeaturedOpen(true)}>Get Featured</a>
              <a
                href="https://chat.whatsapp.com/ExampleCommunityLinkHere"
                target="_blank"
                rel="noreferrer"
              >
                Events
              </a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Platform</div>
            <div className="footer-links">
              <a onClick={() => setJoinOpen(true)}>Join Us</a>
              <a
                href="mailto:velvetpow@gmail.com?subject=About%20VelvetPaw"
                target="_blank"
                rel="noreferrer"
              >
                About
              </a>
              <a
                href="mailto:velvetpow@gmail.com?subject=Press%20Enquiry"
                target="_blank"
                rel="noreferrer"
              >
                Press
              </a>
              <a
                href="mailto:velvetpow@gmail.com?subject=Partnership%20Enquiry"
                target="_blank"
                rel="noreferrer"
              >
                Partnerships
              </a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-links">
              <a
                href="mailto:velvetpow@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                velvetpow@gmail.com
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a
                href="https://chat.whatsapp.com/ExampleCommunityLinkHere"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Community
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">
            © 2025 VelvetPaw. All rights reserved.
          </div>
          <div className="footer-legal">
            <a
              href="mailto:velvetpow@gmail.com?subject=Privacy%20Policy"
              target="_blank"
              rel="noreferrer"
            >
              Privacy
            </a>
            <a
              href="mailto:velvetpow@gmail.com?subject=Terms%20of%20Service"
              target="_blank"
              rel="noreferrer"
            >
              Terms
            </a>
            <a
              href="mailto:velvetpow@gmail.com?subject=Cookie%20Policy"
              target="_blank"
              rel="noreferrer"
            >
              Cookies
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING JOIN BUTTON */}
      <button className="float-btn" onClick={() => setJoinOpen(true)}>
        Join Us
      </button>

      {/* MODALS */}
      <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />
      <FeaturedModal
        open={featuredOpen}
        onClose={() => setFeaturedOpen(false)}
      />
    </>
  );
}
