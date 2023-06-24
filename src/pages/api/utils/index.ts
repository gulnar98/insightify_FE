export class CustomErrorForHttp extends Error {
    constructor(message,private status){
        super(message);
    }
}