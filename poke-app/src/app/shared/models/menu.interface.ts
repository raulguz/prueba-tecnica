export interface IMenuItem {
  icon?: string;
  label: string;
  isSelected?: boolean;
  path?: string;
  children: IMenuItem[];
}
