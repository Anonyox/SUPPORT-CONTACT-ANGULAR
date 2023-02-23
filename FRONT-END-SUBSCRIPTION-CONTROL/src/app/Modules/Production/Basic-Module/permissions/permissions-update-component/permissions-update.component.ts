import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
]

export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-permissions-update',
  templateUrl: './permissions-update.component.html',
  styleUrls: ['./permissions-update.component.css']
})
export class PermissionsUpdateComponent implements OnInit {

  id = '';
  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private activatedRoute: ActivatedRoute,) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });


  ngOnInit(): void {
    const { params } = this.activatedRoute;

    params.subscribe(data => {
    this.id = data['name']
    })
  }

}
