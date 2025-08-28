
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ImageUp, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) || val.toLowerCase() === 'offer', {
    message: "Price must be a number or 'offer'.",
  }),
  image: z.any().refine((file) => file instanceof File, 'Image is required.'),
});

export default function ListItemPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Here you would typically handle the form submission, e.g., upload the image and save the product data.
    // For this example, we'll just simulate a delay.
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(values);

    toast({
      title: 'Success!',
      description: 'Your item has been listed for sale.',
    });
    setIsSubmitting(false);
    router.push('/marketplace');
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">List a New Item</h1>
            <p className="text-muted-foreground">Fill out the details below to sell your item.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Minimalist Watch" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your product in detail..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($) or "Offer"</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 250 or Offer" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a price in USD or type 'Offer' to accept negotiations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                        <div className="relative flex items-center justify-center w-full">
                            <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {value ? (
                                        <p className='text-sm text-muted-foreground'>{value.name}</p>
                                    ) : (
                                        <>
                                            <ImageUp className="w-8 h-8 mb-4 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG, or GIF</p>
                                        </>
                                    )}
                                </div>
                                <Input id="image-upload" type="file" className="hidden" onChange={(e) => onChange(e.target.files?.[0])} accept="image/*" {...rest} />
                            </label>
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Listing Item...' : 'List Item'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
