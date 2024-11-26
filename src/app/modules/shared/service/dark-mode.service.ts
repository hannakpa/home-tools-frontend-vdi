import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  checkDarkMode(): boolean {
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'dark') {
        return true;
      }
    }

    return false;
  }
}
