
'use server';

import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

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

const casesPath = path.join(process.cwd(), 'src/lib/data/cases.json');
const testimonialsPath = path.join(process.cwd(), 'src/lib/data/testimonials.json');

async function readData<T>(filePath: string): Promise<T[]> {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as T[];
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return []; // File doesn't exist, return empty array
        }
        throw error;
    }
}

async function writeData<T>(filePath: string, data: T[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}


// Functions for Solved Cases
export async function getSolvedCases(): Promise<SolvedCase[]> {
    const cases = await readData<SolvedCase>(casesPath);
    return cases.sort((a, b) => b.year - a.year);
}

export async function getSolvedCase(id: string): Promise<SolvedCase | null> {
    const cases = await readData<SolvedCase>(casesPath);
    const caseItem = cases.find(c => c.id === id) || null;
    return caseItem;
}

export async function addSolvedCase(data: SolvedCase) {
    const cases = await readData<SolvedCase>(casesPath);
    const newCase = { ...data, id: uuidv4() };
    cases.unshift(newCase);
    await writeData(casesPath, cases);
    return newCase;
}

export async function updateSolvedCase(id: string, data: SolvedCase) {
    const cases = await readData<SolvedCase>(casesPath);
    const caseIndex = cases.findIndex(c => c.id === id);
    if (caseIndex !== -1) {
        cases[caseIndex] = { ...cases[caseIndex], ...data, id };
        await writeData(casesPath, cases);
        return cases[caseIndex];
    }
    return null;
}

export async function deleteSolvedCase(id: string) {
    const cases = await readData<SolvedCase>(casesPath);
    const updatedCases = cases.filter(c => c.id !== id);
    await writeData(casesPath, updatedCases);
    return;
}


// Functions for Victim Testimonials
export async function getVictimTestimonials(): Promise<VictimTestimonial[]> {
    const testimonials = await readData<VictimTestimonial>(testimonialsPath);
    return testimonials;
}

export async function getVictimTestimonial(id: string): Promise<VictimTestimonial | null> {
    const testimonials = await readData<VictimTestimonial>(testimonialsPath);
    const testimonial = testimonials.find(t => t.id === id) || null;
    return testimonial;
}

export async function addVictimTestimonial(data: VictimTestimonial) {
    const testimonials = await readData<VictimTestimonial>(testimonialsPath);
    const newTestimonial = { ...data, id: uuidv4() };
    testimonials.unshift(newTestimonial);
    await writeData(testimonialsPath, testimonials);
    return newTestimonial;
}

export async function updateVictimTestimonial(id: string, data: VictimTestimonial) {
     const testimonials = await readData<VictimTestimonial>(testimonialsPath);
     const testimonialIndex = testimonials.findIndex(t => t.id === id);
    if (testimonialIndex !== -1) {
        testimonials[testimonialIndex] = { ...testimonials[testimonialIndex], ...data, id };
        await writeData(testimonialsPath, testimonials);
        return testimonials[testimonialIndex];
    }
    return null;
}

export async function deleteVictimTestimonial(id: string) {
    const testimonials = await readData<VictimTestimonial>(testimonialsPath);
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    await writeData(testimonialsPath, updatedTestimonials);
    return;
}
