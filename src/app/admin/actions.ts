
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
  const result = caseSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const caseData = {
    ...result.data,
    toolsUsed: result.data.toolsUsed.split(',').map(t => t.trim()),
    tags: result.data.tags.split(',').map(t => t.trim()),
  };

  if (result.data.id) {
    await updateSolvedCase(result.data.id, caseData);
  } else {
    await addSolvedCase(caseData);
  }

  revalidatePath('/admin/cases');
  revalidatePath('/case-gallery');
  return { success: true, message: "Case saved successfully." };
}

export async function deleteCaseAction(id: string) {
    await deleteSolvedCase(id);
    revalidatePath('/admin/cases');
    revalidatePath('/case-gallery');
    return { success: true, message: "Case deleted successfully." };
}


export async function upsertTestimonialAction(data: unknown) {
  const result = testimonialSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }
  
  const testimonialData = result.data;

  if (testimonialData.id) {
      await updateVictimTestimonial(testimonialData.id, testimonialData);
  } else {
      await addVictimTestimonial(testimonialData);
  }
  
  revalidatePath('/admin/testimonials');
  revalidatePath('/case-gallery');
  return { success: true, message: "Testimonial saved successfully." };
}

export async function deleteTestimonialAction(id: string) {
    await deleteVictimTestimonial(id);
    revalidatePath('/admin/testimonials');
    revalidatePath('/case-gallery');
    return { success: true, message: "Testimonial deleted successfully." };
}
