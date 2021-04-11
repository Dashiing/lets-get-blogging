import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lgb-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'LetsGet Blogging';
}
