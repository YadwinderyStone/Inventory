import { Component, Input, OnInit } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';


const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#1976d2';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @Input() loading: any;
  public primaryColour = SecondaryBlue;
  public secondaryColour = SecondaryBlue;
  public config = {
    animationType: ngxLoadingAnimationTypes.circleSwish,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px',
  };

}

