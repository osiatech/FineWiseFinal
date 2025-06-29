
export interface SignInDto
{
    email: string;
    password: string
}

export interface AuthResponse
{
    accessToken: string;
    refreshToken?: string;
    user: 
    {
        id: string;
        email: string;
        password: string;
        name?: string;
    };
}