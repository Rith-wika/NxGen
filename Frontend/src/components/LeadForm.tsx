import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const LeadForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement form submission logic here
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={cn(
          "bg-white/10 border-white text-white placeholder:text-white/70",
          "focus:bg-white/20 focus:border-accent",
          "h-12 text-lg"
        )}
      />
      <Input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className={cn(
          "bg-white/10 border-white text-white placeholder:text-white/70",
          "focus:bg-white/20 focus:border-accent",
          "h-12 text-lg"
        )}
      />
      <Button 
        type="submit" 
        variant="hero"
        size="xl"
        disabled={loading}
        className="w-full sm:w-auto whitespace-nowrap"
      >
        Get Started
      </Button>
    </form>
  );
};

export default LeadForm;