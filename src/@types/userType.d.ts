declare module "userType" {
  export interface UserType {
    email: string;
    username: string;
    password: string;
    isAccountNonExpired: boolean;
    isAccountNonLocked: boolean;
    isEnabled: boolean;
    date: string;
  }
}
