export interface RefreshToken {
    refreshToken: string;
}
export interface Tokens extends RefreshToken {
    accessToken: string;
}
