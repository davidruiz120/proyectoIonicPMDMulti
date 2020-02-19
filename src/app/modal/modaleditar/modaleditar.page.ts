import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modaleditar',
  templateUrl: './modaleditar.page.html',
  styleUrls: ['./modaleditar.page.scss'],
})
export class ModaleditarPage implements OnInit {

  @Input() id;
  @Input() marca;
  @Input() modelo;

  public garageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public modalController: ModalController) { }

  ngOnInit() {
    this.garageForm = this.formBuilder.group({
      marca:['', Validators.required],
      modelo:['', Validators.required]
    });
    this.garageForm.get('marca').setValue(this.marca);
    this.garageForm.get('modelo').setValue(this.modelo);
  }

  editNote(){
    this.modalController.dismiss({
      id: this.id,
      marca: this.garageForm.get('marca').value,
      modelo: this.garageForm.get('modelo').value
    });
  }

  cancelar(){
    this.modalController.dismiss();
  }



}
