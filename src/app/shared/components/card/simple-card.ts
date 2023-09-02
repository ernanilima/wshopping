export interface SimpleCard {
  routerLink: string;
  title: string;
  total: number;
  icon: string;

  // iconColor tem que ser compativel com as classes 'text' e 'bg'
  // exemplo: text-COLOR-500, bg-COLOR-100
  iconColor: string;
}
