import { Routes } from "@angular/router";
import { LoginComponent } from "./components/pages/login/login.component";
import { RegistrationComponent } from "./components/pages/registration/registration.component";
import { FoodComponent } from "./components/pages/food/food.component";
import { AuthGuard } from "./guards/auth.guard";
import { ProfileComponent } from "./components/pages/profile/profile.component";
import { UsersComponent } from "./components/pages/users/users.component";
import { AdminGuard } from "./guards/admin.guard";
import { HomeComponent } from "./components/pages/home/home.component";
import { ExerciseComponent } from "./components/pages/exercise/exercise.component";
import { ExerciseTrackerComponent } from "./components/pages/exercise-tracker/exercise-tracker.component";
import { FoodTrackerComponent } from "./components/pages/food-tracker/food-tracker.component";
import { ReportComponent } from "./components/pages/report/report.component";

export const routes: Routes = [
    { path: "", component: LoginComponent},
    { path: "signup", component: RegistrationComponent},
    { path: "home", component: HomeComponent, canActivate: [AuthGuard]},
    { path: "food", component: FoodComponent, canActivate: [AuthGuard]},
    { path: "food/tracker", component: FoodTrackerComponent, canActivate: [AuthGuard]},
    { path: "profile/edit", component: ProfileComponent, canActivate: [AuthGuard]},
    { path: "admin/users", component: UsersComponent, canActivate: [AuthGuard, AdminGuard]},
    { path: "exercise", component: ExerciseComponent, canActivate: [AuthGuard]},
    { path: "exercise/tracker", component: ExerciseTrackerComponent, canActivate: [AuthGuard]},
    { path: "reports", component: ReportComponent, canActivate: [AuthGuard]},
]