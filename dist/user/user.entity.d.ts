import { Wallet } from '../wallet/wallet.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    wallets?: Wallet[];
    createdAt: Date;
    updatedAt: Date;
}
