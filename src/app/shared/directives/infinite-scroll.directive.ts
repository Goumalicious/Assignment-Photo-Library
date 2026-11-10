import { DestroyRef, Directive, effect, ElementRef, inject, input, output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  readonly disabled = input(false);
  readonly scrolled = output<void>();

  private readonly element: HTMLElement = inject(ElementRef).nativeElement;

  private readonly observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !this.disabled()) {
        this.scrolled.emit();
      }
    },
    // Start loading 300px before the marker actually reaches the bottom of the screen.
    { rootMargin: '0px 0px 300px 0px' },
  );

  constructor() {
    effect(() => {
      if (!this.disabled()) {
        this.observer.unobserve(this.element);
        this.observer.observe(this.element);
      }
    });

    inject(DestroyRef).onDestroy(() => this.observer.disconnect());
  }
}
