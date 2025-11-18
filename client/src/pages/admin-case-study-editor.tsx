import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Save, Eye, AlertCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { useParams, useLocation } from "wouter";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client?: string;
  category: string;
  challenge: string;
  approach: string;
  impact: string;
  roleDescription: string;
  featured: boolean;
  treeHouseAttribution: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface CaseStudyFormData {
  slug: string;
  title: string;
  client: string;
  category: string;
  challenge: string;
  approach: string;
  impact: string;
  roleDescription: string;
  featured: boolean;
  treeHouseAttribution: boolean;
  image: string;
}

async function fetchCaseStudy(id: string): Promise<CaseStudy> {
  const response = await fetch(`/api/case-studies/by-id/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch case study');
  }
  return response.json();
}

async function createCaseStudy(data: CaseStudyFormData): Promise<CaseStudy> {
  const response = await fetch('/api/case-studies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create case study');
  }
  const result = await response.json();
  return result.caseStudy;
}

async function updateCaseStudy(id: string, data: Partial<CaseStudyFormData>): Promise<CaseStudy> {
  const response = await fetch(`/api/case-studies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update case study');
  }
  const result = await response.json();
  return result.caseStudy;
}

interface AdminCaseStudyEditorProps {
  caseStudyId?: string;
}

export default function AdminCaseStudyEditor() {
  const { id: caseStudyId } = useParams();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(caseStudyId);
  const [, setLocation] = useLocation();

  const [formData, setFormData] = useState<CaseStudyFormData>({
    slug: '',
    title: '',
    client: '',
    category: '',
    challenge: '',
    approach: '',
    impact: '',
    roleDescription: '',
    featured: false,
    treeHouseAttribution: false,
    image: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch existing case study data if editing
  const { data: existingCaseStudy, isLoading } = useQuery({
    queryKey: ['case-study', caseStudyId],
    queryFn: () => fetchCaseStudy(caseStudyId!),
    enabled: isEditMode && Boolean(caseStudyId),
  });

  // Populate form with existing data
  useEffect(() => {
    if (existingCaseStudy) {
      setFormData({
        slug: existingCaseStudy.slug,
        title: existingCaseStudy.title,
        client: existingCaseStudy.client || '',
        category: existingCaseStudy.category,
        challenge: existingCaseStudy.challenge,
        approach: existingCaseStudy.approach,
        impact: existingCaseStudy.impact,
        roleDescription: existingCaseStudy.roleDescription,
        featured: existingCaseStudy.featured,
        treeHouseAttribution: existingCaseStudy.treeHouseAttribution,
        image: existingCaseStudy.image || '',
      });
    }
  }, [existingCaseStudy]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditMode && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, isEditMode]);

  const createMutation = useMutation({
    mutationFn: createCaseStudy,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['case-studies'] });
      toast({
        title: "Success",
        description: "Case study created successfully",
      });
      setLocation("/admin/blog");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create case study: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<CaseStudyFormData>) => updateCaseStudy(caseStudyId!, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['case-studies'] });
      queryClient.invalidateQueries({ queryKey: ['case-study', caseStudyId] });
      toast({
        title: "Success",
        description: "Case study updated successfully",
      });
      setLocation("/admin/blog");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update case study: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof CaseStudyFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const response = await fetch('/api/case-study-images', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setFormData(prev => ({ ...prev, image: data.imageUrl }));
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (!formData.challenge.trim()) {
      newErrors.challenge = 'Challenge is required';
    }
    if (!formData.approach.trim()) {
      newErrors.approach = 'Approach is required';
    }
    if (!formData.impact.trim()) {
      newErrors.impact = 'Impact is required';
    }
    if (!formData.roleDescription.trim()) {
      newErrors.roleDescription = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting",
        variant: "destructive",
      });
      return;
    }

    if (isEditMode) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleBack = () => {
    setLocation("/admin/blog");
  };

  const handlePreview = () => {
    if (formData.slug) {
      window.open(`/work/${formData.slug}`, '_blank');
    } else {
      toast({
        title: "Preview Unavailable",
        description: "Please save the case study first to preview it",
        variant: "destructive",
      });
    }
  };

  if (isEditMode && isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p>Loading case study...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-serif font-bold text-navy">
                {isEditMode ? 'Edit Case Study' : 'Create New Case Study'}
              </h1>
              <p className="text-warm-gray mt-2">
                {isEditMode 
                  ? 'Update your case study details' 
                  : 'Add a new case study to your portfolio'
                }
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-2"
          >
            {isEditMode && (
              <Button 
                variant="outline"
                onClick={handlePreview}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            )}
            <Button 
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-coral hover:bg-coral/90 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {createMutation.isPending || updateMutation.isPending 
                ? 'Saving...' 
                : 'Save Case Study'
              }
            </Button>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Case study title"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="url-friendly-slug"
                      disabled={isEditMode}
                    />
                    {errors.slug && (
                      <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
                    )}
                    {isEditMode && (
                      <p className="text-gray-500 text-sm mt-1">
                        Slug cannot be changed after creation
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => handleInputChange('client', e.target.value)}
                      placeholder="Client name (optional)"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      placeholder="e.g. Strategy & Innovation"
                    />
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Header Image</Label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="file"
                          id="image-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('image-upload')?.click()}
                          disabled={uploadingImage}
                          className="w-full"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Or enter an image URL directly:
                    </div>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.image && (
                      <div className="mt-2">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full max-w-md h-32 object-cover rounded-lg border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="challenge">Challenge *</Label>
                  <Textarea
                    id="challenge"
                    value={formData.challenge}
                    onChange={(e) => handleInputChange('challenge', e.target.value)}
                    placeholder="Describe the challenge or problem"
                    rows={4}
                  />
                  {errors.challenge && (
                    <p className="text-red-500 text-sm mt-1">{errors.challenge}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="approach">Approach *</Label>
                  <Textarea
                    id="approach"
                    value={formData.approach}
                    onChange={(e) => handleInputChange('approach', e.target.value)}
                    placeholder="Describe your approach and methodology"
                    rows={4}
                  />
                  {errors.approach && (
                    <p className="text-red-500 text-sm mt-1">{errors.approach}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="impact">Impact *</Label>
                  <Textarea
                    id="impact"
                    value={formData.impact}
                    onChange={(e) => handleInputChange('impact', e.target.value)}
                    placeholder="Describe the results and impact"
                    rows={4}
                  />
                  {errors.impact && (
                    <p className="text-red-500 text-sm mt-1">{errors.impact}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="role">Your Role *</Label>
                  <Textarea
                    id="role"
                    value={formData.roleDescription}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="Describe your specific role in this project"
                    rows={3}
                  />
                  {errors.roleDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.roleDescription}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured">Featured Case Study</Label>
                    <p className="text-sm text-gray-500">
                      Featured case studies appear at the top of the list
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="treeHouseAttribution">TreeHouse Attribution</Label>
                    <p className="text-sm text-gray-500">
                      Mark if this work was done during your time at TreeHouse
                    </p>
                  </div>
                  <Switch
                    id="treeHouseAttribution"
                    checked={formData.treeHouseAttribution}
                    onCheckedChange={(checked) => handleInputChange('treeHouseAttribution', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Validation Summary */}
            {Object.keys(errors).length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please fix the following errors:
                  <ul className="mt-2 list-disc list-inside">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}