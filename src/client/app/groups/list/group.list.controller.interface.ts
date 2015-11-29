module app.controllers {
    import IUserService = app.services.IGroupService;
    export interface IGroupListController {
        title: string;

        activate: () => void;
        groups: ()=> void;
    }
}
