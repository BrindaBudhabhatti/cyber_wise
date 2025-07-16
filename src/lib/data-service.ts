
'use server';

import { cases } from './cases-data';
import { testimonials } from './testimonials-data';

export interface SolvedCase {
    id: string;
    titleKey: string;
    year: number;
    summaryKey: string;
    toolsUsed: string[];
    outcomeKey: string;
    tags: string[];
}

export interface VictimTestimonial {
    id: string;
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

export async function addSolvedCase(data: Omit<SolvedCase, 'id'>) {
    console.log("This is a demo. Data is not saved.", data);
    return;
}

export async function updateSolvedCase(id: string, data: Omit<SolvedCase, 'id'>) {
    console.log("This is a demo. Data is not saved.", id, data);
    return;
}

export async function deleteSolvedCase(id: string) {
    console.log("This is a demo. Data is not saved.", id);
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

export async function addVictimTestimonial(data: Omit<VictimTestimonial, 'id'>) {
    console.log("This is a demo. Data is not saved.", data);
    return;
}

export async function updateVictimTestimonial(id: string, data: Omit<VictimTestimonial, 'id'>) {
     console.log("This is a demo. Data is not saved.", id, data);
    return;
}

export async function deleteVictimTestimonial(id: string) {
    console.log("This is a demo. Data is not saved.", id);
    return;
}
