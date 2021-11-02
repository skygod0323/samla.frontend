import { Component } from '@angular/core';
import { SettingsService } from './services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yummy-flavors';

  constructor(
    public setting: SettingsService
  ) {

  }
}
