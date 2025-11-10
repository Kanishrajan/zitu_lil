
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, UploadCloud, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const formSchema = z.object({
  accountHolderName: z.string().min(1, { message: 'Account holder name is required.' }),
  accountNumber: z.string().min(9).max(18, { message: 'Enter a valid account number (9-18 digits).' }),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: 'Enter a valid IFSC code.' }),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: 'Enter a valid PAN number.' }),
  proof: z
    .any()
    .refine((file) => file instanceof File, 'Document is required.')
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      '.pdf, .jpg, and .png files are accepted.'
    ),
});

type PayoutDetailsStepProps = {
  onNext: () => void;
};

export function PayoutDetailsStep({ onNext }: PayoutDetailsStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountHolderName: '',
      accountNumber: '',
      ifscCode: '',
      pan: '',
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
        <CardTitle>Complete Final Verification</CardTitle>
        <CardDescription>Add payout and owner verification to activate your seller account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="As on bank records" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Account Number</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ifscCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IFSC Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., HDFC0001234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="pan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN (Owner/Business)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ABCDE1234F" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="proof"
                render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                        <FormLabel>Proof Upload</FormLabel>
                        <FormControl>
                            <label htmlFor="proof-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {form.watch('proof') ? (
                                        <p className='text-sm text-muted-foreground'>{form.watch('proof').name}</p>
                                    ) : (
                                        <>
                                            <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag & drop</p>
                                        </>
                                    )}
                                </div>
                                <Input id="proof-upload" type="file" className="hidden" onChange={(e) => onChange(e.target.files?.[0])} accept={ACCEPTED_FILE_TYPES.join(',')} {...rest} />
                            </label>
                        </FormControl>
                        <FormDescription>
                          Cancelled cheque or passbook photo (PDF/JPG/PNG, up to 5MB).
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='flex items-center justify-between gap-4'>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Finish Verification
                </Button>
                <p className="text-xs text-muted-foreground flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    By submitting, you consent to verification checks for security and compliance.
                </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
