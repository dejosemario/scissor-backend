import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksRepository } from './links.repository';
import { Link } from './link.entity';
import { LinksController } from './links.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinksService, LinksRepository],
  controllers: [LinksController],
})
export class LinksModule {}
