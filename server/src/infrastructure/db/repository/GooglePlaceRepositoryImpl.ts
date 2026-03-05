import axios from 'axios';
import { PlaceDetails } from 'src/core/entities/GooglePlaceDetails/PlaceDetails';
import { IGooglePlaceRepository } from 'src/core/repository/GooglePlaceDetails/GooglePlace';

export class GooglePlaceRepositoryImpl implements IGooglePlaceRepository {
  async getDetails(google_place_id: string): Promise<PlaceDetails> {
    const url = process.env.GOOGLE_GETPLACE_DETAILS_URL || '';
    const apiKey = process.env.GOOGLE_API_KEY;
    const response = await axios.get(url, {
      params: {
        place_id: google_place_id,
        fields: [
          'name',
          'types',
          'url',
          'formatted_address',
          'formatted_phone_number',
          'opening_hours',
          'price_level',
          'rating',
          'website',
          'editorial_summary',
          'user_ratings_total',
        ].join(','),
        key: apiKey,
      },
    });

    console.log(response.data);

    const res = response.data.result;
    return new PlaceDetails(
      res.name ?? '',
      res.types ?? [],
      res.url ?? '',
      res.formatted_address ?? '',
      res.formatted_phone_number ?? '',
      res.opening_hours ?? {},
      res.price_level ?? 0,
      res.rating ?? 0,
      res.website ?? '',
      res.editorial_summary?.overview ?? '',
      res.user_ratings_total ?? 0,
    );
  }
}
