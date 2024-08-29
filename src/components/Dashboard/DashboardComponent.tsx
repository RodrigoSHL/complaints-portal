'use client'

import { useState, useEffect } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { parseISO, differenceInDays, format, startOfMonth, subDays, subMonths, subYears, isAfter } from 'date-fns'
import { IComplaint } from '@/complaints'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

type Period = 'today' | 'week' | 'month' | '3months' | '6months' | '9months' | 'year' | 'all';

// Custom Card components
const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">{children}</div>
)

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-semibold text-gray-700">{children}</h2>
)

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6">{children}</div>
)

async function fetchComplaints(): Promise<IComplaint[]> {
  const response = await fetch('https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/complaint')
  if (!response.ok) {
    throw new Error('Failed to fetch complaints')
  }
  return response.json()
}

export default function DashboardComponent() {
  const [complaints, setComplaints] = useState<IComplaint[]>([])
  const [filteredComplaints, setFilteredComplaints] = useState<IComplaint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [period, setPeriod] = useState<Period>('all')

  useEffect(() => {
    fetchComplaints()
      .then(data => {
        setComplaints(data)
        setFilteredComplaints(data)
        setIsLoading(false)
      })
      .catch(err => {
        setError('Error fetching complaints: ' + err.message)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    filterComplaintsByPeriod(period)
  }, [period, complaints])

  const filterComplaintsByPeriod = (selectedPeriod: Period) => {
    const now = new Date()
    let startDate: Date

    switch (selectedPeriod) {
      case 'today':
        startDate = startOfMonth(now)
        break
      case 'week':
        startDate = subDays(now, 7)
        break
      case 'month':
        startDate = subMonths(now, 1)
        break
      case '3months':
        startDate = subMonths(now, 3)
        break
      case '6months':
        startDate = subMonths(now, 6)
        break
      case '9months':
        startDate = subMonths(now, 9)
        break
      case 'year':
        startDate = subYears(now, 1)
        break
      default:
        setFilteredComplaints(complaints)
        return
    }

    const filtered = complaints.filter(complaint =>
      isAfter(parseISO(complaint.dateFiled), startDate)
    )
    setFilteredComplaints(filtered)
  }

  const groupComplaintsByMonth = (complaints: IComplaint[]) => {
    const groupedComplaints: { [key: string]: number } = {}
    complaints.forEach(complaint => {
      const month = startOfMonth(parseISO(complaint.dateFiled))
      const monthKey = format(month, 'yyyy-MM')
      if (!groupedComplaints[monthKey]) {
        groupedComplaints[monthKey] = 0
      }
      groupedComplaints[monthKey]++
    })
    return groupedComplaints
  }

  const calculateAverageResolutionTime = (complaints: IComplaint[]) => {
    const resolvedComplaints = complaints.filter(c => c.resolution !== null)
    if (resolvedComplaints.length === 0) return 0
    const totalDays = resolvedComplaints.reduce((sum, complaint) => {
      return sum + differenceInDays(parseISO(complaint.updatedAt), parseISO(complaint.dateFiled))
    }, 0)
    return totalDays / resolvedComplaints.length
  }

  const complaintsByMonth = groupComplaintsByMonth(filteredComplaints)
  const monthLabels = Object.keys(complaintsByMonth).sort()
  const monthData = monthLabels.map(month => complaintsByMonth[month])

  const complaintsData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Denuncias por mes',
        data: monthData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const averageResolutionTime = calculateAverageResolutionTime(filteredComplaints)

  const resolutionTimeData = {
    labels: ['Tiempo promedio de resolución'],
    datasets: [
      {
        label: 'Días',
        data: [averageResolutionTime],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  }

  const statusCounts = filteredComplaints.reduce((acc, complaint) => {
    acc[complaint.status] = (acc[complaint.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando datos...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard de Denuncias</h1>
      <div className="mb-6">
        <label htmlFor="period-select" className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar período:
        </label>
        <select
          id="period-select"
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="all">Todo</option>
          <option value="today">Hoy</option>
          <option value="week">Última semana</option>
          <option value="month">Último mes</option>
          <option value="3months">Últimos 3 meses</option>
          <option value="6months">Últimos 6 meses</option>
          <option value="9months">Últimos 9 meses</option>
          <option value="year">Último año</option>
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Denuncias recibidas por mes</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={complaintsData} options={{ responsive: true, maintainAspectRatio: false }} className="h-64" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Estado de las denuncias</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={statusData} options={{ responsive: true, maintainAspectRatio: false }} className="h-64" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tiempo promedio de resolución</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={resolutionTimeData} options={{ responsive: true, maintainAspectRatio: false, indexAxis: 'y' }} className="h-64" />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>KPIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-600">Total de denuncias</h3>
                <p className="text-3xl font-bold text-teal-600">{filteredComplaints.length}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-600">Denuncias abiertas</h3>
                <p className="text-3xl font-bold text-pink-400">{filteredComplaints.filter(c => c.status === 'open').length}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-600">Tiempo promedio de resolución</h3>
                <p className="text-3xl font-bold text-teal-600">{averageResolutionTime.toFixed(1)} días</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}