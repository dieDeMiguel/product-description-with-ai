import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MaintenanceCard = () => {
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <Card className="max-w-md w-full text-start">
        <CardHeader>
          <CardTitle>Maintenance Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-500">
            Our site is currently undergoing maintenance. Please check back
            later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceCard;
