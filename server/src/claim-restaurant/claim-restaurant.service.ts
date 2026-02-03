import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Claim_request } from './claim-restaurant.model';
import { CreateRequestDto } from './dto/claim-restaurant.dto';

@Injectable()
export class ClaimRestaurantService {

    constructor(@InjectModel(Claim_request) private claimRequstModel: typeof Claim_request){}

    async createRequet (dto: CreateRequestDto) {
        const request = await this.claimRequstModel.create({...dto, status: 'pending'})
        return request
    }

    async getAllRequests () {
        const requests = await this.claimRequstModel.findAll()
        return requests
    }

}
