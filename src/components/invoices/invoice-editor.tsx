"use client"

import { useFieldArray } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plus, Trash2, User, FileText, List, CreditCard, AlignLeft, Paintbrush } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { DesignSettingsForm } from "./design-settings"
import { AddClientModal } from "./add-client-modal"

interface InvoiceEditorProps {
  form: any
  clients: any[]
  onAddClient: (client: any) => void
}

const SectionHeader = ({ icon: Icon, title, description }: { icon: any, title: string, description?: string }) => (
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

export function InvoiceEditor({ form, clients, onAddClient }: InvoiceEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items"
  })

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Accordion type="multiple" defaultValue={["client", "items"]} className="w-full space-y-4">
          
          {/* CLIENT SECTION */}
          <AccordionItem value="client" className="bg-card border rounded-lg px-4 border-b-0 shadow-sm">
            <AccordionTrigger className="hover:no-underline py-4">
              <SectionHeader icon={User} title="Client & Invoice Details" description="Select client and metadata" />
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-2">
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Billed To</FormLabel>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          {clients.length === 0 ? (
                            <div className="flex flex-col gap-2 p-3 border rounded-md bg-muted/10">
                              <p className="text-xs text-muted-foreground">No clients found.</p>
                            </div>
                          ) : (
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Select a client..." />
                              </SelectTrigger>
                              <SelectContent>
                                {clients.map(c => (
                                  <SelectItem key={c.id} value={c.id}>
                                    {c.name} {c.clientCompany ? `(${c.clientCompany})` : ""}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                        <AddClientModal onSuccess={(client) => {
                          onAddClient(client)
                          form.setValue("clientId", client.id)
                        }} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">Invoice Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Auto-generated" className="h-10" {...field} value={field.value || ""} />
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
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="SENT">Sent</SelectItem>
                            <SelectItem value="PAID">Paid</SelectItem>
                            <SelectItem value="OVERDUE">Overdue</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col mt-1">
                        <FormLabel className="text-xs text-muted-foreground">Issue Date</FormLabel>
                        <Popover>
                          <FormControl>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className={cn("w-full pl-3 text-left font-normal h-10", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                          </FormControl>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col mt-1">
                        <FormLabel className="text-xs text-muted-foreground">Due Date</FormLabel>
                        <Popover>
                          <FormControl>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className={cn("w-full pl-3 text-left font-normal h-10", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
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

          {/* ITEMS SECTION */}
          <AccordionItem value="items" className="bg-card border rounded-lg px-4 border-b-0 shadow-sm">
            <AccordionTrigger className="hover:no-underline py-4">
              <SectionHeader icon={List} title="Items" description="Products, services, and associated charges" />
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-2">
              <div className="space-y-4">
                {fields.map((field, index) => {
                  const qty = form.watch(`items.${index}.quantity`) || 0;
                  const price = form.watch(`items.${index}.unitPrice`) || 0;
                  const total = (qty * price).toFixed(2);
                  
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
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-12">
                          <FormField
                            control={form.control}
                            name={`items.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">Description</FormLabel>
                                <FormControl>
                                  <Input placeholder="Item description" className="h-9" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-3">
                          <FormField
                            control={form.control}
                            name={`items.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">Qty</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" className="h-9" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-4">
                          <FormField
                            control={form.control}
                            name={`items.${index}.unitPrice`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">Price</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" className="h-9" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-5 flex flex-col justify-end">
                          <div className="h-9 flex items-center justify-end px-3 bg-muted/30 rounded-md border text-sm font-medium">
                            {form.watch("currency") === "USD" ? "$" : (form.watch("currency") === "EUR" ? "€" : "₹")} {total}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                <Button type="button" variant="outline" className="w-full h-10 border-dashed hover:bg-muted/50" onClick={() => append({ description: "", quantity: 1, unit: "Item", unitPrice: 0 })}>
                  <Plus className="h-4 w-4 mr-2" /> Add Line Item
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t mt-6">
                <FormField
                  control={form.control}
                  name="discountValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Global Discount</FormLabel>
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
                            <SelectValue placeholder="Select type" />
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

          {/* PAYMENT SECTION */}
          <AccordionItem value="payment" className="bg-card border rounded-lg px-4 border-b-0 shadow-sm">
            <AccordionTrigger className="hover:no-underline py-4">
              <SectionHeader icon={CreditCard} title="Payment & Notes" description="Currency, terms, and notes" />
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
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
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Payment Terms</FormLabel>
                      <FormControl>
                        <Input placeholder="Net 30, Due on Receipt" className="h-10" {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel className="text-xs text-muted-foreground">Notes to Client</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Thank you for your business!" className="min-h-[80px] resize-y" {...field} value={field.value || ""} />
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
                      <Textarea placeholder="Please pay within the due date..." className="min-h-[80px] resize-y" {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          {/* DESIGN SECTION */}
          <AccordionItem value="design" className="bg-card border rounded-lg px-4 border-b-0 shadow-sm">
            <AccordionTrigger className="hover:no-underline py-4">
              <SectionHeader icon={Paintbrush} title="Design Settings" description="Customize PDF aesthetics" />
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