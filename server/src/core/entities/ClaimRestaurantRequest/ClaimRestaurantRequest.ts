
export class ClaimRequest {
    constructor(
        private _claimRequestId: number,
        private _userId: number,
        private _restaurantId: number,
        private _status: string
    ){}

    get claimRequestId () {
        return this._claimRequestId
    }

    get userId () {
        return this._userId
    }

    get restaurantId () {
        return this._restaurantId
    }

    get status () {
        return this._status
    }

    accept () {
        this._status = "ACCEPTED"
    }

    decline () {
        this._status = "DECLINED"
    }

}