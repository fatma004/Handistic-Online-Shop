import { city } from "./city";

export class shop {
    constructor(
        public rquestId:string,
        public shopName:string,
        public cities:city[],
    ){}
}

export class shops {
    constructor(
        public shopId:string,
        public rquestId:string,
        public shopName:string,
        public cities:city[],
    ){}
}