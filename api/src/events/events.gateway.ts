import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Autorise ton front-end à se connecter
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server; // L'instance qui permet de diffuser à tout le monde

  handleConnection(client: Socket) {
    console.log(`📡 Nouveau client connecté : ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔌 Client déconnecté : ${client.id}`);
  }

  // Méthode prête à être utilisée par tes autres modules
  emitNewAnswer(answer: any) {
    this.server.emit('newAnswer', answer);
  }
}
