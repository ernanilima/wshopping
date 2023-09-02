import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SimpleCard } from './simple-card';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
})
export class SimpleCardComponent implements OnInit, OnChanges {
  @Input({ required: true }) public simpleCard: SimpleCard;

  public routerLink: string;
  public title: string;
  public total: number;
  public icon: string;
  public iconColor: string;
  public iconBackground: string;

  public ngOnInit(): void {
    this.routerLink = this.simpleCard.routerLink;
    this.title = this.simpleCard.title;
    this.icon = this.simpleCard.icon;
    this.iconColor = 'text-' + this.simpleCard.iconColor + '-500';
    this.iconBackground = 'bg-' + this.simpleCard.iconColor + '-100';
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.total = changes['simpleCard'].currentValue.total;
  }
}
