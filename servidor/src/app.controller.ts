import {
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CardsService } from './services/cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { User } from './entities';
import { FilesService } from './services/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Controller, Get } from '@nestjs/common';
import { SeedService } from './services/seed.service';
import { OffersService } from './services/offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Auth, GetUser } from './decorators';
import { ValidRoles } from './interfaces';

@Controller('')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly cardsService: CardsService,
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
    private readonly offersService: OffersService,
    private readonly seedService: SeedService,
  ) {}

  @Get('auth/users')
  findAllUser() {
    return this.authService.findAll();
  }

  @Post('auth/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('auth/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('auth/reset')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get('auth/question/:email')
  getQuestion(@Param('email') email: string) {
    return this.authService.getQuestion(email);
  }

  @Post('cards/')
  @Auth(ValidRoles.admin)
  createCard(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get('cards/')
  @Auth()
  findAllCard() {
    return this.cardsService.findAll();
  }

  @Get('cards/:term')
  @Auth()
  findOneCard(@Param('term') term: string) {
    return this.cardsService.findOne(term);
  }

  @Patch('cards/:id')
  @Auth(ValidRoles.admin)
  updateCard(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete('cards/:id')
  @Auth(ValidRoles.admin)
  removeCard(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.remove(id);
  }

  @Get('files/card/:imageName')
  findImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticCardImage(imageName);
    res.sendFile(path);
  }

  @Post('files/card')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/cards',
        filename: fileNamer,
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is a image');
    }
    const secureUrl = `${this.configService.get('HOST_API')}/files/cards/${file.filename}`;
    return { secureUrl };
  }

  @Post('offers')
  @Auth()
  createOffer(@Body() createOfferDto: CreateOfferDto, @GetUser() user: User) {
    return this.offersService.create(createOfferDto, user);
  }

  @Get('offers')
  @Auth()
  findAllOffer() {
    return this.offersService.findAll();
  }

  @Get('offers/user')
  @Auth()
  findOneOfferByUser(@GetUser() user: User) {
    return this.offersService.findOneByUser(user);
  }

  @Get('offers/:term')
  @Auth()
  findOneOffer(@Param('term') term: string) {
    return this.offersService.findOne(term);
  }

  @Patch('offers/:id')
  @Auth()
  updateOffer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offersService.update(id, updateOfferDto);
  }

  @Delete('offers/:id')
  @Auth()
  removeOffer(@Param('id', ParseUUIDPipe) id: string) {
    return this.offersService.remove(id);
  }

  @Get('seed')
  executedSeed() {
    return this.seedService.runSeed();
  }
}
