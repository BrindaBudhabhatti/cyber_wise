
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';

// Define types
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


// Functions for Solved Cases
const casesCollection = collection(db, 'solvedCases');

export async function getSolvedCases(): Promise<SolvedCase[]> {
    const q = query(casesCollection);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SolvedCase));
}

export async function getSolvedCase(id: string): Promise<SolvedCase | null> {
    const docRef = doc(db, 'solvedCases', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as SolvedCase : null;
}

export async function addSolvedCase(data: Omit<SolvedCase, 'id'>) {
    await addDoc(casesCollection, data);
}

export async function updateSolvedCase(id: string, data: Omit<SolvedCase, 'id'>) {
    const docRef = doc(db, 'solvedCases', id);
    await updateDoc(docRef, data);
}

export async function deleteSolvedCase(id: string) {
    const docRef = doc(db, 'solvedCases', id);
    await deleteDoc(docRef);
}


// Functions for Victim Testimonials
const testimonialsCollection = collection(db, 'victimTestimonials');

export async function getVictimTestimonials(): Promise<VictimTestimonial[]> {
    const snapshot = await getDocs(testimonialsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VictimTestimonial));
}

export async function getVictimTestimonial(id: string): Promise<VictimTestimonial | null> {
    const docRef = doc(db, 'victimTestimonials', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as VictimTestimonial : null;
}

export async function addVictimTestimonial(data: Omit<VictimTestimonial, 'id'>) {
    await addDoc(testimonialsCollection, data);
}

export async function updateVictimTestimonial(id: string, data: Omit<VictimTestimonial, 'id'>) {
    const docRef = doc(db, 'victimTestimonials', id);
    await updateDoc(docRef, data);
}

export async function deleteVictimTestimonial(id: string) {
    const docRef = doc(db, 'victimTestimonials', id);
    await deleteDoc(docRef);
}
