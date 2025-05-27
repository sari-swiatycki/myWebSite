import { Routes } from '@angular/router';
import { ShowUsersComponent } from '../components/show-users/show-users.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';

import { UserStatisticsComponent } from '../components/user-statistics/user-statistics.component';

// import { SongsListComponent } from '../components/songs/songs.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'show-users', component: ShowUsersComponent },
    { path: 'UserGrowth', component: UserStatisticsComponent },
];
