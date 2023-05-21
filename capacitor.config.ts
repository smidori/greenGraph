import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.greengraph',
  appName: 'GreenGraph',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
