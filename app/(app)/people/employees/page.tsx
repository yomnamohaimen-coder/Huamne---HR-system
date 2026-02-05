"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Edit, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Generate mock employee data
const generateMockEmployees = (count: number) => {
  const firstNames = [
    "Yomna", "Ahmed", "Sarah", "Omar", "Mona", "Khaled", "Nour", "Layla", "Tarek", "Dina",
    "Mohamed", "Fatima", "Ali", "Aya", "Hassan", "Mariam", "Youssef", "Nada", "Karim", "Rania",
    "Amr", "Salma", "Mahmoud", "Lina", "Omar", "Nour", "Ahmed", "Heba", "Tamer", "Yasmin",
    "Waleed", "Dina", "Hany", "Reem", "Sherif", "Noha", "Amir", "Sara", "Bassem", "Mai",
  ];
  const lastNames = [
    "Employee", "Hassan", "Mohamed", "Ali", "Ibrahim", "Mostafa", "El-Din", "Ahmed", "Youssef", "Farid",
    "Khalil", "Nasser", "Said", "Fouad", "Rizk", "Gaber", "Soliman", "Attia", "Hamdy", "Zaki",
    "Eid", "Mansour", "Salem", "Adel", "Fahmy", "Hegazy", "Metwally", "Osman", "Shawky", "Taha",
  ];
  const jobTitles = [
    "Software Engineer", "Senior Developer", "HR Manager", "Financial Analyst", "Product Designer",
    "Marketing Specialist", "Junior Developer", "Operations Manager", "Sales Executive", "Content Writer",
    "Project Manager", "Data Analyst", "UX Designer", "Business Analyst", "QA Engineer",
    "DevOps Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "System Administrator",
  ];
  const departments = [
    "Engineering", "Human Resources", "Finance", "Design", "Marketing",
    "Operations", "Sales", "IT", "Customer Support", "Product",
  ];
  const employmentTypes = ["full time", "part time", "contract", "intern"] as const;
  const statuses = ["active", "on leave"] as const;
  const managers = [
    "Ahmed Hassan", "Sarah Mohamed", "Omar Ali", "Layla Ahmed", "Tarek Youssef",
    "Mohamed Khalil", "Fatima Nasser", "Ali Said", "Aya Fouad", "Hassan Rizk",
  ];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return {
      id: `EMP${String(i + 1).padStart(3, "0")}`,
      name: `${firstName} ${lastName}`,
      jobTitle: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      employmentType: employmentTypes[Math.floor(Math.random() * employmentTypes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      manager: managers[Math.floor(Math.random() * managers.length)],
    };
  });
};

// Generate initial large dataset
const ALL_EMPLOYEES = generateMockEmployees(100);

// Generate avatar URL using UI Avatars service with subtle colors
const getAvatarUrl = (name: string) => {
  // Use a subtle color palette (pastel colors)
  const subtleColors = [
    "e3f2fd", // Light blue
    "f3e5f5", // Light purple
    "e8f5e9", // Light green
    "fff3e0", // Light orange
    "fce4ec", // Light pink
    "e0f2f1", // Light teal
    "f1f8e9", // Light lime
    "ede7f6", // Light indigo
    "e8eaf6", // Light blue-gray
    "fff9c4", // Light yellow
  ];
  
  // Use name hash to consistently assign colors
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % subtleColors.length;
  const backgroundColor = subtleColors[colorIndex];
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${backgroundColor}&color=374151&size=128&bold=false`;
};

// Get initials for fallback
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [displayedCount, setDisplayedCount] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Filter employees based on search query (ID, Name, or Department)
  const filteredEmployees = useMemo(() => {
    let employees = ALL_EMPLOYEES;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      employees = ALL_EMPLOYEES.filter((employee) => {
        return (
          employee.id.toLowerCase().includes(query) ||
          employee.name.toLowerCase().includes(query) ||
          employee.department.toLowerCase().includes(query)
        );
      });
    }
    
    return employees;
  }, [searchQuery]);

  // Sort employees based on selected sort option
  const sortedEmployees = useMemo(() => {
    const sorted = [...filteredEmployees];
    
    switch (sortBy) {
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "id":
        sorted.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case "department":
        sorted.sort((a, b) => a.department.localeCompare(b.department));
        break;
      case "jobTitle":
        sorted.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
        break;
      case "status":
        sorted.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }
    
    return sorted;
  }, [filteredEmployees, sortBy]);

  // Get employees to display (for infinite scroll)
  const displayedEmployees = useMemo(() => {
    return sortedEmployees.slice(0, displayedCount);
  }, [sortedEmployees, displayedCount]);

  // Load more employees
  const loadMore = useCallback(() => {
    if (isLoading || displayedCount >= sortedEmployees.length) return;
    
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setDisplayedCount((prev) => Math.min(prev + 20, sortedEmployees.length));
      setIsLoading(false);
    }, 300);
  }, [isLoading, displayedCount, sortedEmployees.length]);

  // Handle scroll event for infinite scroll
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Load more when user is 200px from bottom
      if (scrollHeight - scrollTop - clientHeight < 200) {
        loadMore();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  // Reset displayed count when search or sort changes
  useEffect(() => {
    setDisplayedCount(20);
  }, [searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground">Manage employee profiles and information</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Employees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search, Sort, and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees by name, ID, or department..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Sort By Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="department">Department</SelectItem>
                <SelectItem value="jobTitle">Job Title</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>

            {/* Filters Button */}
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Table Container with Fixed Height */}
          <div
            ref={tableContainerRef}
            className="relative max-h-[600px] overflow-y-auto border rounded-md"
          >
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Employment Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No employees found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-mono text-sm">{employee.id}</TableCell>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={getAvatarUrl(employee.name)}
                        alt={employee.name}
                      />
                      <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.jobTitle}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.manager}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {employee.employmentType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={employee.status === "active" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          // Handle view action
                          console.log("View employee:", employee.id);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          // Handle edit action
                          console.log("Edit employee:", employee.id);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <p className="text-sm text-muted-foreground">Loading more employees...</p>
              </div>
            )}
            
            {/* End of list indicator */}
            {!isLoading && displayedCount >= sortedEmployees.length && sortedEmployees.length > 0 && (
              <div className="flex items-center justify-center py-4">
                <p className="text-sm text-muted-foreground">
                  Showing all {sortedEmployees.length} employees
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filter Modal */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="right" className="w-[360px]">
          <SheetHeader>
            <SheetTitle>Filter Employees</SheetTitle>
            <SheetDescription>
              Apply filters to narrow down the employee list
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {/* Filter options will be added here */}
            <p className="text-sm text-muted-foreground">
              Filter options will be available here
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
