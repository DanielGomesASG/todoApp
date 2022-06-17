import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//Components
import { TodoComponent } from "./components/todo/todo.component";

export const rootRoutesConfig: Routes = [
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
    { path: 'todo', component: TodoComponent },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(rootRoutesConfig),
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class AppRoutingModule { }