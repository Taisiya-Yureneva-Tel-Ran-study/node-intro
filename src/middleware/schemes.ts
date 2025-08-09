import z from "zod";

export const CalculationDataScheme = z.object({
    operation: z.string(),
    first: z.coerce.number(),
    second: z.coerce.number()
})