import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "todo-list",
        loadComponent: () => import("./components/control-flow/control-flow.component"),
    },
    {
        path: "todo-edit",
        loadComponent: () => import("./components/edit-todo/edit-todo.component"),
    },
    {
        path: "reactive-todo-list",
        loadComponent: () => import("./components/reactive-Observable/control-flow/reactive-control-flow.component"),
    },
    {
        path: "reactive-todo-edit",
        loadComponent: () => import("./components/reactive-Observable/edit-todo/reactive-edit-todo.component"),
    }
];
