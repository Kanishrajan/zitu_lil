
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UploadCloud } from 'lucide-react';
import { useState } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const formSchema = z.object({
  legalName: z.string().min(1, { message: 'Legal business name is required.' }),
  businessType: z.string({ required_error: 'Please select a business type.' }),
  registrationId: z.string().min(1, { message: 'Registration ID is required.' }),
  location: z.string().min(1, { message: 'Registered city & state are required.' }),
  document: z
    .any()
    .refine((file) => file instanceof File, 'Document is required.')
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      '.pdf, .jpg, and .png files are accepted.'
    ),
});

type CompanyDetailsStepProps = {
  onNext: () => void;
};

export function CompanyDetailsStep({ onNext }: CompanyDetailsStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      legalName: '',
      registrationId: '',
      location: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(values);
    setIsSubmitting(false);
    onNext();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm Your Business Details</CardTitle>
        <CardDescription>Share your company registration information so we can validate your business identity.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="legalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legal Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Zitu Retail Private Limited" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Business Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a business type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="proprietor">Proprietor</SelectItem>
                                <SelectItem value="partnership">Partnership</SelectItem>
                                <SelectItem value="llp">LLP</SelectItem>
                                <SelectItem value="pvt_ltd">Pvt Ltd</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                    control={form.control}
                    name="registrationId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Registration ID</FormLabel>
                        <FormControl>
                            <Input placeholder="GSTIN, CIN/LLPIN, or Udyam" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registered City & State</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Chennai, Tamil Nadu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="document"
                render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                        <FormLabel>Document Upload</FormLabel>
                        <FormControl>
                            <label htmlFor="document-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {form.watch('document') ? (
                                        <p className='text-sm text-muted-foreground'>{form.watch('document').name}</p>
                                    ) : (
                                        <>
                                            <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag & drop</p>
                                        </>
                                    )}
                                </div>
                                <Input id="document-upload" type="file" className="hidden" onChange={(e) => onChange(e.target.files?.[0])} accept={ACCEPTED_FILE_TYPES.join(',')} {...rest} />
                            </label>
                        </FormControl>
                        <FormDescription>
                          Registration/GST/PAN (PDF/JPG/PNG, up to 5MB).
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />

            <div className='flex items-center justify-between'>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Company Info
                </Button>
                 <p className="text-sm text-muted-foreground">Make sure your document name matches your legal business name.</p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
