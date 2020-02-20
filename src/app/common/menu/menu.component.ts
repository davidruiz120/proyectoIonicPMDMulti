import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {}

  public logout(){
    console.log("Pulsado Cerrar sesión en el menú principal")
    this.auth.logout();
  }

}
