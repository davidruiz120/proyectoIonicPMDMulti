import { Component } from '@angular/core';
import { UiComponent } from './../common/ui/ui.component';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private nativeAudio: NativeAudio, public ui: UiComponent) {}

  ngOnInit(){
    this.animacionCSS3();
  }

  ionViewWillEnter(){
    this.nativeAudio.preloadSimple('sound1', 'assets/audio/sound1.mp3')
    .catch((err)=>{
      this.ui.presentToast('Error - No se ha podido precargar el audio', '', 'danger');
      console.log(err);
    });
  }

  reproducir(){
    this.nativeAudio.play('sound1')
    .catch((err)=>{
      this.ui.presentToast('Error - No se ha podido reproducir el audio', '', 'danger');
      console.log(err);
    })
  }

  ionViewWillLeave(){
   this.nativeAudio.unload('sound1')
   .catch((err)=>{
    this.ui.presentToast('No se ha podido descargar el audio', '', 'danger');
    console.log(err);
   })
  }







  // ================= Animación CSS3 ===============
  // https://codepen.io/nourabusoud/pen/ypZzMM
  animacionCSS3(){
    var animateButton = function(e) {
      e.preventDefault;
      e.target.classList.remove('animate');
      e.target.classList.add('animate');
      setTimeout(function(){
        e.target.classList.remove('animate');
      },700);
    };
    
    var bubblyButtons = document.getElementsByClassName("bubbly-button");
    
    for (var i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', animateButton, false);
    }
  }

}
