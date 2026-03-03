import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRequestDto } from 'src/core/repository/ClaimRestaurantRequest/dto/CreateRequestDto';
import { ClaimRequestService } from 'src/core/services/ClaimRequestService/ClaimRequestService';

@Controller('requests')
export class ClaimRequestController {

    constructor(
        private claimRequestService: ClaimRequestService
    ){}

    @Post()
    async createRequest (@Body() dto: CreateRequestDto) {
        const restaurant = await this.claimRequestService.createRequest(dto)
        return restaurant
    }

    @Get()
    async getAllRequests () {
        const restaurants = await this.claimRequestService.getAllRequests()
        return restaurants
    }

    @Put('/:id')
    async acceptRequest (
        @Param("id") id: number,
        @Body() body: {status: 'ACCEPTED' | 'DECLINED'}
    ) {
        const request = await this.claimRequestService.updateRequest(id, body.status)
        return request
    }
}
