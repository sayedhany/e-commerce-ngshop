import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
    categories: any[] = [
        {
            // _id: '5f9d7e938680aa1d979d7e19',
            name: 'Games',
            color: '#ffb8b8',
            icon: 'sun',
            id: 1
        },
        {
            // _id: '5f15d54cf3a046427a1c26e3',
            name: 'Computers',
            color: '#E1F0E7',
            icon: 'desktop',
            id: 2
        },
        {
            // _id: '5f15d467f3a046427a1c26e1',
            name: 'New Mobile new',
            color: 'Blue',
            icon: 'icon5',
            id: 3
        },
        {
            // _id: '608fe08365074604f45ce544',
            name: 'Cameras',
            icon: 'camera',
            color: '#ede4da',
            id: 4
        },
        {
            // _id: '5f15d545f3a046427a1c26e2',
            name: 'Beauty',
            color: '#F0E8DE',
            icon: 'palette',
            id: 5
        },
        {
            // _id: '5f15d5b2cb4a6642bddc0fe7',
            name: 'House',
            color: '#E2E1F0',
            icon: 'home',
            id: 6
        }
    ];

    constructor() {}

    ngOnInit(): void {}
}
