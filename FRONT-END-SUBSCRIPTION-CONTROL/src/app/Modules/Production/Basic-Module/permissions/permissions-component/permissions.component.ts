import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Hydrogen', weight: 1.0079, symbol: 'H', update: ''} ,
  {name: 'Helium', weight: 4.0026, symbol: 'He', update: ''},
  {name: 'Lithium', weight: 6.941, symbol: 'Li', update: ''},
  {name: 'Beryllium', weight: 9.0122, symbol: 'Be', update: ''},
  {name: 'Boron', weight: 10.811, symbol: 'B', update: ''},
  {name: 'Carbon', weight: 12.0107, symbol: 'C', update: ''},
  {name: 'Nitrogen', weight: 14.0067, symbol: 'N', update: ''},
  {name: 'Oxygen', weight: 15.9994, symbol: 'O', update: ''},
  {name: 'Fluorine', weight: 18.9984, symbol: 'F', update: ''},
  { name: 'Neon', weight: 20.1797, symbol: 'Ne', update: ''},
  { name: 'Sodium', weight: 22.9897, symbol: 'Na', update: ''},
  { name: 'Magnesium', weight: 24.305, symbol: 'Mg', update: ''},
  { name: 'Aluminum', weight: 26.9815, symbol: 'Al', update: ''},
  { name: 'Silicon', weight: 28.0855, symbol: 'Si', update: ''},
  { name: 'Phosphorus', weight: 30.9738, symbol: 'P', update: ''},
  { name: 'Sulfur', weight: 32.065, symbol: 'S', update: ''},
  { name: 'Chlorine', weight: 35.453, symbol: 'Cl', update: ''},
  { name: 'Argon', weight: 39.948, symbol: 'Ar', update: ''},
  { name: 'Potassium', weight: 39.0983, symbol: 'K', update: ''},
  { name: 'Calcium', weight: 40.078, symbol: 'Ca', update: ''},
];

export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
  update: string;
}


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'weight', 'symbol', 'update'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

}
