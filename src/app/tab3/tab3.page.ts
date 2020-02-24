import { Component } from '@angular/core';
import { UiComponent } from './../common/ui/ui.component';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  textoReconocido: String[];
  isRecording = false;

  constructor(private nativeAudio: NativeAudio, public ui: UiComponent, private stream: StreamingMedia,
          private plt: Platform, private speech: SpeechRecognition, private cd: ChangeDetectorRef) {}

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


  activarToast(){
    this.ui.presentToast("Toast con animación de Ionic", "", "");
  }




  // =========== Streaming Video ==============
  startVideo(){
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log() },
      errorCallback: () => { console.log() },
      orientation: 'portrait'
    }
    this.stream.playVideo('http://techslides.com/demos/sample-videos/small.mp4', options);
  }



  // =========== Reconocimiento de voz || Micrófono =============
  isIos() {
    return this.plt.is('ios');
  }

  getPermiso(){
    this.speech.hasPermission()
    .then((hasPermission: boolean) =>{
      if(!hasPermission){
        this.speech.requestPermission();
      }
    })
  }

  startListening(){
    let options = {
      language: 'es-ES'
    }
    this.speech.startListening().subscribe(matches => {
      this.textoReconocido = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  stopListening(){
    this.speech.stopListening()
    .then(() =>{
      this.isRecording = false;
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
