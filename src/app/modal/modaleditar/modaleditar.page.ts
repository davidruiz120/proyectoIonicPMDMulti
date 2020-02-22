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

  @Input() id;
  @Input() marca;
  @Input() modelo;
  @Input() imagen;

  public garageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private camara: Camera, public modalController: ModalController) { }

  ngOnInit() {
    this.garageForm = this.formBuilder.group({
      marca:['', Validators.required],
      modelo:['', Validators.required]
    });
    this.garageForm.get('marca').setValue(this.marca);
    this.garageForm.get('modelo').setValue(this.modelo);
  }

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

  eliminarImagen(){
    if(this.imagen){
      this.imagen = "";
    }
  }

  editNote(){
    this.modalController.dismiss({
      id: this.id,
      marca: this.garageForm.get('marca').value,
      modelo: this.garageForm.get('modelo').value,
      imagen: this.imagen
    });
  }

  cancelar(){
    this.modalController.dismiss();
  }



}
