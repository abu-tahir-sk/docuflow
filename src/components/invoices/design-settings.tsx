// "use client"

// import { useFormContext } from "react-hook-form"
// import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Slider } from "@/components/ui/slider"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"

// const PRESET_COLORS = [
//   { name: "Blue", hex: "#2563EB" },
//   { name: "Indigo", hex: "#4F46E5" },
//   { name: "Emerald", hex: "#059669" },
//   { name: "Slate", hex: "#475569" },
//   { name: "Purple", hex: "#7C3AED" },
//   { name: "Rose", hex: "#E11D48" },
// ]

// export function DesignSettingsForm() {
//   const form = useFormContext()

//   return (
//     <div className="space-y-6">
//       {/* TEMPLATE */}
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium border-b pb-2">Template</h3>
//         <FormField
//           control={form.control}
//           name="template"
//           render={({ field }) => (
//             <FormItem>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 {["classic", "modern", "minimal", "corporate", "executive", "elegant", "professional", "bold", "letterhead", "compact"].map((t) => (
//                   <div
//                     key={t}
//                     onClick={() => field.onChange(t)}
//                     className={cn(
//                       "cursor-pointer rounded-md border-2 p-3 text-center text-xs font-medium capitalize transition-all hover:border-primary/50",
//                       field.value === t ? "border-primary bg-primary/5 text-primary" : "border-muted"
//                     )}
//                   >
//                     {t}
//                   </div>
//                 ))}
//               </div>
//             </FormItem>
//           )}
//         />
//       </div>

//       <Accordion className="w-full">
//         {/* BRANDING */}
//         <AccordionItem value="branding" className="border-b-0">
//           <AccordionTrigger className="hover:no-underline text-sm font-medium border-b pb-2 mb-4">Branding</AccordionTrigger>
//           <AccordionContent className="space-y-4 pt-2">
//             <p className="text-xs text-muted-foreground mb-4">Upload Logo, Signature, and Seal in your Company Settings.</p>
//             <FormField
//               control={form.control}
//               name="designSettings.layout.logoPosition"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Logo Position</FormLabel>
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <FormControl>
//                       <SelectTrigger><SelectValue /></SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="LEFT">Left Align</SelectItem>
//                       <SelectItem value="CENTER">Center Align</SelectItem>
//                       <SelectItem value="RIGHT">Right Align</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />
//           </AccordionContent>
//         </AccordionItem>

//         {/* COLORS */}
//         <AccordionItem value="colors" className="border-b-0">
//           <AccordionTrigger className="hover:no-underline text-sm font-medium border-b pb-2 mb-4">Colors</AccordionTrigger>
//           <AccordionContent className="space-y-6 pt-2">
//             {/* Preset Colors for Primary */}
//             <div className="space-y-3">
//               <FormLabel>Preset Themes</FormLabel>
//               <div className="flex flex-wrap gap-2">
//                 {PRESET_COLORS.map((preset) => (
//                   <button
//                     key={preset.name}
//                     type="button"
//                     onClick={() => {
//                       form.setValue("designSettings.colors.primary", preset.hex);
//                       form.setValue("designSettings.colors.invoiceTitle", preset.hex);
//                       form.setValue("designSettings.colors.totalAmount", preset.hex);
//                     }}
//                     className="h-8 w-8 rounded-full border-2 border-transparent hover:scale-110 transition-transform"
//                     style={{ backgroundColor: preset.hex }}
//                     title={preset.name}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="grid gap-4">
//               {[
//                 { name: "primary", label: "Primary Color" },
//                 { name: "secondary", label: "Secondary Color" },
//                 { name: "invoiceTitle", label: "Title Color" },
//                 { name: "tableHeader", label: "Table Header" },
//                 { name: "tableText", label: "Table Text" },
//                 { name: "totalAmount", label: "Total Color" },
//                 { name: "footer", label: "Footer Color" },
//               ].map(({ name, label }) => (
//                 <FormField
//                   key={name}
//                   control={form.control}
//                   name={`designSettings.colors.${name}`}
//                   render={({ field }) => (
//                     <FormItem className="flex items-center justify-between gap-4">
//                       <FormLabel className="w-1/3 text-xs">{label}</FormLabel>
//                       <div className="flex flex-1 items-center gap-2">
//                         <div
//                           className="h-8 w-8 rounded-md border"
//                           style={{ backgroundColor: field.value }}
//                         />
//                         <FormControl>
//                           <Input type="text" {...field} className="h-8 uppercase text-xs" />
//                         </FormControl>
//                         <FormControl>
//                           <Input
//                             type="color"
//                             {...field}
//                             className="h-8 w-12 cursor-pointer p-1"
//                           />
//                         </FormControl>
//                       </div>
//                     </FormItem>
//                   )}
//                 />
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* TYPOGRAPHY */}
//         <AccordionItem value="typography" className="border-b-0">
//           <AccordionTrigger className="hover:no-underline text-sm font-medium border-b pb-2 mb-4">Typography</AccordionTrigger>
//           <AccordionContent className="space-y-6 pt-2">
//             <FormField
//               control={form.control}
//               name="designSettings.typography.fontFamily"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Font Family</FormLabel>
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <FormControl>
//                       <SelectTrigger><SelectValue /></SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="Inter, sans-serif">Modern (Inter)</SelectItem>
//                       <SelectItem value="Roboto, sans-serif">Clean (Roboto)</SelectItem>
//                       <SelectItem value="Helvetica, Arial, sans-serif">Classic (Helvetica)</SelectItem>
//                       <SelectItem value="Georgia, serif">Elegant (Georgia)</SelectItem>
//                       <SelectItem value="Courier New, monospace">Technical (Courier)</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />

//             <div className="space-y-4">
//               {[
//                 { name: "invoiceTitle", label: "Title Size", min: 16, max: 48 },
//                 { name: "sectionHeading", label: "Section Headings", min: 10, max: 24 },
//                 { name: "bodyText", label: "Body Text", min: 8, max: 16 },
//                 { name: "tableText", label: "Table Text", min: 8, max: 16 },
//                 { name: "totalAmount", label: "Total Amount", min: 12, max: 32 },
//                 { name: "footerText", label: "Footer Size", min: 6, max: 14 },
//               ].map(({ name, label, min, max }) => (
//                 <FormField
//                   key={name}
//                   control={form.control}
//                   name={`designSettings.typography.sizes.${name}`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <div className="flex justify-between">
//                         <FormLabel className="text-xs">{label}</FormLabel>
//                         <span className="text-xs text-muted-foreground">{field.value}px</span>
//                       </div>
//                       <FormControl>
//                         <Slider
//                           min={min}
//                           max={max}
//                           step={1}
//                           value={[field.value || min]}
//                           onValueChange={(v) => field.onChange((v as number[])[0])}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* WATERMARK */}
//         <AccordionItem value="watermark" className="border-b-0">
//           <AccordionTrigger className="hover:no-underline text-sm font-medium border-b pb-2 mb-4">Watermark</AccordionTrigger>
//           <AccordionContent className="space-y-5 pt-2">
//             <FormField
//               control={form.control}
//               name="designSettings.watermark.enabled"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
//                   <div className="space-y-0.5">
//                     <FormLabel className="text-sm">Enable Watermark</FormLabel>
//                   </div>
//                   <FormControl>
//                     <Switch checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             {form.watch("designSettings.watermark.enabled") && (
//               <div className="space-y-5 pl-1">
//                 <FormField
//                   control={form.control}
//                   name="designSettings.watermark.type"
//                   render={({ field }) => (
//                     <FormItem className="space-y-3">
//                       <FormLabel>Watermark Type</FormLabel>
//                       <div className="flex rounded-md shadow-sm">
//                         <button
//                           type="button"
//                           onClick={() => field.onChange("TEXT")}
//                           className={cn(
//                             "flex-1 py-2 text-xs font-medium border rounded-l-md transition-colors",
//                             field.value === "TEXT" ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted"
//                           )}
//                         >
//                           Text
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => field.onChange("LOGO")}
//                           className={cn(
//                             "flex-1 py-2 text-xs font-medium border border-l-0 rounded-r-md transition-colors",
//                             field.value === "LOGO" ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted"
//                           )}
//                         >
//                           Company Logo
//                         </button>
//                       </div>
//                     </FormItem>
//                   )}
//                 />

//                 {form.watch("designSettings.watermark.type") === "TEXT" && (
//                   <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.text.content"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-xs">Text Content</FormLabel>
//                           <FormControl><Input {...field} className="h-8" /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.text.color"
//                       render={({ field }) => (
//                         <FormItem className="flex items-center gap-4">
//                           <FormLabel className="w-1/3 text-xs">Color</FormLabel>
//                           <div className="flex flex-1 gap-2">
//                             <FormControl><Input type="text" {...field} className="h-8 uppercase text-xs" /></FormControl>
//                             <FormControl><Input type="color" {...field} className="h-8 w-12 p-1 cursor-pointer" /></FormControl>
//                           </div>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.text.fontSize"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Font Size</FormLabel><span className="text-xs text-muted-foreground">{field.value}px</span></div>
//                           <FormControl><Slider min={10} max={200} step={1} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.text.rotation"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Rotation</FormLabel><span className="text-xs text-muted-foreground">{field.value}°</span></div>
//                           <FormControl><Slider min={-180} max={180} step={1} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.text.opacity"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Opacity</FormLabel><span className="text-xs text-muted-foreground">{Math.round((field.value || 0) * 100)}%</span></div>
//                           <FormControl><Slider min={0.01} max={1} step={0.01} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.text.horizontalGap"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Horizontal Gap</FormLabel><span className="text-xs text-muted-foreground">{field.value}px</span></div>
//                           <FormControl><Slider min={0} max={200} step={5} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.text.verticalGap"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Vertical Gap</FormLabel><span className="text-xs text-muted-foreground">{field.value}px</span></div>
//                           <FormControl><Slider min={0} max={200} step={5} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.text.tileScale"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Tile Scale</FormLabel><span className="text-xs text-muted-foreground">{field.value}</span></div>
//                           <FormControl><Slider min={0.1} max={5} step={0.1} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.text.offsetX"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Position Offset X</FormLabel><span className="text-xs text-muted-foreground">{field.value}px</span></div>
//                           <FormControl><Slider min={-200} max={200} step={5} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.text.offsetY"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Position Offset Y</FormLabel><span className="text-xs text-muted-foreground">{field.value}px</span></div>
//                           <FormControl><Slider min={-200} max={200} step={5} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 )}

//                 {form.watch("designSettings.watermark.type") === "LOGO" && (
//                   <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.logo.size"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Size</FormLabel><span className="text-xs text-muted-foreground">{field.value}px</span></div>
//                           <FormControl><Slider min={20} max={500} step={10} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.logo.rotation"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Rotation</FormLabel><span className="text-xs text-muted-foreground">{field.value}°</span></div>
//                           <FormControl><Slider min={-180} max={180} step={1} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.logo.opacity"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Opacity</FormLabel><span className="text-xs text-muted-foreground">{Math.round((field.value || 0) * 100)}%</span></div>
//                           <FormControl><Slider min={0.01} max={1} step={0.01} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.logo.horizontalGap"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Horizontal Gap</FormLabel><span className="text-xs text-muted-foreground">{field.value}px</span></div>
//                           <FormControl><Slider min={0} max={200} step={5} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.logo.verticalGap"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Vertical Gap</FormLabel><span className="text-xs text-muted-foreground">{field.value}px</span></div>
//                           <FormControl><Slider min={0} max={200} step={5} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.logo.tileScale"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Tile Scale</FormLabel><span className="text-xs text-muted-foreground">{field.value}</span></div>
//                           <FormControl><Slider min={0.1} max={5} step={0.1} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.logo.offsetX"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Position Offset X</FormLabel><span className="text-xs text-muted-foreground">{field.value}px</span></div>
//                           <FormControl><Slider min={-200} max={200} step={5} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="designSettings.watermark.logo.offsetY"
//                       render={({ field }) => (
//                         <FormItem>
//                           <div className="flex justify-between"><FormLabel className="text-xs">Position Offset Y</FormLabel><span className="text-xs text-muted-foreground">{field.value}px</span></div>
//                           <FormControl><Slider min={-200} max={200} step={5} value={[field.value]} onValueChange={(v) => field.onChange((v as number[])[0])} /></FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//           </AccordionContent>
//         </AccordionItem>

//         {/* VISIBILITY */}
//         <AccordionItem value="visibility" className="border-b-0">
//           <AccordionTrigger className="hover:no-underline text-sm font-medium border-b pb-2 mb-4">Visibility</AccordionTrigger>
//           <AccordionContent className="space-y-3 pt-2">
//             {[
//               { name: "logo", label: "Show Logo" },
//               { name: "signature", label: "Show Signature" },
//               { name: "seal", label: "Show Seal / Stamp" },
//               { name: "bankDetails", label: "Show Bank Details" },
//               { name: "paymentInfo", label: "Show Payment Info" },
//               { name: "upiQr", label: "Show UPI QR" },
//               { name: "gstin", label: "Show GSTIN" },
//               { name: "pan", label: "Show PAN" },
//               { name: "billingAddress", label: "Show Billing Address" },
//               { name: "notes", label: "Show Notes" },
//               { name: "terms", label: "Show Terms & Conditions" },
//               { name: "footer", label: "Show Footer" },
//             ].map(({ name, label }) => (
//               <FormField
//                 key={name}
//                 control={form.control}
//                 name={`designSettings.visibility.${name}`}
//                 render={({ field }) => (
//                   <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
//                     <FormLabel className="text-xs cursor-pointer w-full font-normal">{label}</FormLabel>
//                     <FormControl>
//                       <Switch checked={field.value} onCheckedChange={field.onChange} className="scale-75 origin-right" />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             ))}
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   )
// }




"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

import { TemplateGallery } from "./TemplateGallery"
import React, { useState, useEffect } from "react"

function DebouncedInput({ field, ...props }: any) {
  const [localValue, setLocalValue] = useState(field.value || "")
  
  useEffect(() => {
    setLocalValue(field.value || "")
  }, [field.value])
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== field.value && localValue !== undefined) {
        field.onChange(localValue)
      }
    }, 400)
    return () => clearTimeout(handler)
  }, [localValue, field])

  return (
    <Input
      {...props}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  )
}

function DebouncedSlider({ value, onChange, min, max, step }: any) {
  const [localValue, setLocalValue] = useState(value)
  
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <Slider
      min={min}
      max={max}
      step={step}
      value={[localValue]}
      onValueChange={(v) => setLocalValue(v[0])}
      onValueCommit={(v) => onChange(v[0])}
    />
  )
}

const PRESET_COLORS = [
  { name: "Blue", hex: "#2563EB" },
  { name: "Indigo", hex: "#4F46E5" },
  { name: "Emerald", hex: "#059669" },
  { name: "Slate", hex: "#475569" },
  { name: "Purple", hex: "#7C3AED" },
  { name: "Rose", hex: "#E11D48" },
]

function ImageUploadField({ name, label, form }: { name: string, label: string, form: any }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1.5">
          <FormLabel className="text-xs font-medium">{label}</FormLabel>
          <div className="flex items-center gap-3">
            {field.value ? (
              <div className="relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted/50 p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={field.value} alt={label} className="max-h-full max-w-full object-contain" />
              </div>
            ) : (
              <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-md border border-dashed bg-muted/20 text-[10px] text-muted-foreground">
                No {label.toLowerCase()}
              </div>
            )}
            <div className="flex flex-col gap-1 w-full">
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="h-8 cursor-pointer text-xs file:mr-2 file:rounded-md file:border-0 file:bg-primary/10 file:px-2 file:py-1 file:text-[10px] file:text-primary hover:file:bg-primary/20"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        field.onChange(reader.result as string)
                      }
                      reader.readAsDataURL(file)
                    } else {
                      field.onChange("")
                    }
                  }}
                />
              </FormControl>
              {field.value && (
                <button
                  type="button"
                  onClick={() => field.onChange("")}
                  className="text-left text-[10px] text-destructive hover:underline"
                >
                  Remove {label.toLowerCase()}
                </button>
              )}
            </div>
          </div>
        </FormItem>
      )}
    />
  )
}


export function DesignSettingsForm() {
  const form = useFormContext()

  return (
    <div className="space-y-6">

      {/* 1. VISUAL TEMPLATE GALLERY */}
      <TemplateGallery />

      <Accordion className="w-full">
        {/* 2. BRANDING & COMPANY */}
        <AccordionItem value="branding" className="border-b-0">
          <AccordionTrigger className="hover:no-underline text-sm font-medium border-b pb-2 mb-4">Branding & Company</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            
            <div className="space-y-4 pb-4 border-b">
              <ImageUploadField form={form} name="companyDetails.logoUrl" label="Company Logo" />
              <div className="grid grid-cols-2 gap-4">
                <ImageUploadField form={form} name="companyDetails.signatureUrl" label="Signature" />
                <ImageUploadField form={form} name="companyDetails.sealUrl" label="Company Seal" />
              </div>
            </div>
            <FormField
              control={form.control}
              name="designSettings.layout.logoPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Position</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LEFT">Left Align</SelectItem>
                      <SelectItem value="CENTER">Center Align</SelectItem>
                      <SelectItem value="RIGHT">Right Align</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="pt-4 border-t mt-4 space-y-4">
              <h4 className="text-sm font-medium">Company Information</h4>
              <FormField
                control={form.control}
                name="companyDetails.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl><Input placeholder="Your Company Ltd" {...field} value={field.value || ""} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyDetails.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl><Input placeholder="123 Business St..." {...field} value={field.value || ""} /></FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyDetails.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input placeholder="hello@company.com" {...field} value={field.value || ""} /></FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyDetails.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl><Input placeholder="+1 234 567 8900" {...field} value={field.value || ""} /></FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="companyDetails.taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax ID / GSTIN</FormLabel>
                    <FormControl><Input placeholder="TAX-12345" {...field} value={field.value || ""} /></FormControl>
                  </FormItem>
                )}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 3. COLORS */}
        <AccordionItem value="colors" className="border-b-0">
          <AccordionTrigger className="hover:no-underline text-sm font-medium border-b pb-2 mb-4">Colors</AccordionTrigger>
          <AccordionContent className="space-y-6 pt-2">
            {/* Preset Colors */}
            <div className="space-y-3">
              <FormLabel>Preset Themes</FormLabel>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      form.setValue("designSettings.colors.primary", preset.hex);
                      form.setValue("designSettings.colors.invoiceTitle", preset.hex);
                      form.setValue("designSettings.colors.totalAmount", preset.hex);
                    }}
                    className="h-8 w-8 rounded-full border-2 border-transparent hover:scale-110 transition-transform"
                    style={{ backgroundColor: preset.hex }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="grid gap-4">
              {[
                { name: "primary", label: "Primary Color" },
                { name: "secondary", label: "Secondary Color" },
                { name: "invoiceTitle", label: "Title Color" },
                { name: "tableHeader", label: "Table Header" },
                { name: "tableText", label: "Table Text" },
                { name: "totalAmount", label: "Total Color" },
                { name: "footer", label: "Footer Color" },
              ].map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={`designSettings.colors.${name}`}
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-4">
                      <FormLabel className="w-1/3 text-xs">{label}</FormLabel>
                      <div className="flex flex-1 items-center gap-2">
                        <div
                          className="h-8 w-8 rounded-md border"
                          style={{ backgroundColor: field.value }}
                        />
                        <FormControl>
                          <Input type="text" {...field} className="h-8 uppercase text-xs" />
                        </FormControl>
                        <FormControl>
                          <Input
                            type="color"
                            {...field}
                            className="h-8 w-12 cursor-pointer p-1"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 4. TYPOGRAPHY */}
        <AccordionItem value="typography" className="border-b-0">
          <AccordionTrigger className="hover:no-underline text-sm font-medium border-b pb-2 mb-4">Typography</AccordionTrigger>
          <AccordionContent className="space-y-6 pt-2">
            <FormField
              control={form.control}
              name="designSettings.typography.fontFamily"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Font Family</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Inter, sans-serif">Modern (Inter)</SelectItem>
                      <SelectItem value="Roboto, sans-serif">Clean (Roboto)</SelectItem>
                      <SelectItem value="Helvetica, Arial, sans-serif">Classic (Helvetica)</SelectItem>
                      <SelectItem value="Georgia, serif">Elegant (Georgia)</SelectItem>
                      <SelectItem value="Courier New, monospace">Technical (Courier)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="space-y-4">
              {[
                { name: "invoiceTitle", label: "Title Size", min: 16, max: 48 },
                { name: "sectionHeading", label: "Section Headings", min: 10, max: 24 },
                { name: "bodyText", label: "Body Text", min: 8, max: 16 },
                { name: "tableText", label: "Table Text", min: 8, max: 16 },
                { name: "totalAmount", label: "Total Amount", min: 12, max: 32 },
                { name: "footerText", label: "Footer Size", min: 6, max: 14 },
              ].map(({ name, label, min, max }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={`designSettings.typography.sizes.${name}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel className="text-xs">{label}</FormLabel>
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || min}px</span>
                      </div>
                      <FormControl>
                        <DebouncedSlider
                          min={min}
                          max={max}
                          step={1}
                          value={field.value || min}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 5. WATERMARK SYSTEM */}
        <AccordionItem value="watermark" className="border-b-0">
          <AccordionTrigger className="hover:no-underline text-sm font-medium border-b pb-2 mb-4">Watermark</AccordionTrigger>
          <AccordionContent className="space-y-5 pt-2">
            <FormField
              control={form.control}
              name="designSettings.watermark.enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm">Enable Watermark</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("designSettings.watermark.enabled") && (
              <div className="space-y-5 pl-1">
                <FormField
                  control={form.control}
                  name="designSettings.watermark.type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Watermark Type</FormLabel>
                      <div className="flex rounded-md shadow-sm">
                        <button
                          type="button"
                          onClick={() => field.onChange("TEXT")}
                          className={cn(
                            "flex-1 py-2 text-xs font-medium border rounded-l-md transition-colors",
                            field.value === "TEXT" ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted"
                          )}
                        >
                          Text
                        </button>
                        <button
                          type="button"
                          onClick={() => field.onChange("LOGO")}
                          className={cn(
                            "flex-1 py-2 text-xs font-medium border border-l-0 rounded-r-md transition-colors",
                            field.value === "LOGO" ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted"
                          )}
                        >
                          Company Logo
                        </button>
                      </div>
                    </FormItem>
                  )}
                />

                {/* TEXT WATERMARK CONTROLS */}
                {form.watch("designSettings.watermark.type") === "TEXT" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.text.content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Text Content</FormLabel>
                          <FormControl><DebouncedInput field={field} className="h-8" /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.text.color"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                          <FormLabel className="w-1/3 text-xs">Color</FormLabel>
                          <div className="flex flex-1 gap-2">
                            <FormControl><DebouncedInput field={field} type="text" className="h-8 uppercase text-xs" /></FormControl>
                            <FormControl><DebouncedInput field={field} type="color" className="h-8 w-12 p-1 cursor-pointer" /></FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.text.fontSize"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Font Size</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || 48}px</span></div>
                          <FormControl><DebouncedSlider min={10} max={200} step={1} value={field.value || 48} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.text.rotation"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Rotation</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || -45}°</span></div>
                          <FormControl><DebouncedSlider min={-180} max={180} step={1} value={field.value || -45} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.text.opacity"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Opacity</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{Math.round((field.value || 0.1) * 100)}%</span></div>
                          <FormControl><DebouncedSlider min={0.01} max={1} step={0.01} value={field.value || 0.1} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.text.horizontalGap"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Horizontal Gap</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || 200}px</span></div>
                          <FormControl><DebouncedSlider min={0} max={200} step={5} value={field.value || 200} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.text.verticalGap"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Vertical Gap</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || 200}px</span></div>
                          <FormControl><DebouncedSlider min={0} max={200} step={5} value={field.value || 200} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.text.tileScale"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Tile Scale</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{(field.value || 1).toFixed(2)}</span></div>
                          <FormControl><DebouncedSlider min={0.1} max={5} step={0.1} value={field.value || 1} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.text.offsetX"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Position Offset X</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || 0}px</span></div>
                          <FormControl><DebouncedSlider min={-200} max={200} step={5} value={field.value || 0} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.text.offsetY"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Position Offset Y</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || 0}px</span></div>
                          <FormControl><DebouncedSlider min={-200} max={200} step={5} value={field.value || 0} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* LOGO WATERMARK CONTROLS */}
                {form.watch("designSettings.watermark.type") === "LOGO" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <ImageUploadField
                      form={form}
                      name="designSettings.watermark.logo.url"
                      label="Watermark Logo Image"
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.logo.size"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Size</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || 100}px</span></div>
                          <FormControl><DebouncedSlider min={20} max={500} step={10} value={field.value || 100} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.logo.rotation"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Rotation</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || -45}°</span></div>
                          <FormControl><DebouncedSlider min={-180} max={180} step={1} value={field.value || -45} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.logo.opacity"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Opacity</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{Math.round((field.value || 0.1) * 100)}%</span></div>
                          <FormControl><DebouncedSlider min={0.01} max={1} step={0.01} value={field.value || 0.1} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.logo.horizontalGap"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Horizontal Gap</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || 200}px</span></div>
                          <FormControl><DebouncedSlider min={0} max={200} step={5} value={field.value || 200} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.logo.verticalGap"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Vertical Gap</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || 200}px</span></div>
                          <FormControl><DebouncedSlider min={0} max={200} step={5} value={field.value || 200} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.logo.tileScale"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Tile Scale</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{(field.value || 1).toFixed(2)}</span></div>
                          <FormControl><DebouncedSlider min={0.1} max={5} step={0.1} value={field.value || 1} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.logo.offsetX"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Position Offset X</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || 0}px</span></div>
                          <FormControl><DebouncedSlider min={-200} max={200} step={5} value={field.value || 0} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designSettings.watermark.logo.offsetY"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between"><FormLabel className="text-xs">Position Offset Y</FormLabel><span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{field.value || 0}px</span></div>
                          <FormControl><DebouncedSlider min={-200} max={200} step={5} value={field.value || 0} onChange={field.onChange} /></FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* 6. VISIBILITY */}
        <AccordionItem value="visibility" className="border-b-0">
          <AccordionTrigger className="hover:no-underline text-sm font-medium border-b pb-2 mb-4">Visibility</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-2">
            {[
              { name: "logo", label: "Show Logo" },
              { name: "signature", label: "Show Signature" },
              { name: "seal", label: "Show Seal / Stamp" },
              { name: "bankDetails", label: "Show Bank Details" },
              { name: "paymentInfo", label: "Show Payment Info" },
              { name: "upiQr", label: "Show UPI QR" },
              { name: "gstin", label: "Show GSTIN" },
              { name: "pan", label: "Show PAN" },
              { name: "billingAddress", label: "Show Billing Address" },
              { name: "notes", label: "Show Notes" },
              { name: "terms", label: "Show Terms & Conditions" },
              { name: "footer", label: "Show Footer" },
            ].map(({ name, label }) => (
              <FormField
                key={name}
                control={form.control}
                name={`designSettings.visibility.${name}`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                    <FormLabel className="text-xs cursor-pointer w-full font-normal">{label}</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} className="scale-75 origin-right" />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}