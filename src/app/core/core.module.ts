import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiHttpService } from './services/api-http.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/config/constants';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [HttpClientModule, ApiHttpService, Constants],
  declarations: [],
  exports: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import Core modules in the AppModule only.'
      );
    }
  }
}
