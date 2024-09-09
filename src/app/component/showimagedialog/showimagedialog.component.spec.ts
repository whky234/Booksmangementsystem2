import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowimagedialogComponent } from './showimagedialog.component';

describe('ShowimagedialogComponent', () => {
  let component: ShowimagedialogComponent;
  let fixture: ComponentFixture<ShowimagedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowimagedialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowimagedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
