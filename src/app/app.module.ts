import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RankingsComponent } from './rankings/rankings.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { NewMatchComponent } from './new-match/new-match.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, RankingsComponent, PlayerStatsComponent, NewMatchComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, LayoutModule, BrowserAnimationsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
