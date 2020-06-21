import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankingsComponent } from './rankings/rankings.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'rankings' },
  { path: 'rankings', component: RankingsComponent, data: { routeState: 1 } },
  { path: 'player/:id', component: PlayerStatsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
