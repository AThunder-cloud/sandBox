import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Using Angular Signals for efficient, reactive state tracking
  private isDarkModeSignal = signal<boolean>(false);
  public isDarkMode = this.isDarkModeSignal.asReadonly();

  constructor() {
    // Check localStorage or fallback to system browser preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    this.setTheme(shouldBeDark);
  }

  toggleTheme(): void {
    this.setTheme(!this.isDarkModeSignal());
  }

  private setTheme(isDark: boolean): void {
    this.isDarkModeSignal.set(isDark);
    const root = document.documentElement; // Targets the <html> element

    if (isDark) {
      root.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}