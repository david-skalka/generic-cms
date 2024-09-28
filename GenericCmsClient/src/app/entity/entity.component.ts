import { Component, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import CaseService from '../case-service';
import { DynamicFormComponent, DynamicFormComponentData } from '../dynamic-form/dynamic-form.component';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DynamicListActionClick } from '../dynamic-list/dynamic-list.component';
import { EntityDescriptor, DynamicProperty, EntityServiceInterface } from '../api';
import { lastValueFrom } from 'rxjs';
import { EntityServiceProviderToken } from '../injection-tokes';


@Component({
  selector: 'app-new-page',
  standalone: false,
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss'
})
export class EntityComponent {


  items: Record<string, unknown>[] = [];
  descriptor: EntityDescriptor = {model:[], operations: []};
  name = "";  
  operations: string[] = [];

  operationForm = new FormGroup({
    operation: new FormControl(null, {validators: [Validators.required]})
  });

  entityActions: DynamicListActionClick[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator  | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  
  operationResultModel: DynamicProperty[] = [];
  
  operationResultData: [] = [];

  
  actionsMap = new Map<string, (item: Record<string, unknown>) => void>();


  constructor(@Inject(EntityServiceProviderToken) private entityService: EntityServiceInterface, private matDialog: MatDialog, public caseService: CaseService, private route: ActivatedRoute) {

    this.route.paramMap.subscribe(async (params) => {
      this.name = params.get('name')!;
      this.items = [];
      this.descriptor = (await lastValueFrom(this.entityService.entityDescriptorNameGet(this.name)));
      this.loadData(this.name);
    });


    this.actionsMap.set('edit', this.edit.bind(this));
    this.actionsMap.set('delete', this.delete.bind(this));

   }


  async loadData(name: string) {
    this.items = (await lastValueFrom(this.entityService.entityNameGet(name)));
  }


  actions = () => Array.from(this.actionsMap.keys());


  async edit(item: Record<string, unknown>) {
    
    const detail = (await lastValueFrom(this.entityService.entityNameIdGet(this.name, item['_id'] as string))) as Record<string, unknown>;


    const value = this.descriptor.model!.reduce((acc, x) => { 
      acc[this.caseService.camelCase(x.name!)] = detail[this.caseService.camelCase(x.name!)];
      return acc;
    }, {} as Record<string, unknown>);

    
    const comp = this.matDialog.open(DynamicFormComponent, { data: { properties: this.descriptor.model, value: value, title: 'Edit' } as DynamicFormComponentData,  maxWidth: 1024 } )
    comp.componentInstance.ok.subscribe(async (value: object) => {
      try{
        await lastValueFrom(this.entityService.entityNameIdPut(this.name, item['_id'] as string, value));
        comp.close();
        await this.loadData(this.name!);
       } catch(e){
          const err =e as {status: number, error: Record<string, unknown>};
        if(err.status===400){
          
          comp.componentInstance.errors = Object.keys(err.error).map(key=>`${key}: ${err.error[key]}`);
        }
       }
    });
    

    
    
  }

  async add() {

    const defaultValue = this.descriptor.model!.reduce((acc, x) => { 
      acc[this.caseService.camelCase(x.name!)] = x.defaultValue
      return acc;
    }, {} as Record<string, unknown>);
    const comp = this.matDialog.open(DynamicFormComponent, { data: { properties: this.descriptor.model, value: defaultValue, title: 'Add'} as DynamicFormComponentData,  maxWidth: 1024 })
    comp.componentInstance.ok.subscribe(async (value: object) => {
      try{
        await lastValueFrom(this.entityService.entityNamePost(this.name!, value));
        comp.close();
        await this.loadData(this.name!);
       } catch(e){
        const err =e as {status: number, error: Record<string, unknown>};
        if(err.status===400){
          comp.componentInstance.errors = Object.keys(err.error).map(key=>`${key}: ${err.error[key]}`);
        }
       }
    });
  }


  async delete(item: Record<string, unknown>) {
    await lastValueFrom(this.entityService.entityNameIdDelete(this.name!, item['_id'] as string));
    await this.loadData(this.name);
  }



  async executeOperation(operationName: string) {
    
    const inputModel = this.descriptor.operations!.find(operation=>operation.name===operationName)?.inputModel;

    const defaultValue = inputModel!.reduce((acc, x) => { 
      acc[this.caseService.camelCase(x.name!)] = x.defaultValue
      return acc;
    }, {} as Record<string, unknown>);


    const comp = this.matDialog.open(DynamicFormComponent, { data: { properties: inputModel , value: defaultValue, title: 'Execute' } as DynamicFormComponentData, maxWidth: 1024 })

    comp.componentInstance.ok.subscribe(async (value: object) => {
      try{
        this.operationResultData=[];
        this.operationResultModel=[];
        this.operationResultModel = this.descriptor.operations!.find(operation=>operation.name===operationName)!.outputModel!;
        this.operationResultData = await lastValueFrom(this.entityService.entityExecuteOperationNameOperationNamePost(this.name, this.operationForm.value.operation!, value)) as [];
        comp.close();
        
       } catch(e){
        const err =e as {status: number, error: Record<string, unknown>};
        if(err.status===400){
          comp.componentInstance.errors = Object.keys(err.error).map(key=>`${key}: ${err.error[key]}`);
        }
       }
    });

  }
    


  

}



