import { useState } from "react";
import { FileUp, Loader2, ScanText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const API_BASE = "http://127.0.0.1:8000";

const UploadOcr = () => {
  const [file, setFile] = useState<File | null>(null);
  const [structuredData, setStructuredData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ========================
  // HANDLE FILE SELECT
  // ========================
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setStructuredData(null); // reset
  };

  // ========================
  // RUN OCR
  // ========================
  const runOcr = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/upload-fra-document`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("OCR failed");

      const data = await res.json();

      // ✅ ONLY structured data
      setStructuredData(data.structured_data || {});

    } catch (err) {
      console.error(err);
      alert("OCR failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Upload & OCR</h1>
        <p className="text-gray-500">
          Upload a PDF and extract structured claim data
        </p>
      </div>

      {/* UPLOAD CARD */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanText className="h-5 w-5" />
            Upload PDF
          </CardTitle>
          <CardDescription>Select a PDF file</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="file"
            accept="application/pdf"
            onChange={handleFile}
          />

          <Button onClick={runOcr} disabled={!file || loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FileUp className="h-4 w-4 mr-2" />
                Run OCR
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* STRUCTURED DATA OUTPUT */}
      <Card>
        <CardHeader>
          <CardTitle>Structured Data (JSON)</CardTitle>
          <CardDescription>
            Extracted data from OCR (auto-generated)
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Textarea
            value={
              structuredData
                ? JSON.stringify(structuredData, null, 2)
                : ""
            }
            readOnly
            rows={12}
            className="font-mono text-xs"
          />
        </CardContent>
      </Card>

    </div>
  );
};

export default UploadOcr;