const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  MONGODBATLAS_USER,
  MONGODBATLAS_PASSWORD,
  SESSION_TIME,
  ATTENDING_TIME,
} = process.env;

export default {
  twilioAccountSid: TWILIO_ACCOUNT_SID,
  twilioAuthToken: TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: TWILIO_PHONE_NUMBER,
  mongoDbAtlasUser: MONGODBATLAS_USER,
  mongoDbAtlasPassword: MONGODBATLAS_PASSWORD,
  // in minutes
  sessionTime: parseInt(SESSION_TIME),
  // in hours
  attendingTime: parseInt(ATTENDING_TIME),
};
