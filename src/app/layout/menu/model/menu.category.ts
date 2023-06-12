export interface MenuItem {
  label: string;
  icon: string;
  routerLink: string[];
}

export interface MenuCategory {
  label: string;
  items: MenuItem[];
}
