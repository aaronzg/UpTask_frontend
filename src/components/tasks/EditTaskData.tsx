import { getTaskById } from "@/api/taskAPI"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"

export const EditTaskData = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const taskId = queryParams.get('editTask')!
  const params = useParams()
  const projectId = params.projectId!


  const { data, isError } = useQuery({
    queryFn: () => getTaskById({taskId: taskId, projectId}),
    queryKey: ['task', taskId],
    enabled: !!taskId,
    retry: false
  })

  if(isError) return <Navigate to={'/404'}/>

  if (data) return (
    <EditTaskModal data={data} taskId={taskId}/>
  )
}
