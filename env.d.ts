declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_PHONE_NUMBER: string;
      MONGODBATLAS_USER: string;
      MONGODBATLAS_PASSWORD: string;
      SESSION_TIME: number;
    }
  }
}
