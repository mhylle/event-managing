module schema.group.controllers {
    import IUserService = schema.group.services.IGroupService;
    export interface IGroupListController {
        title: string;

        activate: () => void;
        groups: ()=> void;
    }
}
