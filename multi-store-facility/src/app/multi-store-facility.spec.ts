import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MultiStoreFacility } from './multi-store-facility';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MultiStoreFacility
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MultiStoreFacility);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'multi-store-facility'`, () => {
    const fixture = TestBed.createComponent(MultiStoreFacility);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('multi-store-facility');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MultiStoreFacility);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('multi-store-facility app is running!');
  });
});
