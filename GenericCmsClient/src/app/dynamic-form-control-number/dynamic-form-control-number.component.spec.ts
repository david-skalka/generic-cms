import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormControlNumberComponent } from './dynamic-form-control-number.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

describe('DynamicFormControlNumberComponent', () => {
  let component: DynamicFormControlNumberComponent;
  let fixture: ComponentFixture<DynamicFormControlNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatFormFieldModule, FormsModule, BrowserAnimationsModule, MatInputModule ],
      declarations: [ DynamicFormControlNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormControlNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
