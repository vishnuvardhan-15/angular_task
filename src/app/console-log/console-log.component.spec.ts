import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleLogComponent } from './console-log.component';

describe('ConsoleLogComponent', () => {
  let component: ConsoleLogComponent;
  let fixture: ComponentFixture<ConsoleLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsoleLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsoleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
