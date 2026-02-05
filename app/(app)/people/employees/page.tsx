"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Edit, Search, Filter, X, Upload, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const statuses = ["active", "on leave", "terminated"] as const;
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
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [autoGenerateId, setAutoGenerateId] = useState(true);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Form state for Step 1
  const [step1Data, setStep1Data] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    profilePhoto: null as File | null,
  });

  // Filter state
  const [filters, setFilters] = useState({
    department: [] as string[],
    employmentType: [] as string[],
    status: [] as string[],
  });

  // Get unique departments
  const uniqueDepartments = useMemo(() => {
    const depts = Array.from(new Set(ALL_EMPLOYEES.map(e => e.department)));
    return depts.sort();
  }, []);

  // Calculate filter counts
  const filterCounts = useMemo(() => {
    const deptCounts: Record<string, number> = {};
    uniqueDepartments.forEach(dept => {
      deptCounts[dept] = ALL_EMPLOYEES.filter(e => e.department === dept).length;
    });

    return {
      department: deptCounts,
      employmentType: {
        "full time": ALL_EMPLOYEES.filter(e => e.employmentType === "full time").length,
        "part time": ALL_EMPLOYEES.filter(e => e.employmentType === "part time").length,
        contract: ALL_EMPLOYEES.filter(e => e.employmentType === "contract").length,
        intern: ALL_EMPLOYEES.filter(e => e.employmentType === "intern").length,
      },
      status: {
        active: ALL_EMPLOYEES.filter(e => e.status === "active").length,
        "on leave": ALL_EMPLOYEES.filter(e => e.status === "on leave").length,
        terminated: ALL_EMPLOYEES.filter(e => e.status === "terminated").length,
      },
    };
  }, [uniqueDepartments]);

  // Filter employees based on search query and filters
  const filteredEmployees = useMemo(() => {
    let employees = ALL_EMPLOYEES;
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      employees = employees.filter((employee) => {
        return (
          employee.id.toLowerCase().includes(query) ||
          employee.name.toLowerCase().includes(query) ||
          employee.department.toLowerCase().includes(query)
        );
      });
    }
    
    // Department filter
    if (filters.department.length > 0) {
      employees = employees.filter(e => filters.department.includes(e.department));
    }
    
    // Employment type filter
    if (filters.employmentType.length > 0) {
      employees = employees.filter(e => filters.employmentType.includes(e.employmentType));
    }
    
    // Status filter
    if (filters.status.length > 0) {
      employees = employees.filter(e => filters.status.includes(e.status));
    }
    
    return employees;
  }, [searchQuery, filters, uniqueDepartments]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    return filters.department.length + filters.employmentType.length + filters.status.length;
  }, [filters]);

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

  // Reset displayed count when search, sort, or filters change
  useEffect(() => {
    setDisplayedCount(20);
  }, [searchQuery, sortBy, filters]);

  // Toggle filter helper
  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      department: [],
      employmentType: [],
      status: [],
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground">Manage employee profiles and information</p>
        </div>
        <Button onClick={() => setIsAddEmployeeOpen(true)}>
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
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto relative">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge 
                      variant="default" 
                      className="ml-2 h-5 min-w-5 px-1.5 text-xs"
                    >
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">Filter Employees</h4>
                    {activeFilterCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={clearFilters}
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  <Separator />

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Status</Label>
                    <div className="space-y-2">
                      {(["active", "on leave", "terminated"] as const).map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={`status-${status}`}
                            checked={filters.status.includes(status)}
                            onCheckedChange={() => toggleFilter("status", status)}
                          />
                          <Label
                            htmlFor={`status-${status}`}
                            className="text-sm font-normal cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span className="capitalize">{status}</span>
                            <span className="text-muted-foreground text-xs">
                              ({filterCounts.status[status]})
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Employment Type Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Employment Type</Label>
                    <div className="space-y-2">
                      {(["full time", "part time", "contract", "intern"] as const).map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={filters.employmentType.includes(type)}
                            onCheckedChange={() => toggleFilter("employmentType", type)}
                          />
                          <Label
                            htmlFor={`type-${type}`}
                            className="text-sm font-normal cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span className="capitalize">{type}</span>
                            <span className="text-muted-foreground text-xs">
                              ({filterCounts.employmentType[type]})
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Department Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Department</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {uniqueDepartments.map((dept) => (
                        <div key={dept} className="flex items-center space-x-2">
                          <Checkbox
                            id={`dept-${dept}`}
                            checked={filters.department.includes(dept)}
                            onCheckedChange={() => toggleFilter("department", dept)}
                          />
                          <Label
                            htmlFor={`dept-${dept}`}
                            className="text-sm font-normal cursor-pointer flex-1 flex items-center justify-between"
                          >
                            <span>{dept}</span>
                            <span className="text-muted-foreground text-xs">
                              ({filterCounts.department[dept] || 0})
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Table Container with Fixed Height */}
          <div
            ref={tableContainerRef}
            className="relative h-[600px] overflow-y-auto border rounded-md"
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

      {/* Add Employee Modal */}
      <Dialog 
        open={isAddEmployeeOpen} 
        onOpenChange={(open) => {
          setIsAddEmployeeOpen(open);
          if (open) {
            // Generate ID when modal opens if auto-generate is enabled
            if (autoGenerateId) {
              const nextId = `EMP${String(ALL_EMPLOYEES.length + 1).padStart(3, "0")}`;
              setStep1Data({
                firstName: "",
                lastName: "",
                employeeId: nextId,
                email: "",
                phoneNumber: "",
                profilePhoto: null,
              });
            }
          } else {
            setCurrentStep(1);
            setAutoGenerateId(true);
            setStep1Data({
              firstName: "",
              lastName: "",
              employeeId: "",
              email: "",
              phoneNumber: "",
              profilePhoto: null,
            });
          }
        }}
      >
        <DialogContent className="w-[640px] max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4">
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>

          {/* Step Indicator */}
          <div className="flex-shrink-0 px-6 pb-6">
            <div className="flex items-center justify-between">
              {/* Step 1 */}
              <div className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= 1
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {currentStep > 1 ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      "1"
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      currentStep >= 1
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    Basic Information
                  </span>
                </div>
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    currentStep > 1 ? "bg-primary" : "bg-muted"
                  }`}
                />
              </div>

              {/* Step 2 */}
              <div className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= 2
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {currentStep > 2 ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      "2"
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      currentStep >= 2
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    Job Details
                  </span>
                </div>
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    currentStep > 2 ? "bg-primary" : "bg-muted"
                  }`}
                />
              </div>

              {/* Step 3 */}
              <div className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= 3
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    3
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      currentStep >= 3
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    Employment Details
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      {/* First Name */}
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          First Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Enter first name"
                          value={step1Data.firstName}
                          onChange={(e) =>
                            setStep1Data({ ...step1Data, firstName: e.target.value })
                          }
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          Last Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Enter last name"
                          value={step1Data.lastName}
                          onChange={(e) =>
                            setStep1Data({ ...step1Data, lastName: e.target.value })
                          }
                          required
                        />
                      </div>

                      {/* Employee ID */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="employeeId">
                            Employee ID <span className="text-destructive">*</span>
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="autoGenerateId"
                              checked={autoGenerateId}
                              onCheckedChange={(checked) => {
                                const isChecked = checked as boolean;
                                setAutoGenerateId(isChecked);
                                if (isChecked) {
                                  // Auto-generate ID based on total employees
                                  const nextId = `EMP${String(ALL_EMPLOYEES.length + 1).padStart(3, "0")}`;
                                  setStep1Data({ ...step1Data, employeeId: nextId });
                                } else {
                                  setStep1Data({ ...step1Data, employeeId: "" });
                                }
                              }}
                            />
                            <Label
                              htmlFor="autoGenerateId"
                              className="text-sm font-normal cursor-pointer"
                            >
                              Auto-generate
                            </Label>
                          </div>
                        </div>
                        <Input
                          id="employeeId"
                          placeholder="Enter employee ID"
                          value={step1Data.employeeId}
                          onChange={(e) =>
                            setStep1Data({ ...step1Data, employeeId: e.target.value })
                          }
                          disabled={autoGenerateId}
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                          value={step1Data.email}
                          onChange={(e) =>
                            setStep1Data({ ...step1Data, email: e.target.value })
                          }
                          required
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="Enter phone number"
                          value={step1Data.phoneNumber}
                          onChange={(e) =>
                            setStep1Data({ ...step1Data, phoneNumber: e.target.value })
                          }
                        />
                      </div>

                      {/* Profile Photo */}
                      <div className="space-y-2">
                        <Label>Profile Photo</Label>
                        <div className="flex items-center gap-4">
                          {step1Data.profilePhoto ? (
                            <div className="flex items-center gap-4">
                              <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-border">
                                <img
                                  src={URL.createObjectURL(step1Data.profilePhoto)}
                                  alt="Profile preview"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <p className="text-sm text-muted-foreground">
                                  {step1Data.profilePhoto.name}
                                </p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setStep1Data({ ...step1Data, profilePhoto: null })}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <label
                              htmlFor="profilePhoto"
                              className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-muted-foreground/25 rounded-full cursor-pointer hover:border-muted-foreground/50 transition-colors"
                            >
                              <User className="h-8 w-8 text-muted-foreground" />
                              <input
                                id="profilePhoto"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setStep1Data({ ...step1Data, profilePhoto: file });
                                  }
                                }}
                              />
                            </label>
                          )}
                          {!step1Data.profilePhoto && (
                            <div className="flex flex-col gap-1">
                              <p className="text-sm text-muted-foreground">
                                Upload a photo or add later
                              </p>
                              <label htmlFor="profilePhoto">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="cursor-pointer"
                                  asChild
                                >
                                  <span>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Photo
                                  </span>
                                </Button>
                              </label>
                              <input
                                id="profilePhoto"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setStep1Data({ ...step1Data, profilePhoto: file });
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Step 2: Job Details
                  </p>
                  {/* Step 2 content will go here */}
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Step 3: Employment Details
                  </p>
                  {/* Step 3 content will go here */}
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer - Fixed */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 pt-6 pb-6 border-t">
            <Button
              variant="outline"
              onClick={() => {
                if (currentStep > 1) {
                  setCurrentStep(currentStep - 1);
                } else {
                  setIsAddEmployeeOpen(false);
                  setCurrentStep(1);
                }
              }}
            >
              {currentStep > 1 ? "Previous" : "Cancel"}
            </Button>
            <Button
              onClick={() => {
                if (currentStep < 3) {
                  setCurrentStep(currentStep + 1);
                } else {
                  // Handle form submission
                  setIsAddEmployeeOpen(false);
                  setCurrentStep(1);
                }
              }}
            >
              {currentStep < 3 ? "Next" : "Submit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
