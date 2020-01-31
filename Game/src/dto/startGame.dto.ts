import { IsNumber } from 'class-validator';

export class StartGameDto {
    @IsNumber()
    readonly betAmount: number;
}