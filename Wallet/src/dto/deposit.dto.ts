import { IsString, IsNumber } from 'class-validator';

export class DepositDto {
    @IsNumber()
    readonly amount: number;

    @IsString()
    readonly username: string;

    @IsString()
    readonly secret: string;
}