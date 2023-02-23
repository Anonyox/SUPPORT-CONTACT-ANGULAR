import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-required',
  templateUrl: './dialog-required.component.html',
  styleUrls: ['./dialog-required.component.css']
})
export class DialogRequiredComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
