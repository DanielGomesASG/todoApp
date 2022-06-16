import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//Components
import { TodoComponent } from "./components/todo/todo.component";
import { WorkListComponent } from "./components/work-list/work-list.component";
import { MarketListComponent } from "./components/market-list/market-list.component";

export const rootRoutesConfig: Routes = [
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
    { path: 'todo', component: TodoComponent },
    // { path: 'work', component: WorkListComponent },
    // { path: 'market', component: MarketListComponent },
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