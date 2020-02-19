import { ModaleditarPage } from './../modal/modaleditar/modaleditar.page';
import { PipesModule } from './../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ModaleditarPageModule } from '../modal/modaleditar/modaleditar.module';

@NgModule({
  entryComponents: [
    ModaleditarPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    ModaleditarPageModule,
    PipesModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
