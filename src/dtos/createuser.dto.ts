import { IsNotEmpty, IsString, IsUrl, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: "All fields are required!"})
    @IsString()
    @MinLength(3)
    username: string;

    @IsNotEmpty({message: "All fields are required!"})
    @IsString()
    @IsUrl()
    avatar: string;
}