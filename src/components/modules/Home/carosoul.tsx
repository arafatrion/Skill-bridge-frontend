import { Star, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function TutorCard() {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-lg text-slate-900">John Doe</h3>
                <CheckCircle className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-sm text-slate-500 font-medium">Mathematics Expert</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary font-bold text-lg">$25<span className="text-xs text-slate-500 font-normal">/hr</span></p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 py-2 space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="font-normal text-xs">Algebra</Badge>
          <Badge variant="secondary" className="font-normal text-xs">Calculus</Badge>
          <Badge variant="secondary" className="font-normal text-xs">Geometry</Badge>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2 italic">
          "Helping students conquer complex math problems with easy-to-understand techniques..."
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-slate-700">4.9</span> (120 Reviews)
          </div>
          <div className="flex items-center gap-1 text-xs">
            <MapPin className="h-3 w-3" /> Online
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-2">
        <Button className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  );
}