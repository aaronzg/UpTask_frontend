import { Link, useNavigate, useParams } from 'react-router-dom'
import ProjectForm from '@/components/project/ProjectForm'
import type { ProjectFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from '@/api/projectAPI'
import { toast } from 'react-toastify'

type EditProjectFormProps = {
  data: ProjectFormData
}

export const EditProjectForm = ({ data } : EditProjectFormProps) => {
  
  const navigate = useNavigate()

  const initialValues : ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description
  }

  const queryClient = useQueryClient()

  const params = useParams()
  const projectId = params.projectId!

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      // Invalidates the projects and editProject queries to update the data
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })

      toast.success(data)
      navigate('/') 
    }
  })

  const handleForm = (formData: ProjectFormData) => {
    mutate({ formData, projectId })
  }
  
  return (
    <>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-5xl font-black'>Crear proyecto</h1>
        <p className='text-2xl font-light text-gray-500 mt-5'>
          Llena el siguiente formulario para editar el proyecto
        </p>

        <nav className='my-5'>
          <Link
            className='bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
            to='/'
          >
            Volver a proyectos
          </Link>
        </nav>

        <form
          className='mt-10 bg-white shadow-lg rounded-lg p-10'
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type='submit'
            value={'Crear Proyecto'}
            className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors'
          />
        </form>
      </div>
    </>
  )
}
