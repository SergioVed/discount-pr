import { UpdateRestaurantDto } from "src/core/repository/RestaurantRepository/dto/UpdateRestarauntDto"

export class Restaurant {
    constructor(
        readonly restaurantId: number,
        private _managerId: number | null,
        private readonly _googlePlaceId: string,
        private _name: string,
        private _types: string[],
        private _googlemapsLink: string,
        private _address: string,
        private _phoneNum: string,
        private _openingHours: JSON,
        private _priceLevel: number,
        private _rating: number,
        private _websiteLink: string,
        private _description: string,
        private _lastSynced: Date,
        private _userRatingsTotal: number
    ) {}

    get managerId(): number | null {
        return this._managerId
    }

    get googlePlaceId(): string {
        return this._googlePlaceId
    }

    get name(): string {
        return this._name
    }

    get types(): string[] {
        return this._types
    }

    get googlemapsLink(): string {
        return this._googlemapsLink
    }

    get address(): string {
        return this._address
    }

    get phoneNum(): string {
        return this._phoneNum
    }

    get openingHours(): JSON {
        return this._openingHours
    }

    get priceLevel(): number {
        return this._priceLevel
    }

    get rating(): number {
        return this._rating
    }

    get websiteLink(): string {
        return this._websiteLink
    }

    get description(): string {
        return this._description
    }

    get lastSynced(): Date {
        return this._lastSynced
    }

    get userRatingsTotal(): number {
        return this._userRatingsTotal
    }

    assignManager(managerId: number) {
        if (this._managerId !== null) {
            throw new Error("Restaurant already has a manager assigned")
        }
        this._managerId = managerId
    }

    updateLastSynced(date: Date) {
        this._lastSynced = date
    }

    updateInstance(data: UpdateRestaurantDto) {
        if (data.name !== undefined) this._name = data.name
        if (data.types !== undefined) this._types = data.types
        if (data.googlemapsLink !== undefined) this._googlemapsLink = data.googlemapsLink
        if (data.address !== undefined) this._address = data.address
        if (data.phoneNum !== undefined) this._phoneNum = data.phoneNum
        if (data.openingHours !== undefined) this._openingHours = data.openingHours
        if (data.priceLevel !== undefined) this._priceLevel = data.priceLevel
        if (data.rating !== undefined) this._rating = data.rating
        if (data.websiteLink !== undefined) this._websiteLink = data.websiteLink
        if (data.description !== undefined) this._description = data.description
        if (data.userRatingsTotal !== undefined) this._userRatingsTotal = data.userRatingsTotal
    }
}