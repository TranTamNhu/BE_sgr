import { GetCurrentDate } from './dateUtil.js'

export const RandomOTP = () => {
  // Generate a random 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const GetExpiredOtp = () => {
  // Get the time expiration for the OTP (5minutes)
  const currentDate = GetCurrentDate();
  currentDate.setMinutes(currentDate.getMinutes() + 5);
  return currentDate;
}