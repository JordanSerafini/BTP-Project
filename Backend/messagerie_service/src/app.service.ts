// messagerie.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, Message } from './@types/interfaces';
import { Model } from 'mongoose';

@Injectable()
export class MessagerieService {
  constructor(
    @InjectModel('Group') private readonly groupModel: Model<Group>,
    @InjectModel('Message') private readonly messageModel: Model<Message>,
  ) {}

  async findAllGroups(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  async findGroupsByUser(email: string): Promise<Group[]> {
    return this.groupModel.find({ members: email }).exec();
  }

  async findOneGroup(id: string, email: string): Promise<Group> {
    const group = await this.groupModel
      .findOne({ _id: id, members: email })
      .exec();
    if (!group) throw new Error('Group not found or user not in group');
    return group;
  }

  async createGroup(payload: {
    type: string;
    name?: string;
    members: string[];
    createdBy: string;
  }): Promise<Group> {
    const group = new this.groupModel(payload);
    return group.save();
  }

  async updateGroup(
    id: string,
    data: { name?: string },
    email: string,
  ): Promise<Group> {
    const group = await this.groupModel
      .findOne({ _id: id, members: email })
      .exec();
    if (!group) throw new Error('Group not found or not authorized');
    if (data.name) group.name = data.name;
    return group.save();
  }

  async removeGroup(id: string, email: string): Promise<Group> {
    const group = await this.groupModel
      .findOneAndDelete({ _id: id, members: email })
      .exec();
    if (!group) throw new Error('Group not found or not authorized');
    return group;
  }

  async findAllMessages(email: string, groupId: string): Promise<Message[]> {
    const group = await this.groupModel
      .findOne({ _id: groupId, members: email })
      .exec();
    if (!group) throw new Error('Not authorized or group not found');
    return this.messageModel.find({ groupId }).exec();
  }

  async findOneMessage(email: string, id: string): Promise<Message> {
    const message = await this.messageModel.findById(id).exec();
    if (!message) throw new Error('Message not found');
    const group = await this.groupModel
      .findOne({ _id: message.groupId, members: email })
      .exec();
    if (!group) throw new Error('Not authorized to view this message');
    return message;
  }

  async createMessage(
    email: string,
    groupId: string,
    content: string,
  ): Promise<Message> {
    const group = await this.groupModel
      .findOne({ _id: groupId, members: email })
      .exec();
    if (!group) throw new Error('Not authorized or group not found');
    const message = new this.messageModel({ groupId, content, email });
    return message.save();
  }

  async updateMessage(
    email: string,
    id: string,
    content?: string,
  ): Promise<Message> {
    const message = await this.messageModel.findOne({ _id: id, email }).exec();
    if (!message) throw new Error('Message not found or not authorized');
    if (content) message.content = content;
    return message.save();
  }

  async removeMessage(email: string, id: string): Promise<Message> {
    const message = await this.messageModel
      .findOneAndDelete({ _id: id, email })
      .exec();
    if (!message) throw new Error('Message not found or not authorized');
    return message;
  }
}
