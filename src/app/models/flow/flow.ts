import { IModule } from "../module/module";

export interface IFlow{
    name: string;
    userId:number;
    description: string;
    modules: IModule[];
    status: string;
    createdDate: Date;
    activatedDate: Date;
}