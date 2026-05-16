import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-typewriter',
  imports: [NgClass],
  templateUrl:'typewriter.component.html',
  styleUrl: './typewriter.component.scss',
})
export class TypewriterComponent implements AfterViewInit {

  @Input({ required: true }) text = '';

  @Input() duration = 3;

  @Input() restartDelay = 3000;

  typing = false;

  done = false;

  private restartTimeout?: ReturnType<typeof setTimeout>;

  get fastBlink(): number {
    return this.text.length
      ? this.duration / this.text.length
      : 0.1;
  }
  ngAfterViewInit(): void {
    this.startTyping();
  }

  private startTyping(): void {
    clearTimeout(this.restartTimeout);

    this.typing = false;
    this.done = false;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.typing = true;
      });
    });
  }

  onAnimationEnd(event: AnimationEvent): void {
    if (!event.animationName.includes("typing")) {
      return;
    }
    this.typing = false;
    this.done = true;
    this.restartTimeout = setTimeout(() => {
      this.startTyping();
    }, this.restartDelay);
  }
}