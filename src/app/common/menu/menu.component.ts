import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public auth: AuthService, public alertController: AlertController) { }

  ngOnInit() {}

  /**
   * Función que llama al método de 'logout' del servicio de autencificación.
   * Dicho método realizará lo necesario para eliminar la sesión en el sistema y 
   * redirigir la ruta actual
   */
  public logout():void{
    this.auth.logout();
  }

  /**
   * Función que muestra un 'Alert' para dar la confirmación al usuario de la posibilidad
   * de cerrar la sesión. Si no confirma, no se realizará ninguna acción, si se confirma, 
   * llamará a la función 'logout'
   */
  async presentAlertCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Desea cerrar la sesión? Para volver a usar la aplicación se requerirá un inicio de sesión.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Cerrar sesión',
          handler: () => {
            console.log('Aceptado');
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }

}
