import { Controller,Get,Post,Delete,Put,Body } from '@nestjs/common';
import { Param ,Res} from '@nestjs/common/decorators';
import { PrismaClient } from '@prisma/client';
import { resolve4 } from 'dns/promises';

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
        return prisma.book.findMany()   
    }
    
    @Get("/:id")
    showBookById(@Param() param){
        return prisma.book.findUnique({
            where:{
                id:param.id
            }
        })
    }


    @Post("/store")
    async addBook (@Body() body:any,@Res() res){
        await prisma.$connect()
        // books.push(body)
        // return books
        
        const book = await prisma.book.create({
            data: body
        })
        res.send({msg : "book created" , book : book})
    }


    @Delete("/delete/:id")
    async deleteBook(@Param() param,@Res() res){
        
        await prisma.book.delete({
           where:{
            id : param.id
           }      
        })
        .then(book=>{
            res.send({msg : "book deleted" , book : book})
        })
        
    } 

    
    @Put("/update/:id")
    async updateBook(@Param() param,@Body() body,@Res() res){
        await prisma.book.update({
            where:{
                id: param.id
            },
            data:{
                title : body.title,
                author: body.title,
                date: body.date
            }
        })
        .then(book=>{
            res.send({msg : "book updated" , book : book})
        })
    }
}
