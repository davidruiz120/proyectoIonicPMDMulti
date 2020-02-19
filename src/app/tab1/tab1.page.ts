import { Vehiculo } from './../model/Vehiculo';
import { ModaleditarPage } from './../modal/modaleditar/modaleditar.page';
import { UiComponent } from './../common/ui/ui.component';
import { GarageService } from './../services/garage.service';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public listadoPanel;
  public listado$; // El $ indica que es un observable por los programadores
  public textoaBuscar:string = '';
  public icon_confirm:string = '<ion-icon name="checkmark"></ion-icon>';
  public icon_info:string = '<ion-icon name="information-circle"></ion-icon>';

  constructor(public auth: AuthService, private garageService: GarageService, public ui: UiComponent,
        private router: Router, public modalController: ModalController, public alertController: AlertController) {}

  ngOnInit(){
    this.refrescar();
  }

  ionViewDidEnter(){ // Cada vez que se habra esta pestaña, se meterá aquí
    //this.refrescar();
  }

  public buscar(e){
    console.log(e);
    this.textoaBuscar = e.detail.value; // Obtengo el valor del SeachBar
  }

  public borrarVehiculo(id:string){
    console.log("Borrando...");
    this.garageService.deleteGARAGE(id).then((salida)=>{
      this.refrescar();
      console.log("Borrado");
      this.ui.presentToast('Vehiculo eliminado', this.icon_confirm, 'success');
    }).catch((error)=>{
      console.log(error);
      this.ui.presentToast('Error al eliminar el vehículo', this.icon_info, 'danger');
    });
  }


  public editarVehiculo(id:string){
    let id_modal;
    let data_marca;
    let data_modelo;
    this.garageService.readGARAGEByID(id).subscribe((vehiculo)=>{
      id_modal = vehiculo.id;
      data_marca = vehiculo.data().marca;
      data_modelo = vehiculo.data().modelo;
      //console.log("Tab2 ID: " + nota.id);
      //console.log("Tab2 title: " + data_title + " description: " + data_description);
      this.modalEditar(id_modal, data_marca, data_modelo);
    })
  }

  async modalEditar(id_modal:string, data_marca:string, data_modelo:string){
    const modal = await this.modalController.create({
      component: ModaleditarPage,
      componentProps: {
        id: id_modal,
        marca: data_marca,
        modelo: data_modelo
      }
    });
    await modal.present();

    await modal.onDidDismiss().then((salida)=>{
      let dataEdit:Vehiculo;
      dataEdit = {
        marca:salida.data.marca,
        modelo:salida.data.modelo
      }
      this.ui.presentLoading();
      this.garageService.updateGARAGE(salida.data.id, dataEdit).then((ok)=>{
        this.ui.presentToast("Vehículo actualizado", this.icon_confirm, 'success');
      }).catch((error)=>{
        console.log(error);
        this.ui.presentToast("Error al actualizar el vehículo", this.icon_info, 'success');
      }).finally(()=>{
        this.ui.hideLoading();
        this.refrescar();
      })

    }).catch((error)=>{
      console.log("Salida del modal sin cambios");
    });

  }



  private async refrescar(){
    await this.ui.presentLoading();
    try {
      this.garageService.readGARAGE2().subscribe((lista)=>{
        this.listadoPanel = lista;
        this.ui.hideLoading();
        console.log("Refrescado");
      })
    } catch(err){
      this.ui.hideLoading();
      console.log("Error al refrescar");
    }
  }

  public doRefresh(e:any){
    this.listadoPanel=[];
    let Myobservable = this.garageService.readGARAGE();
    Myobservable.subscribe((lista)=>{
      this.listadoPanel = [];
      lista.docs.forEach((vehiculo)=>{
        this.listadoPanel.push({id:vehiculo.id,...vehiculo.data()}); // Concatena dos cosas para unirlas en una
        console.log(vehiculo.id);
        console.log(vehiculo.data());
      });
    })
    e.target.complete();
  }

  public irNueva():void{
    this.router.navigateByUrl('/tabs/tab2');
  }

  async presentAlertConfirmBorrar(id:string) {
    const alert = await this.alertController.create({
      header: 'Borrar',
      message: '¿Desea eliminar el vehículo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Aceptado');
            this.borrarVehiculo(id);
          }
        }
      ]
    });
    await alert.present();
  }

  public logout(){
    this.auth.logout();
  }

}
