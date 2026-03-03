import { PlaceDetails } from "src/core/entities/GooglePlaceDetails/PlaceDetails";


export interface IGooglePlaceRepository { 

    getDetails(google_place_id: string): Promise<PlaceDetails>
}