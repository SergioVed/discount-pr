export class CreateInvitePersistenceDto {
  emailTo: string;
  token: string;
  expiresAt: Date;
  createdBy: number;
}
