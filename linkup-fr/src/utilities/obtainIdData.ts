import { IGender } from "@/UI/interfaces/GenderInterface";

export function obtainIdData(data:IGender[], valueSelect:string){
    const selectedGender = data.find((g:IGender)=>g.name === valueSelect);
    return selectedGender ? selectedGender.id :null;
}