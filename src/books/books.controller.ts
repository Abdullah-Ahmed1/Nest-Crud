import { Controller,Get,Post,Delete,Put,Body } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type bookType = {
    id:number,
    title:string,
    author:string,
    date:Date,
}
var books :bookType[] = [
    {
        id:1,
        title: "nodejs",
        author:"abdullah",
         date: new Date()
    },
    {
        id:2,
        title: "expressjs",
        author:"abdullah",
        date: new Date()
    },
    {
        id:3,
        title: "reactjs",
        author:"abdullah",
        date: new Date()
    },

]




@Controller('books')
export class BooksController {

    

    @Get()
    showBooks ():object{
        return books
    } 
    @Post("/store")
    async addBook (@Body() body){
        await prisma.$connect()
        // books.push(body)
        // return books
        const book = await prisma.book.create({
            data: body
        })
        return book
    }
    @Delete("/delete/:id")
    async deleteBook(@Param() param){
        
        await prisma.book.delete({
           where:{
            id : param.id
           }      
        })

        // const id:number = parseInt(param.id)
        // const results : bookType[] =  books.filter(item=>{
        //     return item.id  !== id
        // })

        // books = results
        // return books 
    } 
    @Put("/update/:id")
    updateBook(@Param() param,@Body() body){
        const id:number = parseInt(param.id)
        const results : bookType[] =  books.filter(item=>{
            return item.id  !== id
        })
        books = results
        books.push(body)
    }
}
