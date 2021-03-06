import { injectable, inject } from 'tsyringe';
import User from 'entities/User';
import IUsersRepository from '../../interfaces/IUsersRepository';
import IStorageProvider from '../../providers/StorageProvider/models/IStorageProvider';
import AppError from '../../errors/AppErros';

interface IRequest {
    user_id: number;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }
        const filename = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = filename;

        await this.usersRepository.updateAvatar({
            avatar: filename,
            id: user_id,
        });

        return user;
    }
}

export default UpdateUserAvatarService;
