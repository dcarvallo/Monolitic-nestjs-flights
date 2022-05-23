import { Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(USER.name) private readonly model:Model<IUser>) {}

    async hashPassword(password:string): Promise<string>{
        const salt = await bcrypt.genSalt(10);
        console.log('hash')
        return await bcrypt.hash(password, salt);
    }

    async create(userDTO: UserDTO): Promise<IUser>{
        console.log({userDTO})
        const hash = await this.hashPassword(userDTO.password)
        
        const newUser = new this.model({...userDTO, password:hash});
        return await newUser.save();
    }

    async getAll(): Promise<IUser[]>{
        return await this.model.find();
    }

}