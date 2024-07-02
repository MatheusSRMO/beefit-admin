"use client";

import TitleSection from '@/components/custom/title-section'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import React from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from '@/components/ui/textarea'
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
import { registerTrainer } from '@/actions/trainer.actions';
import { useToast } from "@/components/ui/use-toast"
import { useUser } from '@clerk/nextjs';


const ddImage = "";

const formSchema = z.object({
  firstName: z.string().nonempty({
    message: "Nome é obrigatório.",
  }),
  lastName: z.string().nonempty({
    message: "Sobrenome é obrigatório.",
  }),
  age: z.number().int().positive({
    message: "Idade deve ser um número positivo.",
  }),
  weight: z.number().positive({
    message: "Peso deve ser um número positivo.",
  }),
  height: z.number().positive({
    message: "Altura deve ser um número positivo.",
  }),
  goal: z.string().nonempty({
    message: "Objetivo é obrigatório.",
  }),
  observation: z.string().optional(),
})

export default function RegisterStudentPage() {
  const { user } = useUser();
  const { toast } = useToast();

  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      weight: 0,
      height: 0,
      goal: "",
      observation: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const trainer: TrainerRegisterProps = {
        firstName: values.firstName,
        lastName: values.lastName,
        age: values.age,
        weight: values.weight,
        height: values.height,
        goal: values.goal,
        observation: values.observation,
        url: url,
        personalTrainerId: user?.publicMetadata.userId! as number,
      }

      const newTrainer = await registerTrainer(trainer);
      setUsername(newTrainer.username);
      setPassword(newTrainer.password);

      if(!newTrainer) {
        throw new Error("Error to create new trainer");
      }

      form.reset();
      setUrl("");

      toast({
        title: "Sucesso!",
        description: "O aluno foi cadastrado com sucesso.",
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro!",
        description: "Ocorreu um erro ao cadastrar o aluno.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="px-10 mb-10">
        <TitleSection title="Cadastrar Aluno" />
      </div>
      <main className="h-[calc(100vh_-_230px)] px-10 pb-10 flex">
        <div className="h-full w-96 mr-10 bg-[#1e1558] flex items-center justify-center flex-col gap-10 rounded-3xl p-10 z-50">
          <div className="w-full flex flex-col gap-4 justify-center items-center">
            <Label htmlFor="image" className="text-primary font-semibold">URL da foto de perfil</Label>
            <Input id="image" className='text-primary border-none placeholder:text-primary bg-background' placeholder='URL da imagem' value={url} onChange={e => {
              setUrl(e.target.value);
            }} />
          </div>
          <AspectRatio ratio={1}>
            <Image
              src={url || ddImage}
              layout="fill"
              objectFit="cover"
              alt=''
              className='rounded-full bg-background scale-105 border-white border-8'
            />
          </AspectRatio>
        </div>

        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Primeiro Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o primeiro nome do aluno"
                        className='bg-[#1e1558] border-none text-primary placeholder:text-[#528AA5]'
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Digite o primeiro nome completo do aluno.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Sobrenome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o sobrenome do aluno"
                        className='bg-[#1e1558] border-none text-primary placeholder:text-[#528AA5]'
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Digite o sobrenome completo do aluno.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Idade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                        placeholder="Digite a idade do aluno"
                        className='bg-[#1e1558] border-none text-primary placeholder:text-[#528AA5]'
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Digite a idade do aluno.
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
                        placeholder="Digite o peso do aluno"
                        className='bg-[#1e1558] border-none text-primary placeholder:text-[#528AA5]'
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Digite o peso do aluno em kg.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Altura</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                        placeholder="Digite a altura do aluno"
                        className='bg-[#1e1558] border-none text-primary placeholder:text-[#528AA5]'
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Digite a altura do aluno em cm.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Objetivo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o objetivo do aluno"
                        className='bg-[#1e1558] border-none text-primary placeholder:text-[#528AA5]'
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Digite o objetivo principal do aluno.
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
                        placeholder="Digite uma observação sobre o aluno"
                        className="resize-none text-primary bg-[#1e1558] border-none placeholder:text-[#528AA5] h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className='text-[#528AA5]'>
                      Digite qualquer observação adicional sobre o aluno.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="custom"
                className='col-span-3 w-44 mx-auto'
                disabled={loading}
              // onClick={() => setOpen(prev => !prev)}
              >
                {
                  loading ? 'Carregando...' : 'Cadastrar'
                }
              </Button>
            </form>
          </Form>
        </div>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md border-[#4F99DD]">
          <DialogHeader>
            <DialogTitle className='text-primary'>Login do Aluno</DialogTitle>
            <DialogDescription className='text-[#528AA5]'>
              Copie o username e senha do aluno para que ele possa acessar o aplicativo.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-end space-x-2">
            <div className="grid flex-1 gap-2 text-primary">
              <Label htmlFor="link">
                Username
              </Label>
              <Input
                id="link"
                className='border-none bg-[#1e1558]'
                defaultValue="https://ui.shadcn.com/docs/installation"
                readOnly
                value={username}
              />
            </div>
            <Button type="submit" size="sm" className="px-3 bg-[#1e1558] h-9" onClick={() => {
              navigator.clipboard.writeText(username);
            }}>
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-end space-x-2">
            <div className="grid flex-1 gap-2 text-primary">
              <Label htmlFor="link">
                Senha
              </Label>
              <Input
                id="link"
                className='border-none bg-[#1e1558]'
                value={password}
                readOnly
              />
            </div>
            <Button type="submit" size="sm" className="px-3 bg-[#1e1558] h-9" onClick={() => {
              navigator.clipboard.writeText(password);
            }}>
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="custom">
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
