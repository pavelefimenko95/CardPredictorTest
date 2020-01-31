import { IsString, IsNumber } from 'class-validator';

export class HttpErrorDto {
    @IsString()
    readonly message: string;

    @IsNumber()
    readonly status: number;
}