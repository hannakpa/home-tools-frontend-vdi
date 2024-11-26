import {Component, Input, OnInit} from '@angular/core';
import {MenuCategory} from "../model/MenuCategory";
import {MenuTree} from "../model/MenuTree";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input({required: true})
  menuTrees!: MenuTree[];

  menuOpenFlag = false;
  menuCategoryOpenFlagMap: Map<string, boolean> = new Map();

  constructor() {
    for (const menuCategory in MenuCategory) {
      this.menuCategoryOpenFlagMap.set(menuCategory, false);
    }
  }

  ngOnInit() {
    this.initializeDarkModeButton();
  }

  private initializeDarkModeButton() {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      themeToggleLightIcon?.classList.remove('hidden');
      themeToggleDarkIcon?.classList.add('hidden');
    } else {
      themeToggleDarkIcon?.classList.remove('hidden');
      themeToggleLightIcon?.classList.add('hidden');
    }
  }

  toggleMenuOpenFlag() {
    this.menuOpenFlag = !this.menuOpenFlag
  }

  toggleCategoryItemOpenFlag(menuCategory: MenuCategory) {
    const currentOpenFlag = this.getCurrentOpenFlagForMenuCategory(menuCategory)

    this.menuCategoryOpenFlagMap.set(menuCategory.toString(), !currentOpenFlag);
  }

  getCurrentOpenFlagForMenuCategory(menuCategory: MenuCategory): boolean {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.menuCategoryOpenFlagMap.get(menuCategory.toString())!
  }

  toggleDarkMode() {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    themeToggleDarkIcon?.classList.toggle('hidden');
    themeToggleLightIcon?.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }

      // if NOT set via local storage previously
    } else if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }
}
