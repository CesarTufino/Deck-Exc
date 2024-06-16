import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Card, Message, Offer } from './entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CardsService } from './services/cards.service';
import { AppController } from './app.controller';
import { ChatService } from './services/chat.service';
import { ChatGateway } from './chat.gateway';
import { FilesService } from './services/files.service';
import { OffersService } from './services/offers.service';
import { SeedService } from './services/seed.service';

@Module({
  controllers: [AppController],
  providers: [
    AuthService,
    JwtStrategy,
    CardsService,
    ChatGateway,
    ChatService,
    FilesService,
    OffersService,
    OffersService,
    SeedService,
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // intercambiar start y prod en package-lock.json
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl:
          process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log('JWT Secret', configService.get('JWT_SECRET'));
        // console.log('JWT SECRET', process.env.JWT_SECRET);
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
    TypeOrmModule.forFeature([Card]),
    TypeOrmModule.forFeature([Message]),
    TypeOrmModule.forFeature([Offer]),
  ],
})
export class AppModule {}
