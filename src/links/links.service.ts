import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly linksRepository: Repository<Link>,
  ) {}

  async getAllLinks(): Promise<Array<Link>> {
    return await this.linksRepository.find({});
  }

  async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
    const { name, url } = createLinkDto;
    return await this.linksRepository.create({ name, url });
  }

  async getLink(name: string): Promise<Link | null> {
    try {
      return await this.linksRepository.findOne({ where: { name } });
    } catch (error) {
      console.error('Error retrieving link:', error);
      throw new Error('Failed to retrieve link');
    }
  }
}
