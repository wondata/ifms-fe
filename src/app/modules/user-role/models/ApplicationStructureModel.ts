export interface ApplicationStructureModel {
    Name: string;
    Code?: string;
    Description?:string;
    Children? : ApplicationStructureModel[]
}

export interface ApplicationStructureNodeModel {
    expandable: boolean;
    name: string;
    code: string;
    description:string;
    level: number;
}