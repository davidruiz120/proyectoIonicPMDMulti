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
  public tieneImagen: boolean;
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

  /**
   * Función que establezco el texto a buscar con el texto del SearchBar
   * 
   * @param e Evento que detecta ionChange
   */
  public buscar(e):void{
    console.log(e);
    this.textoaBuscar = e.detail.value; // Obtengo el valor del SeachBar
  }

  /**
   * Función que se encarga de borrar el registro/vehículo, usando 
   * el servicio para realizar el proceso con Firebase y mostrando un
   * Toast con el resultado final
   * 
   * @param id El identificador del vehículo
   */
  public borrarVehiculo(id:string):void{
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

  /**
   * Función que se encarga de recoger los datos del registro según el 
   * identificador, guardarlos en una variable individualmente y enviarlo
   * a un método que se encarga de enviar dichos datos al modal
   * 
   * @param id El identificador del vehículo
   */
  public editarVehiculo(id:string):void{
    let id_modal;
    let data_marca;
    let data_modelo;
    let data_imagen;
    this.garageService.readGARAGEByID(id).subscribe((vehiculo)=>{
      id_modal = vehiculo.id;
      data_marca = vehiculo.data().marca;
      data_modelo = vehiculo.data().modelo;
      data_imagen = vehiculo.data().imagen;
      //console.log("Tab2 ID: " + nota.id);
      //console.log("Tab2 title: " + data_title + " description: " + data_description);
      this.modalEditar(id_modal, data_marca, data_modelo, data_imagen);
    })
  }

  /**
   * Función que se encarga de abrir el modal que se encargará del formulario
   * y previamente enviar esos datos al modal.
   * 
   * Después cuando el modal se cierre se creará un objeto con los datos
   * (modificados o no) y se usará el servicio encargado de actualizar los datos
   * con el objeto y el identificador del registro. Todo esto, mostrando feedback
   * como un Loading o un Toast informando en pantalla la información al usuario
   * 
   * @param id_modal El identificador del vehículo
   * @param data_marca Atributo Marca de la entidad Vehículo
   * @param data_modelo Atributo Modelo de la entidad Vehículo
   * @param data_imagen Atributo Imagen de la entidad Vehículo
   */
  async modalEditar(id_modal:string, data_marca:string, data_modelo:string, data_imagen:string){
    const modal = await this.modalController.create({
      component: ModaleditarPage,
      componentProps: {
        id: id_modal,
        marca: data_marca,
        modelo: data_modelo,
        imagen: data_imagen
      }
    });
    await modal.present();

    await modal.onDidDismiss().then((salida)=>{
      let dataEdit:Vehiculo;
      dataEdit = {
        marca:salida.data.marca,
        modelo:salida.data.modelo,
        imagen:salida.data.imagen
      }
      this.ui.presentLoading();
      this.garageService.updateGARAGE(salida.data.id, dataEdit).then((ok)=>{
        this.ui.presentToast("Vehículo actualizado", this.icon_confirm, 'success');
      }).catch((error)=>{
        console.log(error);
        this.ui.presentToast("Error al actualizar el vehículo", this.icon_info, 'success');
      }).finally(()=>{
        //this.ui.hideLoading();
        this.refrescar();
      })

    }).catch((error)=>{
      console.log("Salida del modal sin cambios");
    });

  }


  /**
   * Función que se encarga de refrescar la pantalla haciendo que se 
   * muestre un Loading y se actualice el array del listado usando el 
   * servicio para recoger los registros
   */
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

  /**
   * Función que se encarga de actualizar la vista y el listado
   * al realizarse el evento de ionRefresh
   * 
   * @param e Variable que recoge el evento ionRefresh
   */
  public doRefresh(e:any){
    this.listadoPanel=[];
    let Myobservable = this.garageService.readGARAGE();
    Myobservable.subscribe((lista)=>{
      this.listadoPanel = [];
      lista.docs.forEach((vehiculo)=>{
        this.listadoPanel.push({id:vehiculo.id,...vehiculo.data()}); // Concatena dos cosas para unirlas en una
        console.log(vehiculo.id);
        console.log(vehiculo.data());
        if(this.listadoPanel.find(i => i.id === vehiculo.id).imagen){
          this.tieneImagen = true;
        } else {
          this.tieneImagen = false;
        }
      });
    })
    e.target.complete();
  }

  /**
   * Función simple que se encarga de redirigir a 
   * la página 'tabs/tab2'
   */
  public irNueva():void{
    this.router.navigateByUrl('/tabs/tab2');
  }

  /**
   * Función que se encarga de mostrar un mensaje de confirmación
   * al usuario para confirmar la eliminación del vehículo
   * 
   * @param id El identificador del vehículo
   */
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

}
