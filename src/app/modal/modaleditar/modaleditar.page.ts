import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-modaleditar',
  templateUrl: './modaleditar.page.html',
  styleUrls: ['./modaleditar.page.scss'],
})
export class ModaleditarPage implements OnInit {

  /**
   * Variables que recibirá el modal
   */
  @Input() id;
  @Input() marca;
  @Input() modelo;
  @Input() imagen;

  public garageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private camara: Camera, public modalController: ModalController) { }

  /**
   * Se iniciará el formulario con el 'formBuilder' y se 
   * aplicará las validaciones con 'Validators'
   * 
   * También se iniciará dicho formulario con los datos que
   * recibe el modal
   */
  ngOnInit() {
    this.garageForm = this.formBuilder.group({
      marca:['', Validators.required],
      modelo:['', Validators.required]
    });
    this.garageForm.get('marca').setValue(this.marca);
    this.garageForm.get('modelo').setValue(this.modelo);
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
      this.imagen = 'data:image/jpeg;base64,' + imageData;
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
    if(this.imagen){
      this.imagen = "";
    }
  }

  /**
   * Función que se encarga de cerrar el modal, pero con la diferencia
   * de que enviará los datos que se han modificado, al menos alguno de ellos
   */
  editVehiculo(){
    this.modalController.dismiss({
      id: this.id,
      marca: this.garageForm.get('marca').value,
      modelo: this.garageForm.get('modelo').value,
      imagen: this.imagen
    });
  }

  /**
   * Función que se encarga de cerrar el modal sin enviar ninguna información
   */
  cancelar(){
    this.modalController.dismiss();
  }



}
