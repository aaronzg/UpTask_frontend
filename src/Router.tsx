import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { DashboardView } from "./views/DashboardView";
import { CreateProyectView } from "./views/proyects/CreateProyectView";
import { EditProjectView } from "./views/proyects/EditProjectView";
import { ProjectDetailsView } from "./views/proyects/ProjectDetailsView";

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<DashboardView />} index />
          <Route path='/projects/create' element={<CreateProyectView />} />
          <Route path='/projects/:projectId/edit' element={<EditProjectView />} />
          <Route path='/projects/:projectId' element={<ProjectDetailsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}