import { IsString } from 'class-validator';

export class RegisterDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly password: string;
}