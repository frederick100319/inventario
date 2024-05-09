import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetAuthComponent } from './reset-auth.component';

describe('ResetAuthComponent', () => {
  let component: ResetAuthComponent;
  let fixture: ComponentFixture<ResetAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
