import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PinoLogger } from 'nestjs-pino';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MyWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly pinoLogger: PinoLogger) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.pinoLogger.info(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.pinoLogger.info(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    this.pinoLogger.info(data);
    // this.server.emit('messageServer', data);
    client.broadcast.emit('messageServer', data);
  }
}
