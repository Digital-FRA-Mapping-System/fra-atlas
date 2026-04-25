import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const API_BASE = "http://127.0.0.1:8000";

interface Claim {
  id: number;
  claimant_name: string | null;
  fra_type: string | null;
  village: string | null;
  district: string | null;
  area_claimed: string | null;
  status: string;
  rejection_reason?: string;
}

const ClaimsReview = () => {
  const [records, setRecords] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [workflow, setWorkflow] = useState<any[]>([]);
  const [showWorkflow, setShowWorkflow] = useState<number | null>(null);

  // 🔹 Fetch claims
  const fetchClaims = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/claims`);
      const data = await res.json();
      const list = data.claims || data || [];
      setRecords(list);
    } catch {
      toast.error("Failed to load claims");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  // 🔹 Update status
  const updateStatus = async (id: number, status: string) => {
    try {
      const params = new URLSearchParams({ status });

      if (status === "rejected" && reason) {
        params.append("reason", reason);
      }

      await fetch(
        `${API_BASE}/update-claim-status/${id}?${params.toString()}`,
        { method: "PUT" }
      );

      toast.success(`Claim ${status}`);
      setSelectedId(null);
      setReason("");
      fetchClaims();
    } catch {
      toast.error("Update failed");
    }
  };

  // 🔹 Load workflow
  const loadWorkflow = async (id: number) => {
    setShowWorkflow(id);
    try {
      const res = await fetch(`${API_BASE}/claim-workflow/${id}`);
      const data = await res.json();
      setWorkflow(data.history || []);
    } catch {
      toast.error("Failed to load history");
    }
  };

  // 🔹 Status counts
  const statusCounts = records.reduce(
    (acc, r) => {
      const s = (r.status || "pending").toLowerCase();

      if (s === "approved") acc.approved++;
      else if (s === "rejected") acc.rejected++;
      else acc.pending++;

      return acc;
    },
    { pending: 0, approved: 0, rejected: 0 }
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Claims Review</h1>
        <p className="text-sm text-muted-foreground">
          Review and take action on submitted claims
        </p>
      </div>

      {/* 🔹 Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-muted-foreground uppercase mb-1">
            Pending
          </p>
          <p className="text-2xl font-bold text-yellow-600">
            {statusCounts.pending}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-muted-foreground uppercase mb-1">
            Approved
          </p>
          <p className="text-2xl font-bold text-green-600">
            {statusCounts.approved}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-muted-foreground uppercase mb-1">
            Rejected
          </p>
          <p className="text-2xl font-bold text-red-600">
            {statusCounts.rejected}
          </p>
        </div>
      </div>

      {/* 🔹 Claims Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Claims</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : records.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">
              No claims found
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Claimant</TableHead>
                  <TableHead>Village</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {records.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.claimant_name || "—"}</TableCell>
                    <TableCell>{r.village || "—"}</TableCell>
                    <TableCell>{r.district || "—"}</TableCell>
                    <TableCell>{r.area_claimed || "—"}</TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant={
                          r.status === "approved"
                            ? "default"
                            : r.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {r.status || "pending"}
                      </Badge>
                    </TableCell>

                    {/* Reason */}
                    <TableCell className="text-xs text-red-500">
                      {r.status === "rejected"
                        ? r.rejection_reason || "No reason"
                        : "—"}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          disabled={r.status === "approved"}
                          onClick={() => updateStatus(r.id, "approved")}
                        >
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={r.status === "rejected"}
                          onClick={() =>
                            setSelectedId(
                              selectedId === r.id ? null : r.id
                            )
                          }
                        >
                          Reject
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => loadWorkflow(r.id)}
                        >
                          History
                        </Button>
                      </div>

                      {/* Reject Input */}
                      {selectedId === r.id && (
                        <div className="mt-2 flex gap-2">
                          <Input
                            placeholder="Enter reason..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              updateStatus(r.id, "rejected")
                            }
                          >
                            Confirm
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* 🔹 Workflow History */}
      {showWorkflow && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              Workflow History (#{showWorkflow})
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {workflow.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No history found
              </p>
            ) : (
              workflow.map((w, i) => (
                <div
                  key={i}
                  className="border p-3 rounded-md text-sm"
                >
                  <div className="flex justify-between">
                    <b>{w.action}</b>
                    <span className="text-xs text-muted-foreground">
                      {w.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Stage: {w.stage}
                  </p>
                  <p className="text-xs mt-1">{w.remarks}</p>
                </div>
              ))
            )}

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowWorkflow(null)}
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClaimsReview;