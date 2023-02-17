import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [AuthorsModule],
  controllers: [AppController, BooksController,BooksController],
  providers: [AppService],
})
export class AppModule {}
