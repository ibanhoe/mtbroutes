export class Checkpoint {
    id: number;
    name: string;
    lat: number;
    lng: number;
    comment: string;


    constructor(id: number, name: string, lat: number, lng: number, comment: string) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.comment = comment;
    }

}