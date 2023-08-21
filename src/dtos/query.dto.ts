import { Transform } from "class-transformer";
import { IsNumberString, IsOptional, Min } from "class-validator";

export class QueryDto {
    @Min(1)
    @IsNumberString()
    @Transform((value)=> Number(value.value))
    @IsOptional()
    page: string;
}