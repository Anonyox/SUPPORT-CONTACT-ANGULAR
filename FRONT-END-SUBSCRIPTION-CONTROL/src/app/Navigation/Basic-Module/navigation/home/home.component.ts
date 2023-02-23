import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private title: Title,
    private router: Router) {

      localStorage.setItem('block-menu','true');

    // this.pingService.ping().subscribe(status => {

    // }, err => {


    //   if (err.status == 401) {
    //     this.handleInform("SESSÃO EXPIRADA")
    //     this.router.navigate([''])
    //   }
    //   else {

    //   }
    // });

   }

  ngOnInit(): void {
    this.title.setTitle("Página Inicial")

   
  }

  
  


  

}
