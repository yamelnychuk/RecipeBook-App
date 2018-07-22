import { NgModule } from "../../../node_modules/@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { FormsModule } from "../../../node_modules/@angular/forms";
import { Routes, RouterModule } from "../../../node_modules/@angular/router";

const authRoutes: Routes = [
    {path: "signup", component: SignupComponent},
    {path: "signin", component: SigninComponent}
];

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild(authRoutes)
    ],
    exports: [RouterModule]
})
export class AuthModule {

}