import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Shield, Star, MapPin, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"customer" | "worker">("customer");

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="w-full bg-white/90 backdrop-blur-sm border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Briefcase className="text-white w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              WorkBridge
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
            <Button variant="hero" onClick={() => navigate("/register")}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Connect. Work. <span className="text-secondary">Earn.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            WorkBridge connects customers with skilled workers instantly. Post work, find verified professionals, and build trust in your community.
          </p>
          
          {/* Tab Selector */}
          <div className="flex bg-white rounded-xl p-2 max-w-md mx-auto mb-8 shadow-card">
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === "customer" 
                  ? "bg-primary text-white shadow-button" 
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => setActiveTab("customer")}
            >
              <Users className="w-4 h-4 inline mr-2" />
              I need work done
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === "worker" 
                  ? "bg-primary text-white shadow-button" 
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => setActiveTab("worker")}
            >
              <Briefcase className="w-4 h-4 inline mr-2" />
              I want to work
            </button>
          </div>

          {/* Customer View */}
          {activeTab === "customer" && (
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-card border-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-primary">Post Your Work</CardTitle>
                  <CardDescription>
                    Find verified skilled workers in your area instantly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      Set location
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4 text-secondary" />
                      Set your budget
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-warning" />
                      Choose timing
                    </div>
                  </div>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    onClick={() => navigate("/customer/post-work")}
                  >
                    <Briefcase className="w-5 h-5 mr-2" />
                    Post Work Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Worker View */}
          {activeTab === "worker" && (
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-card border-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-primary">Join as Worker</CardTitle>
                  <CardDescription>
                    Get verified, showcase your skills, and earn money
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <Badge variant="secondary" className="text-sm">
                      <Shield className="w-4 h-4 mr-1" />
                      ✅ Skill Verification Required
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Shield className="w-4 h-4 text-success" />
                      Take skill quiz
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Star className="w-4 h-4 text-warning" />
                      Build ratings
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4 text-secondary" />
                      Start earning
                    </div>
                  </div>
                  <Button 
                    variant="success" 
                    size="lg" 
                    className="w-full"
                    onClick={() => navigate("/worker/register")}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Register as Worker
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Choose WorkBridge?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card border-0 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Verified Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All workers pass skill verification quizzes to ensure quality work
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card border-0 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Instant Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  First verified worker who responds gets the job - fast and efficient
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card border-0 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-warning" />
                </div>
                <CardTitle className="text-xl">Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rating system and reporting features ensure a safe, trustworthy platform
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 WorkBridge. Created by <span className="font-semibold text-primary">Ranjith Theeti</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;