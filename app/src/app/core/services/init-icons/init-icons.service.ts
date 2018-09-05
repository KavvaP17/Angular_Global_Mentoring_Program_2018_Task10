import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Injectable()
export class InitIconsService {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  public init() {
    this.iconRegistry.addSvgIcon(
        'add',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/note_add_48px.svg'));
    this.iconRegistry.addSvgIcon(
        'edit',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit_48px.svg'));
    this.iconRegistry.addSvgIcon(
        'delete',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete_forever_48px.svg'));
    this.iconRegistry.addSvgIcon(
        'calendar',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar.svg'));
    this.iconRegistry.addSvgIcon(
        'time',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/time.svg'));
    this.iconRegistry.addSvgIcon(
        'search',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/search.svg'));
    this.iconRegistry.addSvgIcon(
        'title',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/title.svg'));
    this.iconRegistry.addSvgIcon(
        'logout',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'));
    this.iconRegistry.addSvgIcon(
        'arrow_down',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow_down.svg'));
    this.iconRegistry.addSvgIcon(
        'user',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/user.svg'));
    this.iconRegistry.addSvgIcon(
        'star',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/star.svg'));
    this.iconRegistry.addSvgIcon(
        'visibility',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility.svg'));
    this.iconRegistry.addSvgIcon(
        'visibility-off',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibilityOff.svg'));
    this.iconRegistry.addSvgIcon(
        'author',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/author.svg'));
    this.iconRegistry.addSvgIcon(
        'close',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/close.svg'));
  }

}
