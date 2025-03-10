// import { useState, useMemo } from 'react'
// import { useLocation } from 'react-router-dom'
// import {
//   useReactTable,
//   getCoreRowModel,
//   ColumnDef,
//   flexRender,
// } from '@tanstack/react-table'
// import { CiHeart } from 'react-icons/ci'
// import './menu-results-table.css'
// import { IoIosHeartEmpty, IoMdHeart  } from "react-icons/io"

// type MenuCategory = {
//   green: string[]
//   orange: string[]
//   red: string[]
// }

// type MealRow = {
//   meal: string
//   green: boolean
//   orange: boolean
//   red: boolean
// }

// export default function MenuResultsTable() {
//   const location = useLocation()
//   const data: Record<string, MenuCategory> | null = location.state?.data

//   if (!data) {
//     return <div>No results available</div>
//   }

//   const formatLabel = (label: string): string => label.replace(/_/g, ' ')

//   const categoryNames = Object.keys(data)
//   const [activeTab, setActiveTab] = useState<string>(categoryNames[0])

//   const createMealRows = (obj: MenuCategory): MealRow[] => {
//     const mealMap = new Map<string, MealRow>()

//     obj.green.forEach(meal => {
//       mealMap.set(meal, { meal, green: true, orange: false, red: false })
//     })

//     obj.orange.forEach(meal => {
//       if (mealMap.has(meal)) {
//         const existing = mealMap.get(meal)!
//         existing.orange = true
//       } else {
//         mealMap.set(meal, { meal, green: false, orange: true, red: false })
//       }
//     })

//     obj.red.forEach(meal => {
//       if (mealMap.has(meal)) {
//         const existing = mealMap.get(meal)!
//         existing.red = true
//       } else {
//         mealMap.set(meal, { meal, green: false, orange: false, red: true })
//       }
//     })

//     return Array.from(mealMap.values())
//   }

//   const rows = useMemo(() => {
//     const activeCategory = data[activeTab]
//     return activeCategory ? createMealRows(activeCategory) : []
//   }, [activeTab, data])

//   const columns: ColumnDef<MealRow>[] = [
//     {
//       accessorKey: 'meal',
//       header: 'Meal',
//       cell: info => <span>{formatLabel(info.getValue() as string)}</span>,
//     },
//     {
//       accessorKey: 'green',
//       header: 'Green',
//       cell: info =>
//         info.getValue() ? (
//           <div
//             style={{
//               width: '20px',
//               height: '20px',
//               borderRadius: '50%',
//               backgroundColor: '#a5d46a',
//               margin: '0 auto',
//               border: '2px solid black',
//             }}
//           />
//         ) : null,
//     },
//     {
//       accessorKey: 'orange',
//       header: 'Orange',
//       cell: info =>
//         info.getValue() ? (
//           <div
//             style={{
//               width: '20px',
//               height: '20px',
//               borderRadius: '50%',
//               backgroundColor: '#ffc080',
//               margin: '0 auto',
//               border: '2px solid black',
//             }}
//           />
//         ) : null,
//     },
//     {
//       accessorKey: 'red',
//       header: 'Red',
//       cell: info =>
//         info.getValue() ? (
//           <div
//             style={{
//               width: '20px',
//               height: '20px',
//               borderRadius: '50%',
//               backgroundColor: '#ffa080',
//               margin: '0 auto',
//               border: '2px solid black',
//             }}
//           />
//         ) : null,
//     }
//   ]

//   const table = useReactTable({
//     data: rows,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })

//   return (
//     <div className="menu-results-container">
//       {/* Tabs Navigation */}
//       <div className="tabs-navigation">
//         {categoryNames.map(name => (
//           <button
//             key={name}
//             className={`tab-button ${activeTab === name ? 'active' : ''}`}
//             onClick={() => setActiveTab(name)}
//           >
//             {formatLabel(name)}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="tab-content">
//         <div className="menu-table-section">
//           <div className="table-responsive">
//             <table>
//               <thead>
//                 {table.getHeaderGroups().map(headerGroup => (
//                   <tr key={headerGroup.id}>
//                     {headerGroup.headers.map(header => (
//                       <th key={header.id}>
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(
//                               header.column.columnDef.header,
//                               header.getContext(),
//                             )}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody>
//                 {table.getRowModel().rows.map(row => (
//                   <tr key={row.id}>
//                     {row.getVisibleCells().map(cell => (
//                       <td key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext(),
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import './menu-results-table.css'

type MenuCategory = {
  green: string[]
  orange: string[]
  red: string[]
}

type MealRow = {
  meal: string
  green: boolean
  orange: boolean
  red: boolean
}

export default function MenuResultsTable() {
  const location = useLocation()
  const data: Record<string, MenuCategory> | null = location.state?.data

  if (!data) {
    return <div>No results available</div>
  }

  const formatLabel = (label: string): string => label.replace(/_/g, ' ')

  // Filter out categories that have no dishes at all
  const filteredCategoryNames = Object.keys(data).filter(name => {
    const category = data[name]
    return category.green.length > 0 || category.orange.length > 0 || category.red.length > 0
  })

  if (filteredCategoryNames.length === 0) {
    return <div>No results available</div>
  }

  const [activeTab, setActiveTab] = useState<string>(filteredCategoryNames[0])

  const createMealRows = (obj: MenuCategory): MealRow[] => {
    const mealMap = new Map<string, MealRow>()

    obj.green.forEach(meal => {
      mealMap.set(meal, { meal, green: true, orange: false, red: false })
    })

    obj.orange.forEach(meal => {
      if (mealMap.has(meal)) {
        const existing = mealMap.get(meal)!
        existing.orange = true
      } else {
        mealMap.set(meal, { meal, green: false, orange: true, red: false })
      }
    })

    obj.red.forEach(meal => {
      if (mealMap.has(meal)) {
        const existing = mealMap.get(meal)!
        existing.red = true
      } else {
        mealMap.set(meal, { meal, green: false, orange: false, red: true })
      }
    })

    return Array.from(mealMap.values())
  }

  const rows = useMemo(() => {
    const activeCategory = data[activeTab]
    return activeCategory ? createMealRows(activeCategory) : []
  }, [activeTab, data])

  const columns: ColumnDef<MealRow>[] = [
    {
      accessorKey: 'meal',
      header: 'Meal',
      cell: info => <span>{formatLabel(info.getValue() as string)}</span>,
    },
    {
      accessorKey: 'green',
      header: 'Green',
      cell: info =>
        info.getValue() ? (
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#a5d46a',
              margin: '0 auto',
              border: '2px solid black',
            }}
          />
        ) : null,
    },
    {
      accessorKey: 'orange',
      header: 'Orange',
      cell: info =>
        info.getValue() ? (
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffc080',
              margin: '0 auto',
              border: '2px solid black',
            }}
          />
        ) : null,
    },
    {
      accessorKey: 'red',
      header: 'Red',
      cell: info =>
        info.getValue() ? (
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffa080',
              margin: '0 auto',
              border: '2px solid black',
            }}
          />
        ) : null,
    },
  ]

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="menu-results-container">
      {/* Tabs Navigation */}
      <div className="tabs-navigation">
        {filteredCategoryNames.map(name => (
          <button
            key={name}
            className={`tab-button ${activeTab === name ? 'active' : ''}`}
            onClick={() => setActiveTab(name)}
          >
            {formatLabel(name)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        <div className="menu-table-section">
          <div className="table-responsive">
            <table>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
