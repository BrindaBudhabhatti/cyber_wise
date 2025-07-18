
'use server';

import { createClient } from './supabase-client';

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

const supabase = createClient();

// Functions for Solved Cases
export async function getSolvedCases(): Promise<SolvedCase[]> {
    const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('year', { ascending: false });

    if (error) {
        console.error('Error fetching cases:', error);
        return [];
    }
    return data as SolvedCase[];
}

export async function getSolvedCase(id: string): Promise<SolvedCase | null> {
    const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching case:', error);
        return null;
    }
    return data as SolvedCase;
}

export async function addSolvedCase(data: Omit<SolvedCase, 'id'>) {
    const { data: newCase, error } = await supabase
        .from('cases')
        .insert([data])
        .select()
        .single();

    if (error) {
        console.error('Error adding case:', error);
        return null;
    }
    return newCase;
}

export async function updateSolvedCase(id: string, data: Partial<SolvedCase>) {
    const { data: updatedCase, error } = await supabase
        .from('cases')
        .update(data)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating case:', error);
        return null;
    }
    return updatedCase;
}

export async function deleteSolvedCase(id: string) {
    const { error } = await supabase
        .from('cases')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting case:', error);
    }
    return;
}


// Functions for Victim Testimonials
export async function getVictimTestimonials(): Promise<VictimTestimonial[]> {
     const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }
    return data as VictimTestimonial[];
}

export async function getVictimTestimonial(id: string): Promise<VictimTestimonial | null> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching testimonial:', error);
        return null;
    }
    return data as VictimTestimonial;
}

export async function addVictimTestimonial(data: Omit<VictimTestimonial, 'id'>) {
    const { data: newTestimonial, error } = await supabase
        .from('testimonials')
        .insert([data])
        .select()
        .single();
    
    if (error) {
        console.error('Error adding testimonial:', error);
        return null;
    }
    return newTestimonial;
}

export async function updateVictimTestimonial(id: string, data: Partial<VictimTestimonial>) {
    const { data: updatedTestimonial, error } = await supabase
        .from('testimonials')
        .update(data)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating testimonial:', error);
        return null;
    }
    return updatedTestimonial;
}

export async function deleteVictimTestimonial(id: string) {
    const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
        
    if (error) {
        console.error('Error deleting testimonial:', error);
    }
    return;
}
