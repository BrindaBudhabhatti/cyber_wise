
'use server';

import { cases } from './cases-data';
import { testimonials } from './testimonials-data';
import { v4 as uuidv4 } from 'uuid';

export interface SolvedCase {
    id?: string;
    titleKey: string;
    year: number;
    summaryKey: string;
    toolsUsed: string[];
    outcomeKey: string;
    tags: string[];
}

export interface VictimTestimonial {
    id?: string;
    aliasKey: string;
    storyKey: string;
    helpKey: string;
    messageKey: string;
}

// Mock delay to simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


// Functions for Solved Cases
export async function getSolvedCases(): Promise<SolvedCase[]> {
    await delay(50); // Simulate network call
    return cases;
}

export async function getSolvedCase(id: string): Promise<SolvedCase | null> {
    await delay(50);
    const caseItem = cases.find(c => c.id === id) || null;
    return caseItem;
}

export async function addSolvedCase(data: SolvedCase) {
    await delay(100);
    const newCase = { ...data, id: uuidv4() };
    cases.unshift(newCase); // Add to the beginning of the array
    return newCase;
}

export async function updateSolvedCase(id: string, data: SolvedCase) {
    await delay(100);
    const caseIndex = cases.findIndex(c => c.id === id);
    if (caseIndex !== -1) {
        cases[caseIndex] = { ...cases[caseIndex], ...data };
        return cases[caseIndex];
    }
    return null;
}

export async function deleteSolvedCase(id: string) {
    await delay(100);
    const caseIndex = cases.findIndex(c => c.id === id);
    if (caseIndex > -1) {
        cases.splice(caseIndex, 1);
    }
    return;
}


// Functions for Victim Testimonials
export async function getVictimTestimonials(): Promise<VictimTestimonial[]> {
    await delay(50);
    return testimonials;
}

export async function getVictimTestimonial(id: string): Promise<VictimTestimonial | null> {
    await delay(50);
    const testimonial = testimonials.find(t => t.id === id) || null;
    return testimonial;
}

export async function addVictimTestimonial(data: VictimTestimonial) {
    await delay(100);
    const newTestimonial = { ...data, id: uuidv4() };
    testimonials.unshift(newTestimonial); // Add to the beginning of the array
    return newTestimonial;
}

export async function updateVictimTestimonial(id: string, data: VictimTestimonial) {
    await delay(100);
     const testimonialIndex = testimonials.findIndex(t => t.id === id);
    if (testimonialIndex !== -1) {
        testimonials[testimonialIndex] = { ...testimonials[testimonialIndex], ...data };
        return testimonials[testimonialIndex];
    }
    return null;
}

export async function deleteVictimTestimonial(id: string) {
    await delay(100);
    const testimonialIndex = testimonials.findIndex(t => t.id === id);
    if (testimonialIndex > -1) {
        testimonials.splice(testimonialIndex, 1);
    }
    return;
}
