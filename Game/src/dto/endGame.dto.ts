import { IsString } from 'class-validator';

export class EndGameDto {
    @IsString()
    readonly prediction: string;
}