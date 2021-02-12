type IKeyPair = {
    [key: string]: string;
}

export const config = {
    searchApi: {
        'google': 'api/v1/Google',
        'bing': 'api/v1/Bing'
    } as IKeyPair 
}