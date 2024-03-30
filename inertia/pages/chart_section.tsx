import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  registerables,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Habit } from '~/types/habit'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ...registerables
)
interface ChartSectionProps {
  data: Habit[]
}

export default function ChartSection({ data }: ChartSectionProps) {
  const groupedHabits: { [key: string]: Habit[] } = data.reduce(
    (acc: { [key: string]: Habit[] }, habit) => {
      const categoryId = habit.customCategoryId || habit.defaultCategoryId
      if (!acc[categoryId]) {
        acc[categoryId] = [habit]
      } else {
        acc[categoryId].push(habit)
      }
      return acc
    },
    {}
  )

  // Préparation des données pour les graphiques
  const chartDatas = Object.entries(groupedHabits).map(([, habits]) => {
    const category = habits[0].customCategory || habits[0].defaultCategory
    const categoryName = category ? category.name : 'Unknown'
    return {
      labels: habits.map((habit) => {
        const date = habit.date.toString().split('T')[0]
        const day = date.substring(8, 10)
        const month = date.substring(5, 7)
        return `${day}/${month}`
      }),
      datasets: [
        {
          label: categoryName,
          data: habits.map((habit) => habit.value),
          borderColor: category.color,
          borderWidth: 2,
          fill: true,
          backgroundColor: `${category.color}50`,
          tension: 0.3,
          pointBackgroundColor: '#FFF',
          pointBorderWidth: 2,
          pointRadius: 5,
        },
      ],
    }
  })

  return (
    <div>
      {/* Affichage des graphiques */}
      <div className="">
        {chartDatas.length > 0 && (
          <div>
            <h2 className="mb-5">Stats</h2>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
              {chartDatas.map((chartData, index) => (
                <div key={index} className="">
                  {chartData.datasets[0].data.length >= 2 && (
                    <div className="bg-white rounded-xl p-5 shadow-xl">
                      <h3 className="mb-5">{chartData.datasets[0].label} </h3>
                      <Line
                        data={chartData}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                          scales: {
                            x: {
                              grid: {
                                display: false,
                              },
                            },
                            y: {
                              min: 0,
                              max: Math.max(...chartData.datasets[0].data) + 2,
                              ticks: {
                                stepSize: Math.max(...chartData.datasets[0].data) > 5 ? 2 : 1,
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
