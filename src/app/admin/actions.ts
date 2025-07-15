
'use server';

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  addSolvedCase,
  updateSolvedCase,
  deleteSolvedCase,
  addVictimTestimonial,
  updateVictimTestimonial,
  deleteVictimTestimonial,
} from "@/lib/data-service";

const caseSchema = z.object({
  id: z.string().optional(),
  titleKey: z.string().min(1, "Title is required"),
  year: z.coerce.number().min(2000, "Year must be after 2000"),
  summaryKey: z.string().min(1, "Summary is required"),
  toolsUsed: z.string().min(1, "Tools used is required"),
  outcomeKey: z.string().min(1, "Outcome is required"),
  tags: z.string().min(1, "Tags are required"),
});

const testimonialSchema = z.object({
    id: z.string().optional(),
    aliasKey: z.string().min(1, "Alias is required"),
    storyKey: z.string().min(1, "Story is required"),
    helpKey: z.string().min(1, "Help received is required"),
    messageKey: z.string().min(1, "Message is required"),
});


export async function upsertCaseAction(data: unknown) {
  console.log("This is a demo. Data is not saved.");
  const result = caseSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }
  revalidatePath('/admin/cases');
  revalidatePath('/case-gallery');
  return { success: true, message: "This is a demo. Data is not saved." };
}

export async function deleteCaseAction(id: string) {
    console.log("This is a demo. Data is not saved.");
    revalidatePath('/admin/cases');
    revalidatePath('/case-gallery');
    return { success: true, message: "This is a demo. Data is not saved." };
}


export async function upsertTestimonialAction(data: unknown) {
  console.log("This is a demo. Data is not saved.");
  const result = testimonialSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }
  revalidatePath('/admin/testimonials');
  revalidatePath('/case-gallery');
  return { success: true, message: "This is a demo. Data is not saved." };
}

export async function deleteTestimonialAction(id: string) {
    console.log("This is a demo. Data is not saved.");
    revalidatePath('/admin/testimonials');
    revalidatePath('/case-gallery');
    return { success: true, message: "This is a demo. Data is not saved." };
}
