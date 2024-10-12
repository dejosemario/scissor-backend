import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { RedisModule } from '@nestjs-modules/ioredis';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidationSchema } from './config.schema';
// import { ThrottlerModule } from '@nestjs/throttler';
// import { UrlModule } from './url/url.module';
// import { AnalyticsModule } from './analytics/analytics.module';
// import { QrcodeModule } from './qrcode/qrcode.module';
import { LinksModule } from './links/links.module';
import { Link } from './links/link.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`stage.${process.env.STAGE}.env`],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [Link],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    UsersModule,
    LinksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
