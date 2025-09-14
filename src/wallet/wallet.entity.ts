import { User } from '../user/user.entity';

export class Wallet {
  id: number;
  userId: number;
  user?: User;
  balance: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
