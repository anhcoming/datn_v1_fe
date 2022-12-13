export class Discount {
    id!: string;
    code!: string;
    des!:string;
    status!:string;
    
    type!: string;
    typeValue!: string;
    applyType!: string;
    applyTypeIds!: string;
    isApplyAcross!: string;
    prerequisiteType!: string;
    prerequisiteTypeValue!: string;
    customerType!: string;
    customerIds!: string;
    usageLimit!: string;
    oncePerCustomer!: string;
    startDate!: string;
    hasEndDate!: string;
    endDate!: string;
    discountTypeId!: string;
    isPublic!: string;
}