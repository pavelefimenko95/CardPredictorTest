import { IsString } from 'class-validator';

export class AuthenticateDto {
    @IsString()
    readonly token: string;
}