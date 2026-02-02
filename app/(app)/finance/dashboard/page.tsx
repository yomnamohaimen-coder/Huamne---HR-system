"use client";

import { getSession } from "@/lib/auth";
import { getFirstNameFromEmail, getGreeting } from "@/lib/utils";
import { PendingFinancialActionsCard } from "@/components/dashboard/pending-financial-actions-card";
import { PayrollStatusCard } from "@/components/dashboard/payroll-status-card";
import { PayrollImpactRequestsCard } from "@/components/dashboard/payroll-impact-requests-card";
import { PayrollOverviewCard } from "@/components/dashboard/payroll-overview-card";
import { AlertsCard } from "@/components/dashboard/alerts-card";
import { QuickActions } from "@/components/dashboard/quick-actions";

// Mock data - in real app, this would come from API
const MOCK_DATA = {
  // Pending financial actions
  pendingActionsCount: 5,
  pendingActionsState: "normal" as "empty" | "normal" | "error",
  previewItems: [
    "Payroll awaiting approval",
    "Benefit requests pending finance review",
    "Bonus adjustments to confirm",
    "Overtime payout review",
  ],
  
  // Payroll status
  payrollStatus: {
    cycleName: "March payroll",
    status: "Ready for review",
    cutoffDate: "Mar 25, 2026",
    payoutDate: "Mar 30, 2026",
    updatedAt: "Today, 11:20 AM",
    isEmpty: false,
  },
  
  // Payroll impact requests
  payrollImpactRequests: {
    benefits: 3,
    bonuses: 2,
    overtime: 1,
    state: "normal" as "normal" | "empty" | "error",
  },
  
  // Payroll overview
  payrollOverview: {
    totalAmount: "EGP 320,000",
    employeesCount: 48,
    changePercent: "+4%",
  },
  
  // Alerts
  alerts: {
    missingBankDetails: 2,
    failedPayrollItems: 1,
    state: "normal" as "normal" | "empty" | "error",
  },
};

export default function FinanceDashboard() {
  const session = getSession();
  
  if (!session) {
    return null;
  }

  const firstName = getFirstNameFromEmail(session.email);
  const greeting = getGreeting();

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of today's financial operations
        </p>
      </div>

      {/* Pending financial actions (PRIMARY, full width) */}
      <PendingFinancialActionsCard
        count={MOCK_DATA.pendingActionsCount}
        state={MOCK_DATA.pendingActionsState}
        previewItems={MOCK_DATA.previewItems}
      />

      {/* Payroll status & timeline + Requests affecting payroll (2-column on desktop) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PayrollStatusCard
          cycleName={MOCK_DATA.payrollStatus.cycleName}
          status={MOCK_DATA.payrollStatus.status}
          cutoffDate={MOCK_DATA.payrollStatus.cutoffDate}
          payoutDate={MOCK_DATA.payrollStatus.payoutDate}
          updatedAt={MOCK_DATA.payrollStatus.updatedAt}
          isEmpty={MOCK_DATA.payrollStatus.isEmpty}
        />
        <PayrollImpactRequestsCard
          benefits={MOCK_DATA.payrollImpactRequests.benefits}
          bonuses={MOCK_DATA.payrollImpactRequests.bonuses}
          overtime={MOCK_DATA.payrollImpactRequests.overtime}
          state={MOCK_DATA.payrollImpactRequests.state}
        />
      </div>

      {/* Payroll overview + Alerts & exceptions (2-column on desktop) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PayrollOverviewCard
          totalAmount={MOCK_DATA.payrollOverview.totalAmount}
          employeesCount={MOCK_DATA.payrollOverview.employeesCount}
          changePercent={MOCK_DATA.payrollOverview.changePercent}
        />
        <AlertsCard
          missingBankDetails={MOCK_DATA.alerts.missingBankDetails}
          failedPayrollItems={MOCK_DATA.alerts.failedPayrollItems}
          state={MOCK_DATA.alerts.state}
        />
      </div>

      {/* Quick actions (LOW PRIORITY, LAST) */}
      <QuickActions role="finance" />
    </div>
  );
}
