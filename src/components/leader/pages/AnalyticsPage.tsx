'use client'
import { FC, useMemo, useState } from 'react'
import { BsFilePdf } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { HiUserAdd } from 'react-icons/hi'
import Banner from '@/assets/statistics_banner.jpg'
import { AiFillLike } from 'react-icons/ai'
import { ShortcutsBox } from '@/components/timlineComponents/ShortcutsBox'
import { CusAreaChart } from '@/components/charts/CusAreaChart'
import { CusLineChart } from '@/components/charts/CusLineChart'
import { CusBarChart } from '@/components/charts/CusBarChart'
import CustomImage from '@/utils/CustomImage'
import { cusSelector } from '@/redux_store/cusHooks'
import { setusername } from '@/config/get-image-url'
import { TimeLineDetails } from '@/utils/typesUtils'
import moment, { Moment } from 'moment'
import { CusPieChart } from '@/components/charts/Piechart'

type Graph = 'LINE' | 'AREA' | 'PIE' | 'BAR'

type Agenda = {
    access: string
    attachments: string[]
    categoryid: string
    creation_date: Date | string
    description: string
    documents: string
    priority: string
    status: string
    title: string
    id: string
    leaderid: string
    created_by_type: string
    timeline: TimeLineDetails[]
    saved_by_type: string
    saved_by: string
};
type DevelopmentDetails = {
    access: string
    attachments: string[]
    categoryid: string
    creation_date: Date | string
    description: string
    documents: string
    priority: string
    status: string
    title: string
    id: string
    leaderid: string
    created_by_type: string
    timeline: TimeLineDetails[]
    saved_by_type: string
    saved_by: string
};
export type ChartData = {
    date: string;
    "In Progress": number;
    Completed: number;
    "Not Started Yet": number
};



const GraphType = [
    { name: 'LINE' },
    { name: 'AREA' },
    { name: 'PIE' },
    { name: 'BAR' },
]
export const AdminStatsPage: FC = () => {
    const [graphTypeVal, setGraphTypeVal] = useState<Graph>('AREA')
    const [timeFilter, setTimeFilter] = useState<string>('7') // Default: Last 7 days
    const [statsFilter, setStatsFilter] = useState<string>('agenda') // Default: Agenda

    const { leaderProfile, followers, following } = cusSelector((state) => state.leader);
    const { agendas } = cusSelector((st) => st.agenda);
    const { developments }: any = cusSelector((st) => st.development);
    const { posts } = cusSelector((state) => state.posts);
    const { groups } = cusSelector((state) => state.group);
    const { ticket } = cusSelector((state) => state.ticket);


    const getTotalLikes = (post: any) => {
        let totalLikes = 0

        for (let index = 0; index < post?.length; index++) {
            const element = post[index];
            totalLikes = totalLikes + (element?.likes?.length || 0)
        }
        return totalLikes || 0;
    };

    const totalLikes = getTotalLikes(posts);

    function generateChartData() {
        const dataList: Agenda[] = statsFilter === 'agenda' ? agendas : developments;
        const now = moment(); // Current date

        let startDate: moment.Moment;
        if (timeFilter === '7') {
            // Last 7 days
            startDate = now.clone().subtract(7, 'days').startOf('day');
        } else if (timeFilter === '30') {
            // Last 30 days
            startDate = now.clone().subtract(30, 'days').startOf('day');
        } else if (timeFilter === '90') {
            // Last 90 days
            startDate = now.clone().subtract(90, 'days').startOf('day');
        } else if (timeFilter === 'all') {
            // All time, find the smallest date in the data
            const earliestDate: any = dataList?.reduce((minDate, item) => {
                const itemDate = moment(item.creation_date);
                return itemDate.isBefore(minDate) ? itemDate : minDate;
            }, now);

            startDate = earliestDate.startOf('day');
        } else {
            // If no valid timeFilter, default to last 7 days
            startDate = now.clone().subtract(7, 'days').startOf('day');
        }

        // End date is today at the end of the day
        const endDate = now.endOf('day');

        // Calculate the number of days
        const totalDuration = endDate.diff(startDate, 'days');

        // Generate dates for the chart
        const dateRanges: string[] = [];
        for (let i = 0; i <= totalDuration; i++) {
            const currentDate = startDate.clone().add(i, 'days');
            dateRanges.push(currentDate.format('YYYY-MM-DD'));
        }

        // Filter and group data by date ranges
        const filteredData = dataList.filter((item) => {
            const itemDate = moment(item.creation_date);
            return itemDate.isBetween(startDate, endDate, 'days', '[]'); // Include start and end dates
        });

        // Group data by date ranges
        const groupedData: ChartData[] = dateRanges.map((date) => {
            const currentDate = moment(date);

            const itemsInRange = filteredData.filter((item) => {
                const itemDate = moment(item.creation_date);
                return itemDate.isSame(currentDate, 'day'); // Only items for the exact day
            });

            return {
                "date": currentDate.format('YYYY-MM-DD'),
                "In Progress": itemsInRange.filter((a) => a.status === "in progress").length,
                "Completed": itemsInRange.filter((a) => a.status === "completed").length,
                "Not Started Yet": itemsInRange.filter((a) => a.status === "not started yet").length,
            };
        });

        return groupedData; // Return grouped data without filtering out any date
    }

    const chartData = useMemo(() => generateChartData(), [timeFilter, statsFilter, agendas, developments]);


    return (
        <>
            {/* BANNER */}
            <div className='w-full mb-10 py-28 relative text-sky-950'>
                <CustomImage
                    src={Banner}
                    alt='stats banner'
                    className='absolute top-0 left-0 w-full h-full object-top object-cover opacity-50 z-[5]'
                />

                <div className='flex flex-col relative items-center z-[10] w-full gap-3'>
                    <h2 className='text-5xl fo  nt-semibold'>{setusername(leaderProfile)} Statistics</h2>
                    <p>View all your account activity here</p>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <section className='w-[85%] max-[1650px]:w-[90%] max-[1370px]:w-[95%] max-[1000px]:w-[94%] max-[1000px]:my-6 max-[400px]:w-[98%] m-auto flex flex-col gap-5'>
                {/* Filter */}
                {/* <div className='flex items-center gap-2'>
                    <p className='capitalize'>select timeline</p>
                    <select
                        id='filter'
                        className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer capitalize'>
                        <option value='5'>last 7 days</option>
                        <option value='10'>last month</option>
                        <option value='25'>3 months</option>
                        <option value='25'>All</option>
                    </select>
                </div> */}

                {/* Over Views */}
                <section className='border rounded-md bg-white py-5 px-10 justify-between flex items-center'>
                    <article className='flex flex-col gap-2 items-center'>
                        <AiFillLike className='text-5xl' />

                        <p>{totalLikes} likes</p>
                    </article>

                    <article className='flex flex-col gap-2 items-center'>
                        <BsFilePdf className='text-5xl' />

                        <div className='flex flex-col capitalize'>{ticket?.length || 0} new letters</div>
                    </article>
                </section>

                {/* 3 Column stats */}
                <div className='grid grid-cols-3 gap-5'>
                    <article className='border rounded-md bg-white p-5 flex items-center gap-6'>
                        <FaUsers className='text-5xl' />

                        <div className='flex flex-col capitalize'>
                            <h6 className='text-xl font-medium'>{followers?.length | 0}</h6>
                            <p>followers</p>
                        </div>
                    </article>

                    <article className='border rounded-md bg-white p-5 flex items-center gap-6'>
                        <HiUserAdd className='text-5xl' />

                        <div className='flex flex-col capitalize'>
                            <h6 className='text-xl font-medium'>{groups?.length | 0}</h6>
                            <p>Networks</p>
                        </div>
                    </article>

                    <article className='border rounded-md bg-white p-5 flex items-center gap-6'>
                        <HiUserAdd className='text-5xl' />

                        <div className='flex flex-col capitalize'>
                            <h6 className='text-xl font-medium'>{following?.length | 0}</h6>
                            <p>Followings</p>
                        </div>
                    </article>
                </div>

                {/* MAIN Content including shortcuts / GRAPHS */}
                <div className='max-[1200px]:w-[100%] flex gap-5 relative mb-5 max-[1200px]:flex max-[1200px]:flex-col '>
                    {/* SHORTCUTS */}
                    <div className='top-0 left-0 self-start flex flex-col gap-5'>
                        <div className='flex flex-col capitalize'>
                            <label htmlFor='filter-1' className='flex flex-col gap-2'>
                                <span className='font-medium text-base'>
                                    Showing Statics of
                                </span>
                                <select
                                    id='filter-1'
                                    value={statsFilter}
                                    onChange={(e) => setStatsFilter(e.target.value)}
                                    className='py-2 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer capitalize'>
                                    <option value='agenda'>agenda</option>
                                    <option value='development'>development</option>
                                </select>
                            </label>
                        </div>

                        <div className="max-[1200px]:hidden">
                            <ShortcutsBox />
                        </div>
                    </div>

                    {/* GRAPHS BOX */}
                    <section className='max-[1200px]:w-[100%] border rounded-md flex-1 p-5 self-start bg-white'>
                        <h2 className='text-3xl font-semibold py-5 mb-5 ml-5 capitalize'>{statsFilter} Stats</h2>

                        {/* Filters */}
                        <div className='flex gap-3 w-full justify-end'>
                            <label htmlFor='filter-1' className='flex flex-col'>
                                <span className='font-medium text-base'> Filter by time </span>
                                <select
                                    value={timeFilter}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    id='filter-1'
                                    className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer capitalize'>
                                    <option value='7'>last 7 days</option>
                                    <option value='30'>last month</option>
                                    <option value='90'>3 months</option>
                                    <option value='all'>All</option>
                                </select>
                            </label>

                            <label htmlFor='graphFilter' className='flex flex-col'>
                                <span className='font-medium text-base'>Select Graph Type</span>
                                <select
                                    id='graphFilter'
                                    value={graphTypeVal}
                                    onChange={(e) => {

                                        setGraphTypeVal(e.target.value as Graph)
                                    }}
                                    className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer capitalize'>
                                    {GraphType.map((el) => (
                                        <option key={el.name} value={el.name}>
                                            {el.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        {/* GRAPHS */}
                        {graphTypeVal && (
                            <div className='mt-10'>
                                <div className='m-auto  aspect-square w-full' style={{ maxHeight: '70vh' }}>
                                    {graphTypeVal === 'AREA' && <CusAreaChart data={chartData} />}
                                    {graphTypeVal === 'LINE' && <CusLineChart data={chartData} />}
                                    {graphTypeVal === 'PIE' && <CusPieChart data={chartData} />}
                                    {graphTypeVal === 'BAR' && <CusBarChart data={chartData} />}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </section>
        </>
    )
}
