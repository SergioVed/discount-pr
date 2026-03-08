export type CreateSpecialOfferInput = {
    restaurantId: number;
    title: string;
    description: string;
    isActive?: boolean;
    activeFrom?: Date;
    activeTo: Date;
}