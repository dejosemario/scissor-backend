pt
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ThrottlerModule } from '@nestjs/throttler';
import { UrlModule } from './url/url.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { QrcodeModule } from './qrcode/qrcode.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UrlModule, // Handles URL shortening logic
    AnalyticsModule, // Tracks and provides analytics
    QrcodeModule, // QR code generation
  ],
})
export class AppModule {}