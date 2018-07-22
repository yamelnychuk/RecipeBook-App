import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HomeComponent } from "./core/home/home.component";


/* 
    NOTE
    For routing it's not important that you declared(it's about module approach) component in a same file
    as a routes live, it's just important that you declare it anywhere in application before you have a
    chance visiting that route, whitch includes before a link to this route rendered somewhere
*/
const appRoutes: Routes = [
    /* {path: "", redirectTo: "/recipes", pathMatch: "full"}, */
    {path: "", component: HomeComponent},
    /* can be improved/protected with canLoad which may be implemented in AuthGuard*/
    {path: "recipes", loadChildren: "./recipes/recipes.module#RecipesModule"},
    {path: "shopping", component: ShoppingListComponent}
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}