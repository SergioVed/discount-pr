import { IsIn } from "class-validator";

export class UpdateClaimRequestDto {
    @IsIn(['ACCEPTED', 'DECLINED'])
    status: 'ACCEPTED' | 'DECLINED'
}