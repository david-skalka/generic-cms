import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import CaseService from '../case-service';
import { DynamicProperty } from '../api/model/models';


export interface DynamicListActionClick {
  
  name: string;
  item: Record<string, unknown>;

}


@Component({
  selector: 'app-dynamic-list',
  templateUrl: './dynamic-list.component.html',
  styleUrl: './dynamic-list.component.scss'
})
export class DynamicListComponent implements OnChanges {



  @ViewChild(MatPaginator) paginator: MatPaginator  | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  dataSource: MatTableDataSource<object> = new MatTableDataSource<object>([]);
  
  @Input() properties: DynamicProperty[] = [ ];

  @Input() data: object[] = [ ];


  @Output() actionClick: EventEmitter<DynamicListActionClick> = new EventEmitter<DynamicListActionClick>();

  @Input() actions: string[] = [];

  constructor(public caseService: CaseService) { }



  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']){
      this.dataSource.data = changes['data'].currentValue;
    }
  }


  
  displayedColumns = () => this.properties!.map(x=>x.name!).concat(this.actions.length > 0 ?  ['actions']: [])



}
