import { Component } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { RouterLink, RouterLinkActive } from "@angular/router"

@Component({
  selector: "app-admin-header",
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLinkActive, RouterLink],
  template: `
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <div class="logo-icon">
            <mat-icon class="spinning-icon">album</mat-icon>
            <div class="logo-glow"></div>
          </div>
          <div class="logo-text">
            <h1 class="main-title">SoundWave Admin</h1>
            <p class="subtitle">Professional Music Platform</p>
          </div>
        </div>

        <nav class="nav">
          <button mat-button class="btn black" [routerLink]="['/show-users']" routerLinkActive="buttonactive">
            <mat-icon class="btn-icon">people</mat-icon>
            <span class="btn-text">User Management</span>
            <div class="btn-glow"></div>
          </button>

          <button mat-button class="btn black" [routerLink]="['/UserGrowth']" routerLinkActive="buttonactive">
            <mat-icon class="btn-icon">analytics</mat-icon>
            <span class="btn-text">Analytics Dashboard</span>
            <div class="btn-glow"></div>
          </button>

          <button mat-button class="btn black">
            <mat-icon class="btn-icon">settings</mat-icon>
            <span class="btn-text">System Settings</span>
            <div class="btn-glow"></div>
          </button>
        </nav>

        <div class="header-status">
          <div class="status-indicator"></div>
          <span class="status-text">Admin Portal</span>
        </div>
      </div>
    </header>
  `,
  styles: [`
    /* Header Styles */
    .header {
      position: relative;
      z-index: 10;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(10px);
      border-bottom: 2px solid rgba(0, 255, 255, 0.3);
      padding: 20px;
      position: sticky;
      top: 0;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
      margin: 0 auto;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .logo-icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .spinning-icon {
      font-size: 3rem;
      color: #00ffff;
      animation: spin 4s linear infinite;
    }

    .logo-glow {
      position: absolute;
      width: 60px;
      height: 60px;
      background: rgba(0, 255, 255, 0.3);
      border-radius: 50%;
      filter: blur(15px);
      animation: pulse 2s ease-in-out infinite;
    }

    .main-title {
      font-size: 2rem;
      font-weight: bold;
      background: linear-gradient(45deg, #00ffff, #008080);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0;
      animation: pulse 3s ease-in-out infinite;
    }

    .subtitle {
      font-size: 0.9rem;
      color: #00ffff;
      margin: 0;
      opacity: 0.8;
    }

    .nav {
      display: flex;
      gap: 20px;
    }

    .btn {
      position: relative;
      color: white !important;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      border-radius: 12px;
      padding: 12px 20px;
      background-color: black;
      border: 2px solid rgba(0, 255, 255, 0.5);
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .btn:hover {
      background-color: rgba(0, 255, 255, 0.1);
      border-color: #00ffff;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 255, 255, 0.2);
    }

    .btn-icon {
      transition: transform 0.3s ease;
    }

    .btn:hover .btn-icon {
      transform: scale(1.2);
    }

    .btn-text {
      position: relative;
      z-index: 2;
    }

    .btn-glow {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .btn:hover .btn-glow {
      left: 100%;
    }

    .header-status {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      background: #00ffff;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }

    .status-text {
      color: #00ffff;
      font-size: 0.9rem;
    }

    /* Animations */
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 20px;
      }

      .nav {
        flex-direction: column;
        width: 100%;
      }
    }
  `]
})
export class AdminHeaderComponent {}