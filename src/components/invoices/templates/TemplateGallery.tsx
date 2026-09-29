"use client";

import { useFormContext } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { INVOICE_TEMPLATES } from "./templates/registry";
import { cn } from "@/lib/utils";

export function TemplateGallery() {
    const form = useFormContext();
    const selectedTemplate = form.watch("designSettings.template") || "classic";

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-sm font-medium">Template Gallery</h3>
                <div className="text-xs text-muted-foreground">
                    Select a layout to instantly update your preview and PDF.
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {INVOICE_TEMPLATES.map((template) => {
                    const isSelected = selectedTemplate === template.id;

                    return (
                        <div
                            key={template.id}
                            onClick={() => form.setValue("designSettings.template", template.id)}
                            className={cn(
                                "relative cursor-pointer rounded-xl border-2 transition-all overflow-hidden group hover:shadow-md",
                                isSelected ? "border-primary shadow-sm" : "border-border hover:border-primary/50"
                            )}
                        >
                            {/* Preview Thumbnail Area */}
                            <div className="aspect-[1/1.4] bg-muted/30 relative overflow-hidden border-b">
                                <img
                                    src={template.thumbnail}
                                    alt={template.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Template Metadata */}
                            <div className={cn(
                                "p-3 bg-background",
                                isSelected ? "bg-primary/5" : ""
                            )}>
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-sm font-semibold text-foreground">{template.name}</h4>
                                    {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                    {template.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}