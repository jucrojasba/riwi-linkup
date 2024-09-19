export interface IGender{
    id:number,
    name:string,
    label: string,
    checked:string
}

export interface IGenders{
    genders:IGender[]
}