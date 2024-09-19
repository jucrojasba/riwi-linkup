export interface ICompanyRegister{
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    phone: number,
    sector:string
}

export interface ICompanyLogin{
    email:string,
    password:string
}
