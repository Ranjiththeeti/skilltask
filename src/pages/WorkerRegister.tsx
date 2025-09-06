import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Phone, Camera, Shield, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const WorkerRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    skills: [] as string[],
    profilePhoto: null as File | null
  });

  const skillOptions = [
    "Painting", "Plumbing", "Cleaning", "Tutoring", "Cooking", 
    "Electrical Work", "Gardening", "Moving/Packing", "Repair Work", 
    "Carpentry", "Interior Design", "Photography"
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in your name and phone number",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStep === 2) {
      if (formData.skills.length === 0) {
        toast({
          title: "Select Skills",
          description: "Please select at least one skill to continue",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Register worker
      toast({
        title: "Registration Successful! 🎉",
        description: "Now take the skill verification quiz to get verified",
        variant: "default"
      });
      
      setTimeout(() => {
        navigate("/worker/quiz", { state: { skills: formData.skills } });
      }, 2000);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePhoto: file }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="w-full bg-white/90 backdrop-blur-sm border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Worker Registration
            </h1>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep ? "bg-primary text-white" : "bg-gray-200 text-gray-400"
                }`}>
                  {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 3 && <div className={`w-16 h-1 ${step < currentStep ? "bg-primary" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary flex items-center justify-center gap-2">
                  <User className="w-6 h-6" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Let's start with your basic details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <Button onClick={handleNext} variant="hero" size="lg" className="w-full">
                  Continue to Skills
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Skills Selection */}
          {currentStep === 2 && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary flex items-center justify-center gap-2">
                  <Shield className="w-6 h-6" />
                  Select Your Skills
                </CardTitle>
                <CardDescription>
                  Choose the skills you want to offer (you'll need to verify these)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skillOptions.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={formData.skills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <Label
                        htmlFor={skill}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>

                {formData.skills.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Selected Skills:</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button onClick={handleNext} variant="hero" size="lg" className="w-full">
                  Continue to Photo
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Profile Photo */}
          {currentStep === 3 && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary flex items-center justify-center gap-2">
                  <Camera className="w-6 h-6" />
                  Profile Photo
                </CardTitle>
                <CardDescription>
                  Add a profile photo to build trust with customers (optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    {formData.profilePhoto ? (
                      <img 
                        src={URL.createObjectURL(formData.profilePhoto)} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button variant="outline" asChild>
                    <label htmlFor="photo" className="cursor-pointer">
                      <Camera className="w-4 h-4 mr-2" />
                      {formData.profilePhoto ? "Change Photo" : "Upload Photo"}
                    </label>
                  </Button>
                </div>

                <div className="bg-accent/50 p-4 rounded-lg">
                  <h3 className="font-medium text-primary mb-2">Registration Summary:</h3>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Skills:</strong> {formData.skills.join(", ")}</p>
                </div>

                <Button onClick={handleNext} variant="success" size="lg" className="w-full">
                  <Shield className="w-5 h-5 mr-2" />
                  Complete Registration
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerRegister;