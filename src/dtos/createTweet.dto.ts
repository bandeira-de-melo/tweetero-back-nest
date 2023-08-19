import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateTweetDto {
    @IsNotEmpty({message: "All fields are required!"})
    @IsString()
    @MinLength(3)
    username: string;

    @IsNotEmpty({message: "All fields are required!"})
    @IsString()
    @MinLength(2)
    tweet: string;
}