"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import VideoComponent from '@/components/custom/video'
import { url } from 'inspector'
import TitleSection from '@/components/custom/title-section'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { ArrowBigLeft, ArrowBigLeftIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useToast } from '@/components/ui/use-toast'
import { createExercise } from '@/actions/exercise.actions'

const formSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required.",
  }),
  series: z.number().int().positive(),
  repetitions: z.number().int().positive(),
  weight: z.number().int().positive(),
  url: z.string().url({
    message: "URL must be a valid URL.",
  }),
  observation: z.string().optional(),
})

export default function AddExercise() {
  const { user } = useUser();
  const { toast } = useToast();
  const [url, setUrl] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      series: 0,
      repetitions: 0,
      weight: 0,
      url: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {

      const newExercise = await createExercise({
        ...values,
        personalTrainerId: user?.publicMetadata.userId! as number
      });

      if (!newExercise) {
        throw new Error("Error to create new exercise");
      }

      form.reset();
      setUrl("");

      toast({
        title: "Sucesso!",
        description: "O exercício foi cadastrado com sucesso.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro!",
        description: "Ocorreu um erro ao cadastrar o exercício.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="px-10 mb-10">
        <TitleSection title="Adicionar Exercício" />
      </div>
      <main className="h-[calc(100vh_-_230px)] px-10 pb-10 flex">

        <div className="h-full w-96 mr-10">
          <VideoComponent url={url} />
        </div>

        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Exercício</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome do exercício"
                        className='bg-[#1e1558] border-none text-primary placeholder:text-[#528AA5]'
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Digite o nome do exercício
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel className='text-primary'>Url</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          setUrl(e.target.value)
                          field.onChange(e)
                        }}
                        placeholder="Digite a url do vídeo"
                        className='bg-[#1e1558] border-none text-primary placeholder:text-[#528AA5]'
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Esta é a url do vídeo que você deseja adicionar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="series"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Series</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                        placeholder="Digite a quantidade de séries"
                        className='bg-[#1e1558] border-none text-primary placeholder:text-[#528AA5]'
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Quantas séries o exercício terá?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repetitions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Repetições</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                        placeholder="Digite a quantidade de repetições"
                        className='bg-[#1e1558] border-none text-primary placeholder:text-[#528AA5]'
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Quantas repetições o exercício terá?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Peso</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                        placeholder="Digite o peso"
                        className='bg-[#1e1558] border-none text-primary placeholder:text-[#528AA5]'
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Quanto peso você usará no exercício?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observation"
                render={({ field }) => (
                  <FormItem className='col-span-3'>
                    <FormLabel className='text-primary'>Observação</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite uma observação sobre o exercício"
                        className="resize-none text-primary bg-[#1e1558] border-none placeholder:text-[#528AA5] h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Digite uma observação sobre o exercício.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="custom" disabled={loading} className='col-span-3 w-44 mx-auto'>
                {
                  loading ? 'Carregando...' : 'Adicionar Exercício'
                }
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>

  )
}
