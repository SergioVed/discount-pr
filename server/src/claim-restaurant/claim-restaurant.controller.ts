import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClaimRestaurantService } from './claim-restaurant.service';
import { CreateRequestDto } from './dto/claim-restaurant.dto';

@Controller('claim-restaurant')
export class ClaimRestaurantController {

    constructor(private claimRestaurantService: ClaimRestaurantService){}

    @Post()
    async createRequest (@Body() dto: CreateRequestDto) {
        return await this.claimRestaurantService.createRequet(dto)
    }

    @Get()
    async getAllRequests () {
        return await this.claimRestaurantService.getAllRequests()
    }
}
