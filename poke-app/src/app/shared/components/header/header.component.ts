import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IMenuItem } from '../../models/menu.interface';
import { MaterialSharedModule } from '../../modules/material-shared/material-shared.module';
import { IconComponent } from '../icon/icon.component';

const CMenuBreakpoint = 900;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialSharedModule, RouterModule, NgFor, NgIf, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() menuItems: IMenuItem[] = [];
  @Output() toggleSidebar = new EventEmitter();

  screenWidth?: number;
  withBreakpoint = CMenuBreakpoint;
  isProfileMenuVisible = false;

  constructor(private el: ElementRef, private router: Router) {}

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    const isClickedOutsiseDesktopMenu = !this.el.nativeElement
      .querySelector('.desktop-menu-container')
      .contains(event.target);
    const isClickedOutsideProfileMenu = !this.el.nativeElement
      .querySelector('.desktop-profile-button')
      .contains(event.target);
    if (isClickedOutsiseDesktopMenu) {
      this.hideMenu();
    }
    if (isClickedOutsideProfileMenu) {
      this.isProfileMenuVisible = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.screenWidth = window.innerWidth;
    this.validateScreenWidthForMenu();
  }

  validateScreenWidthForMenu() {
    if (this.screenWidth && this.screenWidth < this.withBreakpoint) {
      this.hideMenu();
    }
  }

  hideMenu() {
    this.menuItems.forEach((menuOption) => (menuOption.isSelected = false));
  }

  showMenu(item: IMenuItem) {
    if (item.isSelected) {
      item.isSelected = false;
      return;
    }
    this.hideMenu();
    item.isSelected = true;
  }

  onMobileMenuClicked() {
    this.toggleSidebar.emit();
  }

  toggleProfileMenu() {
    this.isProfileMenuVisible = !this.isProfileMenuVisible;
  }

  logout() {
    //TODO
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
