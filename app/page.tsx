'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const App: React.FC = () => {
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [uploadProgress, setUploadProgress] = useState(0);
const [searchQuery, setSearchQuery] = useState('');
const documents = [
{
id: 1,
name: 'Climate Action Strategy 2025.pdf',
date: '2025-03-05',
status: 'Processed',
relevantSDGs: [13, 7, 11]
},
{
id: 2,
name: 'Sustainable Agriculture Report.docx',
date: '2025-03-04',
status: 'Processing',
relevantSDGs: [2, 15]
},
{
id: 3,
name: 'Gender Equality Initiative.pdf',
date: '2025-03-03',
status: 'Processed',
relevantSDGs: [5, 10]
}
];
const handleDrop = (e: React.DragEvent) => {
e.preventDefault();
const file = e.dataTransfer.files[0];
setSelectedFile(file);
simulateUpload();
};
const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
if (e.target.files) {
setSelectedFile(e.target.files[0]);
simulateUpload();
}
};
const simulateUpload = () => {
setUploadProgress(0);
const interval = setInterval(() => {
setUploadProgress(prev => {
if (prev >= 100) {
clearInterval(interval);
return 100;
}
return prev + 10;
});
}, 500);
};
return (
<div className="min-h-screen bg-gray-50">
{/* Header */}
<header className="bg-white border-b border-gray-200">
<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
<div className="flex items-center space-x-4">
<img
src="https://public.readdy.ai/ai/img_res/5e1df670ea32ec3c4d9629d31198535a.jpg"
alt="Logo"
className="h-8"
/>
<nav className="hidden md:flex space-x-8">
<Button variant="ghost" className="!rounded-button">Upload</Button>
<Button variant="ghost" className="!rounded-button">Documents</Button>
<Button variant="ghost" className="!rounded-button">Analysis</Button>
<Button variant="ghost" className="!rounded-button">SDG Guide</Button>
</nav>
</div>
<Avatar className="cursor-pointer">
<img src="https://public.readdy.ai/ai/img_res/d87c88a9f8e23697fce89a35f8415083.jpg" alt="User" />
</Avatar>
</div>
</header>
<main className="max-w-7xl mx-auto px-4 py-8">
{/* Document Management */}
<div className="mt-12">
<h2 className="text-2xl font-bold mb-6">Your Documents</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
{documents.map(doc => (
<Card key={doc.id} className="p-4">
<div className="flex items-start justify-between">
<div>
<i className="far fa-file-pdf text-2xl text-blue-500 mb-2"></i>
<h3 className="font-medium">{doc.name}</h3>
<p className="text-sm text-gray-500">{doc.date}</p>
<div className="mt-2 flex flex-wrap gap-2">
{doc.relevantSDGs.map(sdg => (
<Badge key={sdg} variant="secondary">SDG {sdg}</Badge>
))}
</div>
</div>
<Button variant="ghost" size="icon" className="!rounded-button">
<i className="fas fa-ellipsis-v"></i>
</Button>
</div>
<div className="mt-4 flex justify-between items-center">
<Badge variant="outline">{doc.status}</Badge>
<div className="flex space-x-2">
<Button size="sm" variant="outline" className="!rounded-button">
<i className="fas fa-chart-bar mr-2"></i>Analyze
</Button>
<Button size="sm" variant="outline" className="!rounded-button">
<i className="fas fa-share-alt mr-2"></i>Share
</Button>
</div>
</div>
</Card>
))}
</div>
{/* Upload Area */}
<div
className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer h-full flex flex-col justify-center"
onDrop={handleDrop}
onDragOver={(e) => e.preventDefault()}
>
<div className="mx-auto w-16 h-16 text-gray-400 mb-4">
<i className="fas fa-cloud-upload-alt text-4xl"></i>
</div>
<h3 className="text-lg font-semibold mb-2">Drag and drop your documents here</h3>
<p className="text-gray-500 mb-4">or</p>
<Input
type="file"
className="hidden"
id="file-upload"
onChange={handleFileSelect}
/>
<label htmlFor="file-upload">
<Button className="!rounded-button">Browse Files</Button>
</label>
<p className="mt-4 text-sm text-gray-500">Supported formats: PDF, DOCX, TXT (Max 50MB)</p>
{uploadProgress > 0 && (
<div className="mt-6">
<Progress value={uploadProgress} className="w-full" />
<p className="mt-2 text-sm text-gray-600">Uploading... {uploadProgress}%</p>
</div>
)}
</div>
</div>
</div>
{/* Analysis Section */}
<div className="mt-12">
<h2 className="text-2xl font-bold mb-6">SDG Analysis</h2>
<div className="flex space-x-4 mb-6">
<div className="flex-1">
<Input
type="text"
placeholder="Ask questions about your documents..."
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="w-full"
/>
</div>
<Button className="!rounded-button">
<i className="fas fa-search mr-2"></i>Analyze
</Button>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<Card className="p-4">
<h3 className="font-semibold mb-4">Document Content</h3>
<ScrollArea className="h-[400px]">
<div className="p-4">
<p className="text-gray-700">
Our organization's commitment to sustainable development spans multiple areas...
[Document content with highlighted relevant sections would appear here]
</p>
</div>
</ScrollArea>
</Card>
<Card className="p-4">
<h3 className="font-semibold mb-4">SDG Alignment Analysis</h3>
<ScrollArea className="h-[400px]">
<div className="space-y-4">
{[13, 7, 11].map(sdg => (
<div key={sdg} className="p-4 bg-gray-50 rounded-lg">
<div className="flex items-center justify-between mb-2">
<h4 className="font-medium">SDG {sdg}</h4>
<Badge variant="secondary">High Relevance</Badge>
</div>
<Progress value={85} className="mb-2" />
<p className="text-sm text-gray-600">
Strong alignment with climate action initiatives and renewable energy goals.
</p>
</div>
))}
</div>
</ScrollArea>
</Card>
</div>
</div>
</main>
</div>
);
};
export default App
