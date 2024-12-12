// messages.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagerieService } from './app.service';
import { Group } from './@types/group.interface';
import { Message } from './@types/message.interface';

@Controller()
export class MessagesController {
  constructor(private readonly service: MessagerieService) {}

  @MessagePattern('groups.find_all')
  async findAllGroups(): Promise<Group[]> {
    return this.service.findAllGroups();
  }

  @MessagePattern('groups.find_by_user')
  async findGroupsByUser(
    @Payload() payload: { email: string },
  ): Promise<Group[]> {
    //console.log('\n \n \n  findGroupsByUser', payload, '\n \n \n \n \n \n ');
    return this.service.findGroupsByUser(payload.email);
  }

  @MessagePattern('groups.find_one')
  async findOneGroup(
    @Payload() payload: { id: string; email: string },
  ): Promise<Group> {
    return this.service.findOneGroup(payload.id, payload.email);
  }

  @MessagePattern('groups.create')
  async createGroup(
    @Payload()
    payload: {
      type: string;
      name?: string;
      members: string[];
      createdBy: string;
    },
  ): Promise<Group> {
    return this.service.createGroup(payload);
  }

  @MessagePattern('groups.update')
  async updateGroup(
    @Payload() payload: { id: string; name?: string; email: string },
  ): Promise<Group> {
    return this.service.updateGroup(
      payload.id,
      { name: payload.name },
      payload.email,
    );
  }

  @MessagePattern('groups.remove')
  async removeGroup(
    @Payload() payload: { id: string; email: string },
  ): Promise<Group> {
    return this.service.removeGroup(payload.id, payload.email);
  }

  @MessagePattern('messages.find_all')
  async findAllMessages(
    @Payload() payload: { email: string; groupId: string },
  ): Promise<Message[]> {
    return this.service.findAllMessages(payload.email, payload.groupId);
  }

  @MessagePattern('messages.user.find_all')
  async findAllMessagesByUser(
    @Payload() payload: { email: string },
  ): Promise<Message[]> {
    return this.service.findAllMessagesByUser(payload.email);
  }

  @MessagePattern('messages.find_one')
  async findOneMessage(
    @Payload() payload: { email: string; id: string },
  ): Promise<Message> {
    return this.service.findOneMessage(payload.email, payload.id);
  }

  @MessagePattern('messages.create')
  async createMessage(
    @Payload() payload: { email: string; groupId: string; content: string },
  ): Promise<Message> {
    return this.service.createMessage(
      payload.email,
      payload.groupId,
      payload.content,
    );
  }

  @MessagePattern('messages.update')
  async updateMessage(
    @Payload() payload: { email: string; id: string; content?: string },
  ): Promise<Message> {
    return this.service.updateMessage(
      payload.email,
      payload.id,
      payload.content,
    );
  }

  @MessagePattern('messages.remove')
  async removeMessage(
    @Payload() payload: { email: string; id: string },
  ): Promise<Message> {
    return this.service.removeMessage(payload.email, payload.id);
  }
}
