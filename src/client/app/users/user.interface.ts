module app.controllers {

    export interface IUser {
        // base data
        id: string;
        firstname: string;
        lastname: string;
        username: string;
        passstring:string;

        // additional data. Possibly put this into extra classes?
        address:string;
        mail:string;
        phone: string;
        logicalId:string
    }
}
