export default function calculateAge(birthday:string):number{ // Función para obtener la edad a partir de la fecha 
    const birthDate = new Date(birthday);
    const currentYear = new Date().getFullYear();
    const birhYear = birthDate.getFullYear();
    return currentYear - birhYear;
}