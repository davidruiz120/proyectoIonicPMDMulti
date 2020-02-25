import { UiComponent } from './../common/ui/ui.component';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService, private ui: UiComponent, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Función que se conectará al servicio de autentificación para inciar sesión
   * y redirigir al usuario hacia 'tabs' en el caso de que se haya autenticado
   */
  public async loginGoogle(): Promise<void>{
    this.ui.presentLoading();
    const respuesta:boolean = await this.auth.loginGoogle();
    this.ui.hideLoading();
    if(respuesta) {
      this.router.navigate(['tabs']);
    } else {
      this.ui.presentToast('No se ha podido iniciar la sesión', '', '');
    }
  }

}
