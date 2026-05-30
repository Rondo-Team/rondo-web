import { CREATE_PLAY_LIMITS } from "@/modules/shared/domain/consts";
import { FieldElementType } from "@/types/FieldElementType";
import z from "zod";

const PlayElementSchema = (t: (arg: string) => string) =>
  z.object({
    id: z.uuid({ error: t("play.invalid") }),
    x: z.coerce.number({ error: t("play.invalid") }),
    y: z.coerce.number({ error: t("play.invalid") }),
    elementType: z.enum(FieldElementType, { error: t("play.invalid") }),
  });

const PlayStepSchema = (t: (arg: string) => string) =>
  z.object({
    elements: z
      .array(PlayElementSchema(t), { error: t("play.invalid") })
      .min(1, {
        error: t("step.empty"),
      }),
  });

const PlaySchema = (t: (arg: string) => string) =>
  z.object({
    steps: z.array(PlayStepSchema(t), { error: t("play.invalid") }).min(1, {
      error: t("play.empty"),
    }),
  });

export const UpdateDraftSchema = (t: (arg: string) => string) =>
  z.object({
    title: z
      .string({ error: t("title.empty") })
      .trim()
      .min(CREATE_PLAY_LIMITS.title.min, { error: t("title.tooShort") })
      .max(CREATE_PLAY_LIMITS.title.max, { error: t("title.tooLong") }),
    description: z
      .string({ error: t("description.empty") })
      .trim()
      .min(CREATE_PLAY_LIMITS.description.min, {
        error: t("description.tooShort"),
      })
      .max(CREATE_PLAY_LIMITS.description.max, {
        error: t("description.tooLong"),
      }),
    play: z
      .string({ error: t("play.invalid") })
      .transform((value, ctx) => {
        try {
          return JSON.parse(value);
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("play.invalid"),
            path: ["play"],
          });

          return z.NEVER;
        }
      })
      .pipe(PlaySchema(t)),
  });

type UpdateDraftSchemaType = ReturnType<typeof UpdateDraftSchema>;
export type UpdateDraftActionDTO = z.infer<UpdateDraftSchemaType>;
