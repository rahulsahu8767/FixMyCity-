import { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Upload, Camera, MapPin, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

export function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    digiPin: "",
    location: "",
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    "Road & Infrastructure",
    "Waste Management",
    "Water Supply",
    "Street Lighting",
    "Public Safety",
    "Parks & Recreation",
    "Traffic Issues",
    "Noise Pollution",
    "Building Violations",
    "Other"
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files].slice(0, 3); // Limit to 3 images
    setImages(newImages);
    
    // Create previews
    const newPreviews = newImages.map(file => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const generateDescription = async () => {
    if (!formData.category || images.length === 0) {
      alert("Please select a category and upload at least one image to generate description");
      return;
    }
    
    setIsGeneratingDescription(true);
    
    // Simulate AI description generation
    setTimeout(() => {
      const descriptions = {
        "Road & Infrastructure": "Pothole observed on main road causing traffic disruption. The damaged asphalt surface poses safety risks for vehicles and pedestrians. Immediate repair required to prevent further deterioration.",
        "Waste Management": "Overflowing garbage bin in residential area creating unsanitary conditions. Waste spillage attracting pests and causing foul odor. Regular collection schedule needs to be maintained.",
        "Water Supply": "Water leakage detected in the pipeline causing wastage and potential structural damage. Immediate attention required to prevent further water loss and property damage.",
        "Street Lighting": "Non-functional street light creating safety hazard during nighttime. Poor visibility affecting pedestrian and vehicle safety. Replacement or repair needed urgently.",
        "Public Safety": "Safety concern identified requiring immediate attention from relevant authorities. Proper measures needed to ensure public welfare and security.",
        "default": "Issue requiring civic attention and proper resolution. The situation needs assessment and appropriate action from relevant municipal authorities."
      };
      
      const generatedDesc = descriptions[formData.category as keyof typeof descriptions] || descriptions.default;
      setFormData(prev => ({ ...prev, description: generatedDesc }));
      setIsGeneratingDescription(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.digiPin) {
      alert("DIGIPIN is mandatory for submission");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", { ...formData, images });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          title: "",
          category: "",
          description: "",
          digiPin: "",
          location: "",
        });
        setImages([]);
        setImagePreviews([]);
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  if (submitSuccess) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Card className="border-success/20 bg-success/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-success mb-2">Issue Reported Successfully!</h2>
              <p className="text-muted-foreground mb-4">
                Your civic issue has been submitted and will be reviewed by the authorities.
              </p>
              <Badge variant="outline" className="text-success border-success">
                Report ID: CR-{Date.now().toString().slice(-6)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-civic-blue to-civic-green bg-clip-text text-transparent mb-4">
          Report a Civic Issue
        </h1>
        <p className="text-xl text-muted-foreground">
          Help make your community better by reporting issues that need attention
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-civic-blue" />
            Issue Details
          </CardTitle>
          <CardDescription>
            Provide detailed information about the civic issue you want to report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief title for the issue"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location and DIGIPIN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Street address or landmark"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="digiPin">DIGIPIN *</Label>
                <Input
                  id="digiPin"
                  placeholder="Enter your DIGIPIN"
                  value={formData.digiPin}
                  onChange={(e) => setFormData(prev => ({ ...prev, digiPin: e.target.value }))}
                  required
                  className="border-civic-blue/50 focus:border-civic-blue"
                />
                <p className="text-xs text-muted-foreground">
                  DIGIPIN is mandatory for verification
                </p>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <Label>Upload Images (Max 3)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Upload photos of the issue to help authorities understand the problem better
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={images.length >= 3}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Images
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
              
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Description *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateDescription}
                  disabled={isGeneratingDescription || !formData.category || images.length === 0}
                  className="text-civic-purple hover:text-civic-purple"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isGeneratingDescription ? "Generating..." : "AI Generate"}
                </Button>
              </div>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={6}
                className="resize-none"
              />
            </div>

            {/* Alert for DIGIPIN */}
            <Alert className="border-civic-blue/50 bg-civic-blue/5">
              <MapPin className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> DIGIPIN is mandatory for all submissions. This helps us verify the authenticity of reports and prevent spam.
              </AlertDescription>
            </Alert>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-civic-blue to-civic-green hover:from-civic-blue/90 hover:to-civic-green/90 text-white font-semibold py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting Report..." : "Submit Issue Report"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
