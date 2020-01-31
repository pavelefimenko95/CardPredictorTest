import { IsString, IsNumber } from 'class-validator';

export class WithdrawDto {
    @IsNumber()
    readonly amount: number;

    @IsString()
    readonly username: string;

    @IsString()
    readonly hash: string;
}