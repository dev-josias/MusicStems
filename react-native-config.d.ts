declare module "react-native-config" {
  export interface NativeConfig {
    APP_URL: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
