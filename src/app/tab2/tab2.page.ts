import { Vehiculo } from './../model/Vehiculo';
import { UiComponent } from './../common/ui/ui.component';
import { GarageService } from './../services/garage.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public imagenVehiculo: string = "";
  public garageForm: FormGroup;
  public icon_confirm:string = '<ion-icon name="checkmark"></ion-icon>';
  public icon_info:string = '<ion-icon name="information-circle"></ion-icon>';

  constructor(private formBuilder: FormBuilder, private camara: Camera, private garageService: GarageService, 
            public ui: UiComponent) {}

  /**
   * Se iniciará el formulario con el 'formBuilder' y se 
   * aplicará las validaciones con 'Validators'
   */
  ngOnInit(){
    this.garageForm = this.formBuilder.group({
      marca:['', Validators.required],
      modelo:['', Validators.required],
    });
  }

  /**
   * Función que se encarga de configurar y abrir la cámara,
   * capturar la imagen y guardarla en una variable
   */
  takePicture() {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE,
      sourceType: this.camara.PictureSourceType.CAMERA
    };

    this.camara.getPicture(options)
    .then((imageData) => {
      this.imagenVehiculo = 'data:image/jpeg;base64,' + imageData;
    })
    .catch((err) => {
      console.log("Error al capturar la imagen");
      console.log(err);
    })
  }

  /**
   * Función que se encarga de borrar la imagen si
   * la mima existe
   */
  eliminarImagen(){
    if(this.imagenVehiculo){
      this.imagenVehiculo = "";
    }
  }

  /**
   * Función que se encarga de agregar el registro en Firebase. 
   * Creando un objeto, mostrando un Loading y usando el servicio
   * que se encarga de llevar e insertar el objeto. Cualquier
   * resultado mostrará un Toast con información al usuario y 
   * cerrará el Loading
   */
  addVehiculo(){
    let data:Vehiculo;
    data = {
      marca:this.garageForm.get('marca').value,
      modelo:this.garageForm.get('modelo').value,
      imagen:this.imagenVehiculo
    }
    this.ui.presentLoading();
    this.garageService.addGARAGE(data)
    .then((ok)=>{
      this.garageForm.reset();
      this.ui.presentToast("Vehículo añadido", this.icon_confirm, 'success');
    })
    .catch((err)=>{
      this.ui.presentToast("Error al añadir el vehículo", this.icon_info, 'danger', 4000);
    })
    .finally(()=>{
      this.ui.hideLoading();
    })
  }

}
