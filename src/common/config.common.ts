const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  MONGODBATLAS_USER,
  MONGODBATLAS_PASSWORD,
  SESSION_TIME,
  ATTENDING_TIME,
  USER_ID_BOT,
} = process.env;

export default {
  twilioAccountSid: TWILIO_ACCOUNT_SID,
  twilioAuthToken: TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: TWILIO_PHONE_NUMBER,
  mongoDbAtlasUser: MONGODBATLAS_USER,
  mongoDbAtlasPassword: MONGODBATLAS_PASSWORD,
  sessionTime: parseInt(SESSION_TIME),
  attendingTime: parseInt(ATTENDING_TIME),
  userIdBot: USER_ID_BOT,
};
