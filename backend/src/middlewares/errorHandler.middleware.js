import { ZodError } from "zod";
import { HTTPSTATUS } from "../config/http.config.js";
import { AppError } from "../utils/appError.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";

// helper buat format error dari Zod
const formatZodError = (res, error) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

// middleware utama error handler
export const errorHandler = (error, req, res, next) => {
  console.error(`❌ Error Occurred on PATH: ${req.path}`, error);

  // Error parsing JSON
  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format. Please check your request body.",
    });
  }

  // Error validasi Zod
  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  // Custom AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  // Fallback (error umum)
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknown error occurred",
  });
};
