import { MatDialogRef } from '@angular/material/dialog';
import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import CaseService from '../case-service';
import { DynamicProperty } from '../api/model/models';
import { DynamicFormControlMapToken } from '../injection-tokes';


export interface DynamicFormComponentData {
  title: string;
  properties: DynamicProperty[];
  value: Record<string, unknown>;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: false,
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit {


  @Output() ok: EventEmitter<object> = new EventEmitter<object>();

  @Input() errors: string[] = [];

  properties: DynamicProperty[] = [];

  

  writeValueFnMap: Map<string, (value: unknown) => void> = new Map<string, (value: unknown) => void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DynamicFormComponentData, public dialogRef: MatDialogRef<DynamicFormComponent>, public caseService: CaseService, @Inject(DynamicFormControlMapToken) public dynamicFormControlMap: Map<string, never>) { 


    this.data.properties.forEach(property => {
      this.writeValueFnMap.set(property.name!, (value: unknown) => this.data.value[caseService.camelCase(property.name!)] = value);
    });

  }


  async ngOnInit(): Promise<void> {
    this.properties = this.data.properties;
  }



  async okClick(){
    this.ok.emit(this.data.value);
   }





 

}


