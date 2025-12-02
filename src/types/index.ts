import z, { string, object, array } from 'zod'

/** Projects */
export const projectSchema = object({
  _id: string(),
  projectName: string(),
  clientName: string(),
  description: string()
})

export const dashboardProjectSchema = array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true
  })
)
export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>
