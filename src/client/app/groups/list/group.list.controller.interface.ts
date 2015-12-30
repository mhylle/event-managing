module eventmanaging.group.controllers {
    export interface IGroupListController {
        title: string;

        activate: () => void;
        groups: ()=> void;
    }
}
