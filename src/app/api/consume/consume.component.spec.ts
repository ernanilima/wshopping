import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeComponent } from './consume.component';

describe('ConsumeComponent', () => {
  let component: ConsumeComponent;
  let fixture: ComponentFixture<ConsumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumeComponent],
    });
    fixture = TestBed.createComponent(ConsumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
