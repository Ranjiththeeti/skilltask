import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, Briefcase, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CustomerPostWork = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    workType: "",
    description: "",
    salary: "",
    salaryType: "fixed",
    location: "",
    date: "",
    time: ""
  });

  const workTypes = [
    "Painting", "Plumbing", "Cleaning", "Tutoring", "Cooking", 
    "Electrical Work", "Gardening", "Moving/Packing", "Repair Work", "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.workType || !formData.description || !formData.salary || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here would be the API call to post work
    toast({
      title: "Work Posted Successfully! 🎉",
      description: "Notifying verified workers in your area...",
      variant: "default"
    });

    // Navigate back to dashboard
    setTimeout(() => {
      navigate("/customer/dashboard");
    }, 2000);
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
              <Briefcase className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              WorkBridge
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary flex items-center justify-center gap-2">
                <Briefcase className="w-6 h-6" />
                Post Your Work
              </CardTitle>
              <CardDescription>
                Fill in the details and get connected with verified workers instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Work Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor="workType" className="text-sm font-medium flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Work Type *
                  </Label>
                  <Select value={formData.workType} onValueChange={(value) => setFormData({...formData, workType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type of work needed" />
                    </SelectTrigger>
                    <SelectContent>
                      {workTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Work Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Work Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the work you need done in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Salary Section */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-secondary" />
                    Payment Details *
                  </Label>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                        formData.salaryType === "fixed" 
                          ? "bg-primary text-white border-primary" 
                          : "border-input hover:border-primary"
                      }`}
                      onClick={() => setFormData({...formData, salaryType: "fixed"})}
                    >
                      Fixed Amount
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                        formData.salaryType === "negotiable" 
                          ? "bg-primary text-white border-primary" 
                          : "border-input hover:border-primary"
                      }`}
                      onClick={() => setFormData({...formData, salaryType: "negotiable"})}
                    >
                      Negotiable
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl">₹</span>
                    <Input
                      placeholder="Enter amount"
                      value={formData.salary}
                      onChange={(e) => setFormData({...formData, salary: e.target.value})}
                      className="flex-1"
                    />
                    {formData.salaryType === "negotiable" && (
                      <Badge variant="secondary" className="text-xs">Negotiable</Badge>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Location/Address *
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter your address or area"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-warning" />
                      Preferred Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium">
                      Preferred Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  <Send className="w-5 h-5 mr-2" />
                  Post Work & Notify Workers
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Your work will be instantly shared with verified workers in your area. 
                  The first worker to respond gets the job!
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerPostWork;