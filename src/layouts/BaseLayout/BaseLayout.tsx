import { NavBar } from '@components'
import { Outlet } from 'react-router'
import './base-layout.css'

export default function BaseLayout() {
  return (
    <div className="base-layout-container">
      <NavBar />
      <Outlet />
    </div>
  )
}
