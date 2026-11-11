import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InfiniteScrollDirective } from './infinite-scroll.directive';

class FakeIntersectionObserver {
  static latest: FakeIntersectionObserver;
  static markerVisible = false;

  constructor(private readonly callback: IntersectionObserverCallback) {
    FakeIntersectionObserver.latest = this;
  }

  observe(): void {
    this.report();
  }
  unobserve(): void {}
  disconnect(): void {}

  //Simulates the user scrolling the marker into or out of view
  scrollMarker(visible: boolean): void {
    FakeIntersectionObserver.markerVisible = visible;
    this.report();
  }

  private report(): void {
    const entry = { isIntersecting: FakeIntersectionObserver.markerVisible };
    this.callback([entry as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }
}

@Component({
  imports: [InfiniteScrollDirective],
  template: `<div appInfiniteScroll [disabled]="loading()" (scrolled)="loads = loads + 1"></div>`,
})
class HostComponent {
  readonly loading = signal(false);
  loads = 0;
}

describe('InfiniteScrollDirective', () => {
  beforeEach(() => {
    FakeIntersectionObserver.markerVisible = false;
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
  });

  afterEach(() => vi.unstubAllGlobals());

  async function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    return fixture;
  }

  it('asks for more when the end of the list comes into view', async () => {
    const fixture = await setup();

    FakeIntersectionObserver.latest.scrollMarker(true);

    expect(fixture.componentInstance.loads).toBe(1);
  });

  it('does not ask for more while a page is loading', async () => {
    const fixture = await setup();
    fixture.componentInstance.loading.set(true);
    await fixture.whenStable();

    FakeIntersectionObserver.latest.scrollMarker(true);

    expect(fixture.componentInstance.loads).toBe(0);
  });

  it('asks again after a load if the end of the list is still in view', async () => {
    FakeIntersectionObserver.markerVisible = true; // the screen is taller than the list
    const fixture = await setup();
    expect(fixture.componentInstance.loads).toBe(1);

    // A page loads, but the new photos still do not fill the screen...
    fixture.componentInstance.loading.set(true);
    await fixture.whenStable();
    fixture.componentInstance.loading.set(false);
    await fixture.whenStable();
    expect(fixture.componentInstance.loads).toBe(2);

    // The next page fills the screen: the marker is pushed out of view, so it stops.
    FakeIntersectionObserver.markerVisible = false;
    fixture.componentInstance.loading.set(true);
    await fixture.whenStable();
    fixture.componentInstance.loading.set(false);
    await fixture.whenStable();
    expect(fixture.componentInstance.loads).toBe(2);
  });
});
