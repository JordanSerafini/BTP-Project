import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from './@types/user.interface';
import { GroupDocument } from './@types/group.interface';
import { MessageDocument } from './@types/message.interface';

@Injectable()
export class MessagerieService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Group') private readonly groupModel: Model<GroupDocument>,
    @InjectModel('Message')
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async findAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async getUserIdByEmail(email: string): Promise<object> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User not found for email: ${email}`);
    }
    return user;
  }

  async findAllGroups(): Promise<GroupDocument[]> {
    return this.groupModel.find().exec();
  }

  async findGroupsByUser(email: string): Promise<GroupDocument[]> {
    const response = await this.getUserIdByEmail(email);
    const userId = new Types.ObjectId(response['_id']);
    console.log(`Converted ObjectId: ${userId}`, typeof userId);
    return this.groupModel.find({ 'members.user_id': userId }).exec();
  }

  async findOneGroup(id: string, email: string): Promise<GroupDocument> {
    if (!Types.ObjectId.isValid(id)) throw new Error(`Invalid ObjectId: ${id}`);
    const userId = await this.getUserIdByEmail(email);
    const group = await this.groupModel
      .findOne({ _id: id, 'members.userId': userId })
      .exec();
    if (!group) throw new Error('Group not found or user not in group');
    return group;
  }

  async createGroup(payload: {
    type: string;
    name?: string;
    members: string[];
    createdBy: string;
  }): Promise<GroupDocument> {
    const creatorId = await this.getUserIdByEmail(payload.createdBy);
    const membersIds = await Promise.all(
      payload.members.map((m) => this.getUserIdByEmail(m)),
    );
    const members = membersIds.map((userId) => ({
      userId,
      joinedAt: new Date(),
    }));

    const group = new this.groupModel({
      type: payload.type,
      name: payload.name || null,
      members: members,
      createdBy: creatorId,
    });

    return group.save();
  }

  async updateGroup(
    id: string,
    data: { name?: string },
    email: string,
  ): Promise<GroupDocument> {
    if (!Types.ObjectId.isValid(id)) throw new Error(`Invalid ObjectId: ${id}`);
    const userId = await this.getUserIdByEmail(email);
    const group = await this.groupModel
      .findOne({ _id: id, 'members.userId': userId })
      .exec();
    if (!group) throw new Error('Group not found or not authorized');
    if (data.name !== undefined) group.name = data.name;
    return group.save();
  }

  async removeGroup(id: string, email: string): Promise<GroupDocument> {
    if (!Types.ObjectId.isValid(id)) throw new Error(`Invalid ObjectId: ${id}`);
    const userId = await this.getUserIdByEmail(email);
    const group = await this.groupModel
      .findOneAndDelete({ _id: id, 'members.userId': userId })
      .exec();
    if (!group) throw new Error('Group not found or not authorized');
    return group;
  }

  async findAllMessages(
    email: string,
    groupId: string,
  ): Promise<MessageDocument[]> {
    if (!Types.ObjectId.isValid(groupId))
      throw new Error(`Invalid ObjectId: ${groupId}`);
    const userId = await this.getUserIdByEmail(email);
    const group = await this.groupModel
      .findOne({ _id: groupId, 'members.userId': userId })
      .exec();
    if (!group) throw new Error('Not authorized or group not found');
    return this.messageModel.find({ groupId: group._id }).exec();
  }

  async findAllMessagesByUser(email: string): Promise<MessageDocument[]> {
    const response = await this.getUserIdByEmail(email);
    const objectId = response['_id'];
    const messages = await this.messageModel
      .find({ senderId: objectId })
      .exec();

    console.log(`Messages found: ${messages.length}`);
    return messages;
  }

  async findOneMessage(email: string, id: string): Promise<MessageDocument> {
    if (!Types.ObjectId.isValid(id)) throw new Error(`Invalid ObjectId: ${id}`);
    const userId = await this.getUserIdByEmail(email);
    const message = await this.messageModel.findById(id).exec();
    if (!message) throw new Error('Message not found');

    const group = await this.groupModel
      .findOne({ _id: message.groupId, 'members.userId': userId })
      .exec();
    if (!group) throw new Error('Not authorized to view this message');
    return message;
  }

  async createMessage(
    email: string,
    groupId: string,
    content: string,
  ): Promise<MessageDocument> {
    if (!Types.ObjectId.isValid(groupId))
      throw new Error(`Invalid ObjectId: ${groupId}`);
    const userId = await this.getUserIdByEmail(email);
    const group = await this.groupModel
      .findOne({ _id: groupId, 'members.userId': userId })
      .exec();
    if (!group) throw new Error('Not authorized or group not found');

    const message = new this.messageModel({
      groupId: group._id,
      senderId: userId,
      content,
    });
    return message.save();
  }

  async updateMessage(
    email: string,
    id: string,
    content?: string,
  ): Promise<MessageDocument> {
    if (!Types.ObjectId.isValid(id)) throw new Error(`Invalid ObjectId: ${id}`);
    const userId = await this.getUserIdByEmail(email);
    const message = await this.messageModel
      .findOne({ _id: id, senderId: userId })
      .exec();
    if (!message) throw new Error('Message not found or not authorized');

    if (content !== undefined) message.content = content;
    return message.save();
  }

  async removeMessage(email: string, id: string): Promise<MessageDocument> {
    if (!Types.ObjectId.isValid(id)) throw new Error(`Invalid ObjectId: ${id}`);
    const userId = await this.getUserIdByEmail(email);
    const message = await this.messageModel
      .findOneAndDelete({ _id: id, senderId: userId })
      .exec();
    if (!message) throw new Error('Message not found or not authorized');
    return message;
  }
}
