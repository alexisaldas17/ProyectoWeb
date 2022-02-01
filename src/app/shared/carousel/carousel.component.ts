import { Component, Input, OnInit } from '@angular/core';
import { IcarouselItem } from 'src/app/model/icarousel-item';
import { Ifotos } from 'src/app/model/ifotos';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() height = 500;
  @Input() isFullScreen = false;
  @Input() items: Ifotos[] = [];

  public finalHeigh: string | number = 0;
  public currentPosition = 0;

  constructor() {
    this.finalHeigh = this.isFullScreen ? '100vh' : `${this.height}px`;
  }

  ngOnInit() {
    this.items.map((i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }
  setCurrentPosition(position: number) {
    this.currentPosition = position;
    this.items.find(i => i.id === 0)!.marginLeft = -100 * position;
  }
  setNext(){
    let finalPorcentaje =0;
    let nextPosition = this.currentPosition+1;
    if(nextPosition<= this.items.length-1)
    finalPorcentaje=-100* nextPosition;
    else{
      nextPosition=0;
    }
    this.items.find(i=> i.id===0)!.marginLeft = finalPorcentaje;
    this.currentPosition = nextPosition;
  }
  setBack(){
    let finalPorcentaje =0;
    let backPosition = this.currentPosition-1;
    if(backPosition>=0){
      finalPorcentaje= -100* backPosition;
    }else{
      backPosition= this.items.length - 1;
      finalPorcentaje= -100* backPosition;
    }
    this.items.find(i=> i.id===0)!.marginLeft = finalPorcentaje;
    this.currentPosition = backPosition;
  }
}
