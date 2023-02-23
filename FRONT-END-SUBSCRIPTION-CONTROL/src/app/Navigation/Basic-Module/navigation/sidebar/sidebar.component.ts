import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthComponent } from 'src/app/Modules/Production/Basic-Module/auth/auth-component/auth.component';
import { RequisitionService } from 'src/shared/Basic-Module/shared/requisition-service/requisition.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  opened = false
  trueView = false
  menu = false
  openMenu: any = ""
  constructor(private router: Router,
    private authService: AuthComponent, private reqS: RequisitionService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("block-menu"))
    this.openMenu = localStorage.getItem("block-menu")?.toString();
    console.log(this.openMenu)
    this.showHomePageTitle();
  }

  showHomePageTitle() {
    let route = this.router.url.split("/", 5)

    if (this.router.url == '/home' || route[3] == "messages") {
      this.opened = false;
      return false;
    }
    else {
     
      return true;
    }
  }

  showMenuPageTitle() {
    if (this.router.url != '/home') {
      return false;
    }
    else {
      return true;
    }
  }

  navigateToMenu() {
    this.router.navigate(['menu'])
  }



  canActivate() {
    if (this.authService.usuarioAutenticado()) { return true; }

    return false;
  }


  logout() {



    this.reqS.logout().subscribe(logout => {

    }, err => {
      localStorage.setItem('expiredAccess', "logout")


    })
  }





}
