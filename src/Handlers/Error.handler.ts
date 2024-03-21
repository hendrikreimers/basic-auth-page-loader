import {CustomError} from "../Types/CustomError.type";

export const errorHandler = (error: CustomError | Error | unknown) => {
    // Fetch the custom error if occurred
    if (error instanceof CustomError) {
        console.error('ERROR:', error.description, error.error);
    } else {
        console.error('UNKNOWN ERROR:', error);
    }
}