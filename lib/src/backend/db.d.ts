declare class Users {
    createUser(user: {
        name: string;
        publicKey: string;
    }): Promise<void>;
    getUser(key: string): Promise<import("axios").AxiosResponse<any, any>>;
}
export declare const userModel: Users;
export {};
