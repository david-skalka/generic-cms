import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import CaseService from '../case-service';
import { DynamicFormComponent, DynamicFormComponentData } from '../dynamic-form/dynamic-form.component';
import { DynamicPropertyCollection } from '../api/model/models';
import { DynamicFormControl } from '../dynamic-form-control';



@Component({
  selector: 'app-dynamic-form-control-collection',
  standalone: false,
  
  templateUrl: './dynamic-form-control-collection.component.html',
  styleUrl: './dynamic-form-control-collection.component.scss'
})
export class DynamicFormControlCollectionComponent implements DynamicFormControl {

  
  
  @Input() onChange: (value: unknown) => void = () => null;
  
  @Input() value: Record<string, unknown>[] = [];

  @Input() property: DynamicPropertyCollection = {defaultValue: '', name: '', type: 'Collection',  properties: [] };

  actionsMap = new Map<string, (item: Record<string, unknown>) => void>();

  constructor(private matDialog: MatDialog, public caseService: CaseService) {
    
    this.actionsMap.set('edit', this.edit.bind(this));
    this.actionsMap.set('delete', this.delete.bind(this));
   }

  
  actions = () => Array.from(this.actionsMap.keys());


  async edit(item: Record<string, unknown>) {
    
    const comp = this.matDialog.open(DynamicFormComponent, { data: { properties: this.property.properties, value: item, title: 'Edit' } as DynamicFormComponentData,  maxWidth: 1024 })

    comp.componentInstance.ok.subscribe((value: Record<string, unknown>) => {
      
      if(value){
        const tmp = this.value;
        tmp[this.value.findIndex(x=>x===item)] = value;
        this.value = Object.assign([], tmp);
        this.onChange(this.value);
        comp.close();
      }
      
      
      
    });

  }

  async add() {
    
    const defaultValue = this.property.properties!.reduce((acc, x) => { 
      acc[this.caseService.camelCase(x.name!)] = x.defaultValue
      return acc;
    }, {} as Record<string, unknown>);
    const comp = this.matDialog.open(DynamicFormComponent, { data: { properties: this.property.properties, value: defaultValue, title: 'Edit' }  as DynamicFormComponentData,  maxWidth: 1024 })

    comp.componentInstance.ok.subscribe((value: Record<string, unknown>) => {
      if(value){
        const tmp = this.value;
        tmp.push(value);
    
        this.value = Object.assign([], tmp);
        this.onChange(this.value);
        comp.close();
      }
    });

    

    
  }

  async delete(item: Record<string, unknown>) {
    const tmp = this.value;
    tmp.splice(this.value.findIndex(x=>x===item), 1);
    this.value = Object.assign([], tmp);
    this.onChange(this.value);

  }



}


