import { TNewFreelancer } from "@/definitions/schema/new-freelancer-schema";
import { createContext, ReactNode, useContext, useState } from "react";

export interface NewUserContextProps {
    newFreelancer: TNewFreelancer;
    updateNewUser: (property: Partial<TNewFreelancer>) => void;
}

const defaultNewUser: TNewFreelancer = {
    userId: 0,
    nickname: "",
    publicEmail: "",
    description: "",
    phone: "",
    city: "",
    region: "",
    zip: "",
    address: "",
    categories: []
};

export const NewFreelancerFormContext = createContext<NewUserContextProps>({
    newFreelancer: defaultNewUser,
    updateNewUser: () => null
});

export function NewFreelancerFormContextProvider({ children }: { children: ReactNode }) {
    const [newFreelancer, setNewFreelancer] = useState<TNewFreelancer>(defaultNewUser);

    const updateNewUser = (values: Partial<TNewFreelancer>) => {
        setNewFreelancer((prevUser: TNewFreelancer): TNewFreelancer => ({ ...prevUser, ...values }));
    };

    return (
        <NewFreelancerFormContext.Provider value={{ newFreelancer, updateNewUser }}>
            {children}
        </NewFreelancerFormContext.Provider>
    );
}

export const useNewFreelancerFormContext = () => {
    const context = useContext(NewFreelancerFormContext);
    if (!context) {
        throw new Error('useNewUserFormContext must be used within a NewUserFormContextProvider');
    }

    return context;
};