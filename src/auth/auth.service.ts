import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) { }

    async validateUser(id: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(id);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
