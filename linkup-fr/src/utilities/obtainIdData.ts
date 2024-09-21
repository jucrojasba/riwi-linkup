import { IGender } from "@/UI/interfaces/GenderInterface";
import { ISector } from "@/UI/interfaces/ISectorInterface";

export function obtainIdData(data: IGender[], valueSelect: string) {
  const selectedGender = data.find((g: IGender) => g.name === valueSelect);
  return selectedGender ? selectedGender.id : 0;
}


export function obtainIdSectors(data: ISector[], valueSelect: string) {
    const selectedSector = data.find((g: ISector) => g.name === valueSelect);
    return selectedSector ? selectedSector.id : 0;
  }
  