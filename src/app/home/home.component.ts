import { Component, HostListener, OnInit } from '@angular/core';

import Panzoom, { PanzoomObject } from '@panzoom/panzoom'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public panzoom: PanzoomObject;
  public oldScale: number;

  constructor() { }

  ngOnInit() {
    const elem = document.getElementById('panzoom-element');

    this.panzoom = Panzoom(elem, {
      minScale: 0.5,
      maxScale: 3,
      origin: "0 0",
    });

    this.panzoom.zoom(1, { animate: true });
  }

  @HostListener("wheel", ["$event"])
    public onWheel(event: WheelEvent) {
      this.oldScale = this.panzoom.getScale();
      if (event.deltaY < 0) {
        this.panzoom.zoomIn();
      } else {
          this.panzoom.zoomOut();
      }
    }

}
