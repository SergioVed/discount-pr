import { InvalidSpecialOfferDateRangeError } from "src/core/errors/cases/domain/specialOffer/InvalidSpecialOfferDateRangeError";
import { CreateSpecialOfferInput } from "./types";

export class SpecialOffer {
  constructor(
    readonly specialOfferId: number | null,
    readonly createdBy: number,
    readonly restaurantId: number,
    readonly title: string,
    readonly description: string,
    readonly isActive: boolean,
    readonly activeFrom: Date,
    readonly activeTo: Date,
  ) {}

  static create (input: CreateSpecialOfferInput) {
    const activeFrom = input.activeFrom ?? new Date()
    if (input.activeTo < activeFrom) {
      throw new InvalidSpecialOfferDateRangeError(input.activeTo, activeFrom);
    }

    return new SpecialOffer (
      null,
      input.createdBy,
      input.restaurantId,
      input.title,
      input.description,
      input.isActive ?? false,
      activeFrom,
      input.activeTo,
    )
  }
}
