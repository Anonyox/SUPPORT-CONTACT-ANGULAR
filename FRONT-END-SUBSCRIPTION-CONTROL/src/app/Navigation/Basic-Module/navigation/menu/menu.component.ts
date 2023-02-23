import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RequisitionService } from 'src/shared/Basic-Module/shared/requisition-service/requisition.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private title: Title,  
    private router: Router,
    private pingService: RequisitionService) {

    
    this.pingService.ping().subscribe(status => {

    }, err => {


      if (err.status == 401) {
        alert("SESSÃO EXPIRADA")
        this.router.navigate([''])
      }
      else {

      }
    });
   }

  ngOnInit(): void {
    this.title.setTitle("Menu Principal")

    localStorage.setItem('block-menu','true');
    

  }

  
  
}
