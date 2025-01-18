export interface responsePayloadI {
  status: "success" | "error";
  message?: String;
  error?: {
    code?: Number | String | null;
    message?: String | null;
    details?: any[] | null;
  };
  data?: any;
}
