export interface IGender{
    id:number,
    name:string,
    label: string,
    checked:boolean
}

export interface IGenders{
    genders:IGender[]
}