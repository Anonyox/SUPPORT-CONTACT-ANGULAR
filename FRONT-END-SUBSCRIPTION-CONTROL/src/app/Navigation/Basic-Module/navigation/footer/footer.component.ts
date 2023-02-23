import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthComponent } from 'src/app/Modules/Production/Basic-Module/auth/auth-component/auth.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router,
    private authService : AuthComponent) { }

  ngOnInit(): void {
  }

  canActivate() {
    if (this.authService.usuarioAutenticado()) { return true; }

    return false;
  }

}
