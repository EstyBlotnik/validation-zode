import { z } from 'zod';
export const userSchema = z.object({
    firstname: z.string().min(2, "שם פרטי חייב להכיל לפחות 2 תווים"),
    lastname: z.string().min(2, "שם משפחה חייב להיות לפחות באורך 2 תווים"),
    id: z.string().min(8, "על מספר זהות להכיל לפחות 8 תוים").max(9, "על תעודת זהות להכיל לכל היותר 9 תוים"),
    birthdate: z.date().refine((date) => date < new Date(), {
        message: "תאריך הלידה חייב להיות בעבר",
    }), 
    email: z.string().email("יש להזין אימייל תקין"),
});
export type userData = z.infer<typeof userSchema>;