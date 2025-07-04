import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashed } from 'src/utils/password-utils';
import { ErrorsMap } from '../constants/mongoose';

interface MongoError {
  code: number;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userCreationParams = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: await hashed(createUserDto.password),
    };
    let createdUser;
    try {
      createdUser = await new this.userModel(userCreationParams).save();
    } catch (error) {
      if ((error as MongoError)?.code === ErrorsMap.DuplicateKeyError) {
        throw new BadRequestException('A user with this email already exists.');
      } else {
        throw error;
      }
    }

    if (createdUser === null) {
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return await this.findOne(createdUser._id.toString());
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, '-password').exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id, '-password').exec();

    if (user === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findOneForAuth(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate({ _id: id }, updateUserDto, { new: true })
      .select('-password')
      .exec();

    if (user === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async remove(id: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete({ _id: id }).exec();
  }
}
