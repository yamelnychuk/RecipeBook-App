import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


/* 
    NOTE
    For routing it's not important that you declared(it's about module approach) component in a same file
    as a routes live, it's just important that you declare it anywhere in application before you have a
    chance visiting that route, whitch includes before a link to this route rendered somewhere
*/
const appRoutes: Routes = [
    {path: "", redirectTo: "/recipes", pathMatch: "full"},
    {path: "shopping", component: ShoppingListComponent}
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}