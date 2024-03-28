import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styles: []
})
export class GalleryComponent implements OnInit {
    @Input() images!: string[];
    @Input() image!: string;
    selectedImage: string | undefined;

    constructor() {}

    ngOnInit(): void {
        setTimeout(() => {
            if (this.hasImages) {
                this.selectedImage = this.images[0];
            } else {
                this.selectedImage = this.image;
            }
        }, 500);
    }
    changeSelectedImage(imageUrl: string) {
        this.selectedImage = imageUrl;
    }
    get hasImages() {
        return this.images?.length > 0;
    }
}
