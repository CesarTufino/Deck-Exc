import * as bcrypt from 'bcrypt';

interface SeedUser {
  email: string;
  name: string;
  password: string;
  roles: string[];
  question: Question;
  answer: string;
}

enum Question {
  COMIDA = 'comida',
  CANTANTE = 'cantante',
  PAIS = 'pais',
}

interface SeedCard {
  name: string;
  imageUrl: string;
}

interface SeedOffer {
  cardId: string;
  description: string;
  condition: OfferCondition;
  price: number;
}

enum OfferCondition {
  EXCELENTE = 'Excelente',
  USADO = 'Usado',
  NUEVO = 'Nuevo',
}

interface SeedData {
  cards: SeedCard[];
  users: SeedUser[];
  offers: SeedOffer[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test1@google.com',
      name: 'Test One',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user'],
      question: Question.PAIS,
      answer: bcrypt.hashSync('Argentina', 10),
    },
    {
      email: 'test2@google.com',
      name: 'Test Two',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user', 'admin'],
      question: Question.PAIS,
      answer: bcrypt.hashSync('Argentina', 10),
    },
  ],
  cards: [
    {
      name: 'Charizard',
      imageUrl: 'charizard.png',
    },
    {
      name: 'Mago Oscuro',
      imageUrl: 'mago_oscuro.png',
    },
    {
      name: 'Black Lotus',
      imageUrl: 'black_lotus.png',
    },
  ],
  offers: [
    {
      cardId: '',
      description: 'Vendo carta',
      condition: OfferCondition.EXCELENTE,
      price: 1,
    },
    {
      cardId: '',
      description: 'Vendo carta',
      condition: OfferCondition.NUEVO,
      price: 99.99,
    },
  ],
};
