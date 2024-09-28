import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicListComponent } from './dynamic-list.component';
import CaseService from '../case-service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('DynamicListComponent', () => {
  let component: DynamicListComponent;
  let fixture: ComponentFixture<DynamicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatTableModule, MatPaginatorModule, BrowserAnimationsModule ],
      providers: [CaseService],
      declarations: [
        DynamicListComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicListComponent);
    component = fixture.componentInstance;

    component.properties= [ { name: 'name', type: 'string' } ];

    fixture.detectChanges();
  });

  it('should create', () => {

    const changesObj: SimpleChanges = {
      data: new SimpleChange([], [], false),
    };
    
    component.ngOnChanges(changesObj);
    
    expect(component).toBeTruthy();
  });
});
