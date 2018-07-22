import { NgModule } from "../../../node_modules/@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "../../../node_modules/@angular/common";

@NgModule({
    declarations: [DropdownDirective],
    exports: [DropdownDirective, CommonModule]
})
export class SharedModule {

}