import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true }) // namespace: '/'
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  handleDisconnect(client: Socket) {
    //console.log('Cliente desconectado', client.id);
    this.chatService.removeClient(client.id);
    //console.log({ conectados: this.messagesWsService.getConnectedClients() });
    this.wss.emit('clients-updated', this.chatService.getConnectedClients());
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayLoad;
    try {
      payload = this.jwtService.verify(token);

      // console.log('Cliente conectado', client.id);
      await this.chatService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    // client.join('ventas');
    // client.join(client.id);
    // client.join(user.email);
    // this.wss.to('ventas').emit('');

    //console.log({ conectados: this.messagesWsService.getConnectedClients() });
    this.wss.emit('clients-updated', this.chatService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    //onMeggageFromClient
    //console.log(client.id, payload);
    //! Emite únicamente al cliente
    // client.emit('message-from-server', {
    //   fullName: 'Soy yo',
    //   message: payload.message || 'no-message!!',
    // });

    //! Emitir a todos Menos al cliente incial
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy yo',
    //   message: payload.message || 'no-message!!',
    // });

    //! Emitir a todos
    this.wss.emit('message-from-server', {
      fullName: this.chatService.getUserFullName(client.id),
      message: payload.message || 'no-message!!',
    });
  }
  /*
  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }*/
}
