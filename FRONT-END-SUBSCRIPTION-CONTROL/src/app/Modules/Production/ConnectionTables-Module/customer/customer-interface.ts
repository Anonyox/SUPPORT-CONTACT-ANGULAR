export interface IPerson {
    id: string,
    typeOfPerson: string,
    cpFeCNPJ: string,
    rGeStateRegistration: string,
    registrationSituation: boolean,
    name: string,
    fantasyName: string,
    codIBGE: string,
    cep: string,
    address: string,
    district: string,
    number: string,
    complement: string,
    email: string,
    landline: string,
    cellPhone: string,
    cnae: string,
    birthDate: Date,
    insercionDate: Date,
    employeeB: boolean,
    customerB: boolean,
    city_Id: string,
}

export interface ICustomer {
    id: string,
    person_Id:string,
    requestSupportUsername:string
    requestSupportPassword:string,
    insercionDate:Date
}
