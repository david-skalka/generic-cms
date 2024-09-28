import { Component, Input } from '@angular/core';
import { DynamicProperty } from '../api/model/models';
import { DynamicFormControl } from '../dynamic-form-control';



@Component({
  selector: 'app-dynamic-form-control-number',
  standalone: false,
  
  templateUrl: './dynamic-form-control-number.component.html',
  styleUrl: './dynamic-form-control-number.component.scss',
})
export class DynamicFormControlNumberComponent implements DynamicFormControl {


  @Input() onChange: (value: unknown) => void = () => null;
  
   @Input() value: unknown;

   @Input() property: DynamicProperty = {defaultValue: '', name: '', type: 'String' };

   changeValueEvent(event: Event){
    this.onChange(Number.parseFloat((event.target as HTMLInputElement).value));
  }

}


