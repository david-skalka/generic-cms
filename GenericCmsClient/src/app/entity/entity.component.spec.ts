import { ComponentFixture, TestBed } from '@angular/core/testing';
import CaseService from '../case-service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntityComponent } from './entity.component';
import { AutocompleteDataProviderModule, EntityServiceProviderToken } from '../injection-tokes';
import { EntityServiceInterface } from '../api';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DynamicListComponent } from '../dynamic-list/dynamic-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';

describe('EntityComponent', () => {
  let component: EntityComponent;
  let fixture: ComponentFixture<EntityComponent>;

  let entityServiceSpy: jasmine.SpyObj<EntityServiceInterface> | null = null;

  const matDialogSpy = jasmine.createSpyObj<MatDialog>(['open']);
    matDialogSpy.open.and.returnValue({componentInstance: {ok: of({name: 'David'})}, close : jasmine.createSpy('close')} as never);

  beforeEach(async () => {

  entityServiceSpy = jasmine.createSpyObj<EntityServiceInterface>(['entityQueryNamePost', 'entityDescriptorNameGet', 'entityNameIdGet', 'entityNameIdPut', 'entityNameIdDelete','entityNameGet', 'entityExecuteOperationNameOperationNamePost' ]);

  entityServiceSpy.entityQueryNamePost.and.returnValue(of([{ path: 'Notebooks' }])  );

  entityServiceSpy.entityNameIdGet.and.returnValue(of({})  );

  entityServiceSpy.entityDescriptorNameGet.and.returnValue(of({model:[], operations: [{inputModel: [], name: 'ProductsCount', outputModel:[]}]})  );

  entityServiceSpy.entityNameIdPut.and.returnValue(of({})  );

  entityServiceSpy.entityNameIdDelete.and.returnValue(of({})  );

  entityServiceSpy.entityNameGet.and.returnValue(of([])  );

  entityServiceSpy.entityExecuteOperationNameOperationNamePost.and.returnValue(of([])  );


    await TestBed.configureTestingModule({
      imports: [ MatTableModule, MatPaginatorModule, BrowserAnimationsModule , RouterModule.forRoot([]), MatCardModule,BrowserAnimationsModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatAutocompleteModule,
      AutocompleteDataProviderModule,
      ReactiveFormsModule,
      MatSelectModule
    ],
      providers: [{ provide: EntityServiceProviderToken, useValue: entityServiceSpy }, CaseService, {provide: MatDialog, useValue: matDialogSpy}],
      declarations: [
        EntityComponent,
        DynamicListComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityComponent);
    component = fixture.componentInstance;

    component.items = [{_id: '1'}] as Record<string, unknown>[];

    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });



  it('should add', async () => {
    await component.add();
    
    expect(component.items.length).toBe(0);
  });


  it('should edit', async () => {
    await component.edit(component.items[0]);
    expect(entityServiceSpy!.entityNameIdPut).toHaveBeenCalled();
  });

  it('should delete', async () => {
    await component.delete(component.items[0]);
    expect(entityServiceSpy!.entityNameIdDelete).toHaveBeenCalled();
  });


  
  it('should execute operation', async () => {
    await component.executeOperation('ProductsCount');
    
    expect(entityServiceSpy!.entityExecuteOperationNameOperationNamePost).toHaveBeenCalled();
  });


});
