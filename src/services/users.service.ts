import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@/exceptions/httpException';
import { IUser } from '@interfaces/users.interface';
import { CreateUserDto } from '@dtos/users.dto';
import { ProfileEntity } from '@entities/profile.entity';

@Service()
@EntityRepository()
export class UserService extends Repository<UserEntity> {
  public async findAllUser(): Promise<IUser[]> {
    return UserEntity.find({relations: ["profile"]});
  }

  public async findUserById(userId: string): Promise<IUser> {
    const findUser = await UserEntity.findOne({ where: { walletId: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<UserEntity | null> {
    const findUser = await UserEntity.findOne({ where: { walletId: userData.walletId } });
    if (!findUser) {
      const newProfile = await new ProfileEntity().save();
      const newUser = UserEntity.create({ ...userData, profile: newProfile });
      await newUser.save();
      return newUser;
    }
    return null;
  }

  public async updateUser(userId: number, userData: IUser): Promise<any> {
    // const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    // if (!findUser) throw new HttpException(409, "User doesn't exist");
    //
    // const hashedPassword = await hash(userData.password, 10);
    // await UserEntity.update(userId, { ...userData, password: hashedPassword });
    //
    // const updateUser: User = await UserEntity.findOne({ where: { id: userId } });
    return true;
  }

  public async deleteUser(walletId: string): Promise<IUser> {
    const findUser = await UserEntity.findOne({ where: { walletId: walletId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await UserEntity.delete({ walletId: walletId });
    return findUser;
  }
}
