import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
})
export class UiComponent implements OnInit {

  constructor(private loadingController: LoadingController, private toastController: ToastController) { }

  loading:HTMLIonLoadingElement;

  ngOnInit() {}

  /**
   * Función que mostrará el típico 'cargando/loading'. 
   * 
   * Primero cerrará un 'loading' si es que ya existe uno, 
   * si no, mostrará un 'loading'
   */
  public async presentLoading() {
    await this.hideLoading();
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
  }

  /**
   * Función que desactiva el 'loading'.
   * 
   * Primero comprobará si existe ya un 'loading', si es así,
   * lo cerrará, si no, no hará nada
   */
  public async hideLoading() {
    if(this.loading){
      await this.loading.dismiss();
    }
    this.loading = null;
  }

  /**
   * Función que se encarga de mostrar un 'toast' en pantalla
   * 
   * @param msg Mensaje que mostrará el toast
   * @param icn Icono que se incluirá junto al mensaje
   * @param col El color del toast
   * @param dur La cantidad de milisegundos que durará el toast (2000 por defecto)
   */
  public async presentToast(msg:string, icn:string, col:string, dur:number=2000) {
    const toast = await this.toastController.create({
      message: icn + ' ' + msg,
      duration: dur,
      color: col,
      position: 'top'
    });
    toast.present();
  }

}
