import { dashboardProjectSchema, projectSchema, type Project, type ProjectFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createProject (formData : ProjectFormData) {
  try {
    const { data } = await api.post('/projects', formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api('/projects')
    const response = dashboardProjectSchema.safeParse(data)
    if(response.success) return response.data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjectById(projectId: Project['_id']) {
  try {
    const { data } = await api(`/projects/${projectId}`)
    const response = projectSchema.safeParse(data)
    if(response.success) return data


  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

type ProjectAPIType = {
  projectId: Project['_id']
  formData: ProjectFormData
}

export async function updateProject({ projectId, formData } : ProjectAPIType) {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData)
    
    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteProject ( projectId : Project['_id']) {
  try {
    const { data } = await api.delete<string>(`/projects/${projectId}`)
    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}