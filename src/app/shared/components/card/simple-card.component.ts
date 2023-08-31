import { Component, Input, OnInit } from '@angular/core';
import { SimpleCard } from './simple-card';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
})
export class SimpleCardComponent implements OnInit {
  @Input({ required: true }) public simpleCard: SimpleCard;

  public title: string;
  public total: number;
  public icon: string;
  public iconColor: string;
  public iconBackground: string;

  public ngOnInit(): void {
    this.title = this.simpleCard.title;
    this.total = this.simpleCard.total;
    this.icon = this.simpleCard.icon;
    this.iconColor = 'text-' + this.simpleCard.iconColor + '-500';
    this.iconBackground = 'bg-' + this.simpleCard.iconColor + '-100';
  }
}
