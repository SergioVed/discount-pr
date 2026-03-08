export type CreateSpecialOfferInput = {
    createdBy: number,
    restaurantId: number;
    title: string;
    description: string;
    isActive?: boolean;
    activeFrom?: Date;
    activeTo: Date;
}