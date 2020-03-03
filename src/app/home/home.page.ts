import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoComponent } from './info/info.component';
import { Stair } from './stair.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  stairs: Stair[] = [
    new Stair('Private stair A', 'Intended to be used only one dwelling', 150, 220, 245, 260, 42, true),
    new Stair('Private stair B', 'Intended to be used only one dwelling', 165, 200, 223, 300, 42, false),
    new Stair('Institutional and assembly stair', 'Serving place where many people gather', 135, 180, 280, 340, 42, false),
    new Stair('Utility stair', 'Used for escape, access for maintenance, or purpose other than usual route for moving between levels on day-to-day basic.', 150, 190, 250, 320, 42, false),
    new Stair('Easy access stair', 'Used by a broad range of users, and on a day-to day-basic, as the usual route between levels', 150, 170, 250, 320, 42, false),
  ];

  _activeStair = this.stairs[0];

  _segment = '_one';

  _errorGoing = true;
  _stepGoing = 0;
  

  _errorRise = true;
  _stepRise = 0;
  
  _errorPitch = true;
  _pitch = 0;

  // Stair Data
  _stairRise = null;
  _stairGoing = null;
  _risersNumber = null;

  _stairNum = 0;

  constructor(
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this._stairRise = JSON.parse(localStorage.getItem('_stairRise'));
    this._stairGoing = JSON.parse(localStorage.getItem('_stairGoing'));
    this._risersNumber = JSON.parse(localStorage.getItem('_risersNumber'));
    const x = JSON.parse(localStorage.getItem('_activeStairNumber'));
    if (x) {
      this._activeStair = this.stairs[x];
      this._stairNum = x;
    }

    this.onCalculateData();
  }

  async presentModal() {
    const popover = await this.modalController.create({
      component: InfoComponent
    });
    return await popover.present();
  }

  onOpenInfo() {
    this.presentModal();
  }

  onGteActiveStair(x: number) {
    this._activeStair = this.stairs[x];
    localStorage.setItem('_activeStairNumber', JSON.stringify(x));
    //console.log(this._activeStair._riseTreadMax);
  }

  onCalculateData() {
    const stairGoing = Number(this._stairGoing);
    const stepNumber = Number(this._risersNumber);
    const stairRise = Number(this._stairRise);

    let stepGoing: number = stairGoing / (stepNumber - 1);
    let stepRise = stairRise / stepNumber;
    let pitch = Number(Math.atan(stepRise/stepGoing));

    pitch = pitch / Math.PI * 180;

    //console.log(pitch);
    //console.log('Step rise: ' + stepRise + '. Step Going: ' + stepGoing);
    
    if(stairGoing && stairRise && stepNumber > 1) {
      this._stepGoing = Number(stepGoing.toFixed(0));
      this._stepRise = Number(stepRise.toFixed(1));
      this._pitch = Number(pitch.toFixed(2));

      localStorage.setItem('_stairRise', JSON.stringify(this._stairRise));
      localStorage.setItem('_stairGoing', JSON.stringify(this._stairGoing));
      localStorage.setItem('_risersNumber', JSON.stringify(this._risersNumber));
      localStorage.setItem('_activeStair', JSON.stringify(this._activeStair));
    } else {
      this._stepGoing = 0;
      this._stepRise = 0;
      this._pitch = 0;
    }

    if (stepGoing < this._activeStair._goingTreadMin || stepGoing > this._activeStair._goingTreadMax) {
      this._errorGoing = true;
    } else {
      this._errorGoing = false;
    }

    if (stepRise < this._activeStair._riseTreadMin || stepRise > this._activeStair._riseTreadMax) {
      this._errorRise = true;
    } else {
      this._errorRise = false;
    }

    if (pitch > this._activeStair._pitch) {
      this._errorPitch = true;
    } else {
      this._errorPitch = false;
    }
  }

}
