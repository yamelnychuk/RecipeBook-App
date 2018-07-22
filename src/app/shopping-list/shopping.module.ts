import { NgModule } from "../../../node_modules/@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule } from "../../../node_modules/@angular/forms";
import { Routes, RouterModule } from "../../../node_modules/@angular/router";
import { CommonModule } from "../../../node_modules/@angular/common";


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class ShoppingModule {

}