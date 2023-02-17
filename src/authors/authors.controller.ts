import { Controller, Get } from '@nestjs/common';
import { AuthorsService } from './authors.service';
@Controller('authors')
export class AuthorsController {
    constructor(private readonly authorService: AuthorsService){}

    @Get()

    tempMethod(){
        return this.authorService.getHello();
    }
}
