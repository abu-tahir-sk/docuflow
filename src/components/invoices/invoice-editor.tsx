"use client"

import { useFieldArray } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plus, Trash2, User, FileText, List, CreditCard, AlignLeft, Scale } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DesignSettingsForm } from "./design-settings"

interface InvoiceEditorProps {
  form: any
  clients: any[]
}

const Section = ({ icon: Icon, title, description, children }: any) => (
  <div className="bg-card border rounded-lg overflow-hidden shadow-sm">
    <div className="bg-muted/30 border-b px-4 py-3 flex items-start gap-3">
      <div className="p-2 bg-background border rounded-md shadow-sm mt-0.5">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
    </div>
    <div className="p-4 space-y-5">
      {children}
    </div>
  </div>
)

export function InvoiceEditor({ form, clients }: InvoiceEditorProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items"
  })

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Tabs defaultValue="data" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-11 p-1 bg-muted/50 rounded-lg">
            <TabsTrigger value="data" className="rounded-md text-xs font-medium transition-all">Invoice Data</TabsTrigger>
            <TabsTrigger value="design" className="rounded-md text-xs font-medium transition-all">Design & Brand</TabsTrigger>
          </TabsList>

          <TabsContent value="data" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* CLIENT SECTION */}
            <Section icon={User} title="Client" description="Select or add the client you are billing.">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }: { field: any }) => (
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
                            <FormControl>
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Select a client..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="" disabled className="hidden">Select a client...</SelectItem>
                              {clients.map(c => (
                                <SelectItem key={c.id} value={c.id}>
                                  {c.name} {c.clientCompany ? `(${c.clientCompany})` : ""}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      <Button type="button" variant="outline" className="h-10">
                        <Plus className="h-4 w-4 mr-2" /> Add
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Section>

            {/* INVOICE DETAILS SECTION */}
            <Section icon={FileText} title="Invoice Details" description="Core metadata and tracking information.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Invoice Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Auto-generated" className="h-10" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DRAFT"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-400" />Draft</div></SelectItem>
                          <SelectItem value="SENT"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" />Sent</div></SelectItem>
                          <SelectItem value="VIEWED"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500" />Viewed</div></SelectItem>
                          <SelectItem value="PARTIALLY PAID"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500" />Partially Paid</div></SelectItem>
                          <SelectItem value="PAID"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" />Paid</div></SelectItem>
                          <SelectItem value="OVERDUE"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500" />Overdue</div></SelectItem>
                          <SelectItem value="CANCELLED"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-800" />Cancelled</div></SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }: { field: any }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-xs text-muted-foreground">Issue Date</FormLabel>
                      <Popover>
                        <FormControl>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal h-10",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }: { field: any }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-xs text-muted-foreground">Due Date</FormLabel>
                      <Popover>
                        <FormControl>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal h-10",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Section>

            {/* ITEMS SECTION */}
            <Section icon={List} title="Items" description="Products, services, and associated charges.">
              <div className="space-y-4">
                {fields.map((field, index) => (
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
                          render={({ field }: { field: any }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Item description" className="h-9" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-4 md:col-span-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }: { field: any }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">Qty</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" className="h-9" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-4 md:col-span-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.unit`}
                          render={({ field }: { field: any }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">Unit</FormLabel>
                              <FormControl>
                                <Input placeholder="Hrs, Unit" className="h-9" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-4 md:col-span-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.unitPrice`}
                          render={({ field }: { field: any }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">Price</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" className="h-9" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 border-dashed hover:bg-muted/50"
                  onClick={() => append({ description: "", quantity: 1, unit: "Item", unitPrice: 0 })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Line Item
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-dashed mt-4">
                <FormField
                  control={form.control}
                  name="discountValue"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Global Discount</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" className="h-10" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Discount Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                          <SelectItem value="FIXED">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Section>

            {/* PAYMENT SECTION */}
            <Section icon={CreditCard} title="Payment & Currency" description="Define how you expect to be paid.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Currency</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="INR">INR (₹) - Indian Rupee</SelectItem>
                          <SelectItem value="USD">USD ($) - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
                          <SelectItem value="GBP">GBP (£) - British Pound</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Payment Terms</FormLabel>
                      <FormControl>
                        <Input placeholder="Net 30, Due on Receipt" className="h-10" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Section>

            {/* NOTES & TERMS */}
            <Section icon={AlignLeft} title="Notes & Terms" description="Additional information for the client.">
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Client Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Thank you for your business!" className="min-h-[80px] resize-y" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Terms & Conditions</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Please pay within the due date..." className="min-h-[80px] resize-y" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="design" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <DesignSettingsForm />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}