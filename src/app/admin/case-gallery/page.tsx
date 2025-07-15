"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust import path as needed
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Testimonial {
  name: string;
  testimonial: string;
}

interface Case {
  id?: string;
  title: string;
  description: string;
  testimonials: Testimonial[];
}

const CaseGalleryAdminPage = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [newCase, setNewCase] = useState<Omit<Case, "id">>({
    title: "",
    description: "",
    testimonials: [],
  });
  const [editingCase, setEditingCase] = useState<Case | null>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const casesCollection = collection(db, "caseGallery");
    const caseSnapshot = await getDocs(casesCollection);
    const caseList = caseSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Case, "id">),
    }));
    setCases(caseList);
  };

  const handleAddCase = async () => {
    if (newCase.title && newCase.description) {
      try {
        await addDoc(collection(db, "caseGallery"), newCase);
        setNewCase({ title: "", description: "", testimonials: [] });
        fetchCases();
      } catch (error) {
        console.error("Error adding case:", error);
      }
    }
  };

  const handleEditCase = (caseToEdit: Case) => {
    setEditingCase(caseToEdit);
  };

  const handleUpdateCase = async () => {
    if (editingCase && editingCase.id) {
      try {
        const caseDoc = doc(db, "caseGallery", editingCase.id);
        await updateDoc(caseDoc, {
          title: editingCase.title,
          description: editingCase.description,
          testimonials: editingCase.testimonials,
        });
        setEditingCase(null);
        fetchCases();
      } catch (error) {
        console.error("Error updating case:", error);
      }
    }
  };

  const handleDeleteCase = async (id: string) => {
    try {
      const caseDoc = doc(db, "caseGallery", id);
      await deleteDoc(caseDoc);
      fetchCases();
    } catch (error) {
      console.error("Error deleting case:", error);
    }
  };

  const handleAddTestimonial = (caseId: string) => {
    if (editingCase && editingCase.id === caseId) {
      setEditingCase({
        ...editingCase,
        testimonials: [...editingCase.testimonials, { name: "", testimonial: "" }],
      });
    }
  };

  const handleTestimonialChange = (
    caseId: string,
    index: number,
    field: keyof Testimonial,
    value: string
  ) => {
    if (editingCase && editingCase.id === caseId) {
      const updatedTestimonials = [...editingCase.testimonials];
      updatedTestimonials[index][field] = value;
      setEditingCase({ ...editingCase, testimonials: updatedTestimonials });
    }
  };

  const handleRemoveTestimonial = (caseId: string, index: number) => {
    if (editingCase && editingCase.id === caseId) {
      const updatedTestimonials = editingCase.testimonials.filter(
        (_, i) => i !== index
      );
      setEditingCase({ ...editingCase, testimonials: updatedTestimonials });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Case Gallery Admin</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Case</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              placeholder="Case Title"
              value={newCase.title}
              onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
            />
            <Textarea
              placeholder="Case Description"
              value={newCase.description}
              onChange={(e) =>
                setNewCase({ ...newCase, description: e.target.value })
              }
            />
            <Button onClick={handleAddCase}>Add Case</Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Existing Cases</h2>
      <div className="grid gap-4">
        {cases.map((caseItem) => (
          <Card key={caseItem.id}>
            <CardHeader>
              <CardTitle>{caseItem.title}</CardTitle>
              <CardDescription>{caseItem.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-2">Testimonials</h3>
              {caseItem.testimonials.map((testimonial, index) => (
                <div key={index} className="mb-2 border-b pb-2">
                  <p>
                    <strong>{testimonial.name}:</strong>{" "}
                    {testimonial.testimonial}
                  </p>
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <Button onClick={() => handleEditCase(caseItem)}>Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCase(caseItem.id!)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Case</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input
                placeholder="Case Title"
                value={editingCase.title}
                onChange={(e) =>
                  setEditingCase({ ...editingCase, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Case Description"
                value={editingCase.description}
                onChange={(e) =>
                  setEditingCase({
                    ...editingCase,
                    description: e.target.value,
                  })
                }
              />
              <h3 className="text-lg font-medium mb-2">Testimonials</h3>
              {editingCase.testimonials.map((testimonial, index) => (
                <div key={index} className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="Name"
                    value={testimonial.name}
                    onChange={(e) =>
                      handleTestimonialChange(
                        editingCase.id!,
                        index,
                        "name",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="Testimonial"
                    value={testimonial.testimonial}
                    onChange={(e) =>
                      handleTestimonialChange(
                        editingCase.id!,
                        index,
                        "testimonial",
                        e.target.value
                      )
                    }
                  />
                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleRemoveTestimonial(editingCase.id!, index)
                    }
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button onClick={() => handleAddTestimonial(editingCase.id!)}>
                Add Testimonial
              </Button>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingCase(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateCase}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CaseGalleryAdminPage;