export interface ICompanyRegister{
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    sector:string
}

export interface ICompanyLogin{
    email:string,
    password:string
}
