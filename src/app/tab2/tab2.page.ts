import { Vehiculo } from './../model/Vehiculo';
import { UiComponent } from './../common/ui/ui.component';
import { GarageService } from './../services/garage.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public garageForm: FormGroup;
  public icon_confirm:string = '<ion-icon name="checkmark"></ion-icon>';
  public icon_info:string = '<ion-icon name="information-circle"></ion-icon>';

  constructor(private formBuilder: FormBuilder, private garageService: GarageService, 
            public ui: UiComponent) {}

  ngOnInit(){
    this.garageForm = this.formBuilder.group({
      marca:['', Validators.required],
      modelo:['', Validators.required],
    });
  }

  addNote(){
    let data:Vehiculo;
    data = {
      marca:this.garageForm.get('marca').value,
      modelo:this.garageForm.get('modelo').value
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
