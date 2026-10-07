import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway.js';

@Module({
  providers: [EventsGateway],
  exports: [EventsGateway], // Rend le Gateway accessible aux modules qui l'importent
})
export class EventsModule {}
