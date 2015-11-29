module app.controllers {
    import IGroupService = app.services.IGroupService;
    export interface IGroupCreateController {
        title: string;

        activate: () => void;

        create: () => boolean;
    }
}
