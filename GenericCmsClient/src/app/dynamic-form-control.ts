import { DynamicProperty } from "./api";

export interface DynamicFormControl {


    onChange: (value: unknown)=>void;

    value: unknown;


    property: DynamicProperty;


}