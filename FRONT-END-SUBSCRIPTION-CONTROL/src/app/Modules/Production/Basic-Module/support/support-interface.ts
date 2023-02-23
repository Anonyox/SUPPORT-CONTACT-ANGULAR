export interface ISupport {
    id: string,
    title: string,
    requestBy: string,
    customer_Id:string,
    systemPackage_Id:string,
    description:string,
    status:string,
    contacts:string,
    callEndDate:Date,
    insercionDate: Date
}

export interface ISupportCalled {
    id: string,
    employee_Id: string,
    support_Id:string,
    insercionDate:Date
}

export interface ISupportCalledMessages {
    id: string,
    supportCalled_Id: string,
    emitName: string,
    description: string,
    typeEmit: string,
    insercionDate: Date
}

export interface ISupportEndCalled {
    
    id: string,
    endSupportCalledDescription: string,
    totalServiceTime: string,
    support_Id: string,
    employee_Id: string,
    insercionDate: Date
}
