import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Request,
  BadRequestException,
  HttpException,
  HttpStatus,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CustomLogger } from '../logging/custom-logger.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';

interface CreateGroupDto {
  name?: string;
  type: 'group' | 'direct';
  members: string[];
}

interface UpdateGroupDto {
  name?: string;
}

interface CreateMessageDto {
  groupId: string;
  content: string;
}

interface UpdateMessageDto {
  content?: string;
}

@Controller('messages')
export class MessagerieController {
  private readonly logger = new CustomLogger('MessagerieController');

  constructor(
    @Inject('MESSAGERIE_SERVICE')
    private readonly messageClient: ClientProxy,
  ) {}

  @Get('health')
  healthCheck() {
    return { status: 200 };
  }

  // GROUPS
  @Get('groups')
  async findAllGroups(@Request() req) {
    const email = req.user?.email;
    if (!email) {
      throw new BadRequestException('Email is required in the request');
    }
    this.logger.log(`Fetching all groups for user: ${email}`);
    try {
      return await this.messageClient
        .send('groups.find_by_user', { email })
        .toPromise();
    } catch (error) {
      console.error('Failed to fetch groups:', error);
      throw new HttpException(
        'Failed to fetch groups',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('groups/all')
  async findAllGroupsPublic() {
    this.logger.log(`Fetching all groups`);
    try {
      return await this.messageClient.send('groups.find_all', {}).toPromise();
    } catch (error) {
      console.error('Failed to fetch all groups:', error);
      throw new HttpException(
        'Failed to fetch all groups',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('groups/:id')
  async findOneGroup(@Param('id') id: string, @Request() req) {
    const email = req.user?.email;
    this.logger.log(`Fetching group ${id} for user ${email}`);
    try {
      return await this.messageClient
        .send('groups.find_one', { id, email })
        .toPromise();
    } catch (error) {
      console.error('Failed to fetch group:', error);
      throw new HttpException(
        'Failed to fetch group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('groups')
  async createGroup(@Body() createGroupDto: CreateGroupDto, @Request() req) {
    const email = req.user?.email;
    this.logger.log(`Creating group by ${email}`);
    try {
      return await this.messageClient
        .send('groups.create', { ...createGroupDto, createdBy: email })
        .toPromise();
    } catch (error) {
      console.error('Failed to create group:', error);
      throw new HttpException('Failed to create group', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('groups/:id')
  async updateGroup(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @Request() req,
  ) {
    const email = req.user?.email;
    this.logger.log(`Updating group ${id} by ${email}`);
    try {
      return await this.messageClient
        .send('groups.update', { id, ...updateGroupDto, email })
        .toPromise();
    } catch (error) {
      console.error('Failed to update group:', error);
      throw new HttpException('Failed to update group', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('groups/:id')
  async removeGroup(@Param('id') id: string, @Request() req) {
    const email = req.user?.email;
    this.logger.log(`Deleting group ${id} by ${email}`);
    try {
      return await this.messageClient
        .send('groups.remove', { id, email })
        .toPromise();
    } catch (error) {
      console.error('Failed to delete group:', error);
      throw new HttpException('Failed to delete group', HttpStatus.BAD_REQUEST);
    }
  }

  // MESSAGES
  @Get()
  async findAllMessages(@Request() req, @Query('groupId') groupId: string) {
    const email = req.user?.email;
    if (!email || !groupId) {
      throw new BadRequestException('Email and groupId are required');
    }
    this.logger.log(`Fetching all messages in group ${groupId} for ${email}`);
    try {
      return await this.messageClient
        .send('messages.find_all', { email, groupId })
        .toPromise();
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw new HttpException(
        'Failed to fetch messages',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('perso')
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    const email = req.user?.email;
    if (!email) {
      throw new BadRequestException('Email are required');
    }
    this.logger.log(`Fetching all messages in for ${email}`);
    try {
      return await this.messageClient
        .send('messages.user.find_all', { email })
        .toPromise();
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw new HttpException(
        'Failed to fetch messages',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOneMessage(@Param('id') id: string, @Request() req) {
    const email = req.user?.email;
    this.logger.log(`Fetching message ${id} for ${email}`);
    try {
      return await this.messageClient
        .send('messages.find_one', { email, id })
        .toPromise();
    } catch (error) {
      console.error('Failed to fetch message:', error);
      throw new HttpException(
        'Failed to fetch message',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Request() req,
  ) {
    const email = req.user?.email;
    this.logger.log(
      `Creating message in group ${createMessageDto.groupId} by ${email}`,
    );
    try {
      return await this.messageClient
        .send('messages.create', { ...createMessageDto, email })
        .toPromise();
    } catch (error) {
      console.error('Failed to create message:', error);
      throw new HttpException(
        'Failed to create message',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @Request() req,
  ) {
    const email = req.user?.email;
    this.logger.log(`Updating message ${id} by ${email}`);
    try {
      return await this.messageClient
        .send('messages.update', { id, ...updateMessageDto, email })
        .toPromise();
    } catch (error) {
      console.error('Failed to update message:', error);
      throw new HttpException(
        'Failed to update message',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async removeMessage(@Param('id') id: string, @Request() req) {
    const email = req.user?.email;
    this.logger.log(`Deleting message ${id} by ${email}`);
    try {
      return await this.messageClient
        .send('messages.remove', { id, email })
        .toPromise();
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw new HttpException(
        'Failed to delete message',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
