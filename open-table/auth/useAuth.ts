import axios from "axios";


const useAuth = () => {


    const signin = async (
        {
            email,
            password,
        }: {
            email: string;
            password: string;
        },
        handleClose: () => void
    ) => {

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/signin",
                {
                    email,
                    password,
                }
            );

            handleClose();
        } catch (error: any) {

        }
    };
    const signup = async (
        {
            email,
            password,
            firstName,
            lastName,
            city,
            phone,
        }: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            city: string;
            phone: string;
        },
        handleClose: () => void
    ) => {

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/signup",
                {
                    email,
                    password,
                    firstName,
                    lastName,
                    city,
                    phone,
                }
            );

            handleClose();
        } catch (error: any) {

        }
    };

    return {
        signin,
        signup,
    };
};

export default useAuth;