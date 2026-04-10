import { object, string, coerce, array } from "zod";

export const roomSchema = object({
    name: string().min(1, "Name must be at least 1 character long."),
    description: string().min(50, "Description must be at least 50 characters long.").max(500, "Description must be at most 500 characters long"),
    capacity: coerce.number().gt(0, "Capacity must be at least 1 character long."),
    price: coerce.number().gt(0, "Price must be at least 1 character long."),
    amenities: array(string()).nonempty("Amenities must be at least 1 amenities."),
});

export const contactSchema = object({
    name: string().min(6, "Name must be at least 6 characters long."),
    email: string().min(6, "Email must be at least 6 characters long.").email("Invalid email address"),
    subject: string().min(6, "Subject must be at least 6 characters long."),
    message: string().min(10, "Message must be at least 10 characters long.").max(500, "Message must be at most 500 characters long"),
});

export const reserveSchema = object({
    name: string().min(1, "Name must be at least 1 character long."),
    phone: string().min(10, "Phone number must be at least 10 digits.").max(15, "Phone number must be at most 15 digits."),
    
});