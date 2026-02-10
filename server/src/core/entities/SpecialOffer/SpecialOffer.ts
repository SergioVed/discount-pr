

export class SpecialOffer {
    constructor (
        readonly specialOfferId: number,
        readonly createdBy: number,
        readonly restaurantId: number,
        readonly title: string,
        readonly description: string,
        readonly isActive: boolean,
        readonly activeFrom: Date,
        readonly activeTo: Date
    ) {}
}