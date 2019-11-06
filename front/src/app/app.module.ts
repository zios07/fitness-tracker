import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.routes';
import {
  MatDatepickerModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCardModule,
  MatInputModule,
  MatIconRegistry,
  MatProgressSpinnerModule,
  MatTab,
  MatTabsModule,
  MatTableModule,
  MatPaginator,
  MatPaginatorModule,
  MatDialogModule,
  MatGridListModule,
  MatRadioButton,
  MatRadioButtonBase,
  MatRadioModule,
  MatSortModule,
  MatSelectModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatCheckboxModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { NavComponent } from './components/common/nav/nav.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { FoodComponent } from './components/pages/food/food.component';
import { RequestInterceptorService } from './services/request-interceptor.service';
import {DeleteFoodComponent} from './components/common/modal/food/delete-food/delete-food.component';
import {DeleteExerciseComponent} from './components/common/modal/exercise/delete-exercise/delete-exercise.component';
import {EditFoodComponent} from './components/common/modal/food/edit-food/edit-food.component';
import {EditExerciseComponent} from './components/common/modal/exercise/edit-exercise/edit-exercise.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { UsersComponent } from './components/pages/users/users.component';
import { DeleteUserComponent } from './components/common/modal/user/delete-user/delete-user.component';
import { EditUserComponent } from './components/common/modal/user/edit-user/edit-user.component';
import { DatePipe } from '@angular/common';
import { FoodTrackerComponent } from './components/pages/food-tracker/food-tracker.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ExerciseComponent } from './components/pages/exercise/exercise.component';
import { ExerciseTrackerComponent } from './components/pages/exercise-tracker/exercise-tracker.component';
import { DeleteFoodEatenComponent } from './components/common/modal/food-eaten/delete-food-eaten/delete-food-eaten.component';
import { EditExercisePerformedComponent } from './components/common/modal/exercise-performed/edit-exercise-performed/edit-exercise-performed.component';
import { DeleteExercisePerformedComponent } from './components/common/modal/exercise-performed/delete-exercise-performed/delete-exercise-performed.component';
import { EditFoodEatenComponent } from './components/common/modal/food-eaten/edit-food-eaten/edit-food-eaten.component';
import { ReportComponent } from './components/pages/report/report.component';

@NgModule({
  exports: [
    MatSortModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavComponent,
    FoodComponent,
    EditFoodComponent,
    EditExerciseComponent,
    DeleteFoodComponent,
    DeleteExerciseComponent,
    ProfileComponent,
    UsersComponent,
    DeleteUserComponent,
    EditUserComponent,
    ExerciseComponent,
    FoodTrackerComponent,
    ExerciseTrackerComponent,
    HomeComponent,
    ExerciseComponent,
    ExerciseTrackerComponent,
    DeleteFoodEatenComponent,
    EditFoodEatenComponent,
    EditExercisePerformedComponent,
    DeleteExercisePerformedComponent,
    ReportComponent
  ],
  entryComponents: [
    EditFoodComponent,
    EditExerciseComponent,
    DeleteFoodComponent,
    DeleteExerciseComponent,
    DeleteUserComponent,
    EditUserComponent,
    DeleteFoodEatenComponent,
    EditFoodEatenComponent,
    EditExercisePerformedComponent,
    DeleteExercisePerformedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    ToastrModule.forRoot()
  ],
  providers: [
    DatePipe,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
			useClass: RequestInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
