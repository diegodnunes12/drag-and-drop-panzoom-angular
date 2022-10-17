import { element } from 'protractor';
import { Component, ElementRef, Input, OnInit } from '@angular/core';

import Panzoom, { PanzoomObject } from '@panzoom/panzoom'

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {
  @Input("scale") public scale: number;
  @Input("oldScale") public oldScale: number;
  @Input("text") public text: string;
  @Input("translate") public translate: {x: number, y: number};

  private panzoom: PanzoomObject;

  constructor(public element: ElementRef) { }

  ngOnInit() {
    this.panzoom = Panzoom(this.element.nativeElement, {
      startX: this.translate.x,
      startY: this.translate.y,
      setTransform: (elem, { x, y, scale }) => {
        this.panzoom.setStyle(
          'transform',
          `scale(${scale}) translate(${x / this.scale}px, ${y / this.scale}px)`
        );
      },

    });
  }

  ngOnChanges(change) {
    if(change["scale"] && this.panzoom) {
      // Ajusta o elemento quando houver alteração na escala
      this.panzoom.pan((this.panzoom.getPan().x / this.oldScale) * this.scale, (this.panzoom.getPan().y / this.oldScale) * this.scale, {
        animate: true
      });
    }
  }
}
