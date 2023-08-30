import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeUpdateComponent } from './qr-code-update.component';

describe('QrCodeUpdateComponent', () => {
  let component: QrCodeUpdateComponent;
  let fixture: ComponentFixture<QrCodeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCodeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
