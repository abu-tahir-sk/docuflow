"use client"

import { useFieldArray } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plus, Trash2, User, FileText, List, CreditCard, Paintbrush } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { AddClientModal } from "@/components/invoices/add-client-modal"
import { DesignSettingsForm } from "@/components/invoices/design-settings"

interface QuotationEditorProps {
  form: any
  clients: any[]
  onAddClient: (client: any) => void
}

const SectionHeader = ({ icon: Icon, title, description }: { icon: any; title: string; description?: string }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-muted rounded-md text-primary">
      <Icon className="h-4 w-4" />
    </div>
    <div className="text-left">
      <h3 className="text-sm font-semibold">{title}</h3>
      {description && <p className="text-xs text-muted-foreground font-normal">{description}</p>}
    </div>
  </div>
)

export function QuotationEditor({ form, clients, onAddClient }: QuotationEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Accordion defaultValue={["client", "items"]} className="w-full space-y-4">

          {/* ১. ক্লায়েন্ট এবং কোটেশন মেটাডাটা */}
          <AccordionItem value="client" className="bg-card border rounded-lg px-4 border-b-0 shadow-sm">
            <AccordionTrigger className="hover:no-underline py-4">
              <SectionHeader icon={User} title="Client & Quote Details" description="Select client, quote ID and validity" />
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-2">
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Select Client *</FormLabel>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          {clients.length === 0 ? (
                            <div className="p-3 border rounded-md bg-muted/10">
                              <p className="text-xs text-muted-foreground">No clients found. Add one first.</p>
                            </div>
                          ) : (
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Choose a client..." />
                              </SelectTrigger>
                              <SelectContent>
                                {clients.map((c) => (
                                  <SelectItem key={c.id} value={c.id}>
                                    {c.name} {c.clientCompany ? `(${c.clientCompany})` : ""}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                        <AddClientModal
                          onSuccess={(client) => {
                            onAddClient(client)
                            form.setValue("clientId", client.id)
                          }}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="quotationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">Quotation Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. QT-2026-001" className="h-10" {...field} value={field.value || ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="SENT">Sent</SelectItem>
                            <SelectItem value="ACCEPTED">Accepted</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                            <SelectItem value="EXPIRED">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col mt-1">
                        <FormLabel className="text-xs text-muted-foreground">Quotation Date</FormLabel>
                        <Popover>
                          <FormControl>
                            <PopoverTrigger
                              render={
                                <Button
                                  variant="outline"
                                  className={cn("w-full pl-3 text-left font-normal h-10", !field.value && "text-muted-foreground")}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              }
                            />
                          </FormControl>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />

                  {/* Valid Until field */}
                  <FormField
                    control={form.control}
                    name="validUntil"
                    render={({ field }) => (
                      <FormItem className="flex flex-col mt-1">
                        <FormLabel className="text-xs text-muted-foreground">Valid Until (Expiry)</FormLabel>
                        <Popover>
                          <FormControl>
                            <PopoverTrigger
                              render={
                                <Button
                                  variant="outline"
                                  className={cn("w-full pl-3 text-left font-normal h-10", !field.value && "text-muted-foreground")}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick expiry date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              }
                            />
                          </FormControl>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ২. লাইন আইটেমস (পণ্য বা সার্ভিস) */}
          <AccordionItem value="items" className="bg-card border rounded-lg px-4 border-b-0 shadow-sm">
            <AccordionTrigger className="hover:no-underline py-4">
              <SectionHeader icon={List} title="Items & Pricing" description="Proposed services, quantities and rates" />
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-2">
              <div className="space-y-4">
                {fields.map((field, index) => {
                  const qty = form.watch(`items.${index}.quantity`) || 0
                  const price = form.watch(`items.${index}.unitPrice`) || 0
                  const total = (qty * price).toFixed(2)

                  return (
                    <div key={field.id} className="p-4 border rounded-md relative bg-background shadow-sm group">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12 md:col-span-6">
                          <FormField
                            control={form.control}
                            name={`items.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[10px] uppercase text-muted-foreground">Description</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Full-Stack Web App Development" className="h-9" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-3 md:col-span-2">
                          <FormField
                            control={form.control}
                            name={`items.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[10px] uppercase text-muted-foreground">Qty</FormLabel>
                                <FormControl>
                                  <Input type="number" step="1" className="h-9" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-4 md:col-span-2">
                          <FormField
                            control={form.control}
                            name={`items.${index}.unitPrice`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[10px] uppercase text-muted-foreground">Rate</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" className="h-9" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-5 md:col-span-2 flex flex-col justify-end">
                          <div className="h-9 flex items-center justify-end px-3 bg-muted/30 rounded-md border text-xs font-semibold">
                            {form.watch("currency") === "USD" ? "$" : "₹"} {total}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 border-dashed hover:bg-muted/50"
                  onClick={() => append({ description: "", quantity: 1, unit: "Item", unitPrice: 0 })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Quotation Item
                </Button>
              </div>

              {/* গ্লোবাল ডিসকাউন্ট */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t mt-6">
                <FormField
                  control={form.control}
                  name="discountValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Special Discount</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" className="h-10" {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Discount Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Discount Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                          <SelectItem value="FIXED">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ৩. কারেন্সি, টার্মস এবং নোটস */}
          <AccordionItem value="terms" className="bg-card border rounded-lg px-4 border-b-0 shadow-sm">
            <AccordionTrigger className="hover:no-underline py-4">
              <SectionHeader icon={CreditCard} title="Terms & Notes" description="Currency & validity conditions" />
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-2">
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Currency</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">INR (₹)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-xs text-muted-foreground">Notes for Client</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Thank you for your interest in our services." className="min-h-[80px]" {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">Terms & Conditions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="This quotation is valid for 30 days from the date of issue..." className="min-h-[80px]" {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          {/* ৪. ডিজাইন সেটিংস */}
          <AccordionItem value="design" className="bg-card border rounded-lg px-4 border-b-0 shadow-sm">
            <AccordionTrigger className="hover:no-underline py-4">
              <SectionHeader icon={Paintbrush} title="Design & Template" description="Colors, typography & watermark" />
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-2">
              <DesignSettingsForm />
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </form>
    </Form>
  )
}