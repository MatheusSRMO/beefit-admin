declare type TrainerRegisterProps = {
    firstName: string;
    lastName: string;
    age: number;
    weight: number;
    height: number;
    goal?: string;
    observation?: string;
    url?: string;
};

declare type Trainer = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    weight: number;
    height: number;
    goal?: string | undefined;
    observation?: string;
    url: string;
};
