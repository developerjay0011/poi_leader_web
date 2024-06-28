'use client'
import { FC, useState } from 'react'
import { LeaderPersonalInfo } from '@/components/otherleader/LeaderPersonalInfo'
import { GeneralInfoBox } from '@/components/otherleader/GeneralInfoBox'
import { cusSelector } from '@/redux_store/cusHooks'
import { CommonBox } from '@/utils/CommonBox'
import { AgendaDevelopmentsPost } from './feed/LeaderAgenda'
import { OtherTimeLinePage } from './about/TimeLinePage'
import { PeoplesComponentWrapper } from '@/utils/PeoplesComponentWrapper'
import { Following } from '@/components/peoples/Following'
import { Follower } from '@/components/peoples/Follower'

interface LeaderProfilePageProps {
  type: string;
  leader_id: string;
  following: any;
  followers: any;
  stories: any;
  posts: any;
}

export const Leaderdata: FC<LeaderProfilePageProps> = ({ type, leader_id, stories, followers, following, posts }) => {
  const { leaderData } = cusSelector((st) => st.auth);
  const [searchString, setSearchString] = useState('')
  const changeSearchString = (val: string) => setSearchString(val)
  return (
    <div className='flex gap-5 w-full flex-col'>
      {type == "about" ?
        <div className='flex gap-5 w-full max-[900px]:flex-col'>
          <div className='w-[40%] max-[1500px]:w-[45%] max-[1250px]:w-[45%] max-[1130px]:w-[40%] max-[900px]:w-full'>
            <LeaderPersonalInfo />
          </div>
          <div className='flex-1 flex flex-col gap-5'>
            <GeneralInfoBox />
          </div>
        </div>
        : type == "agenda" ?
          <div className='flex gap-5 w-full max-[900px]:flex-col'>
            {leaderData?.agendas?.length > 0 &&
              <div className='flex-1 flex flex-col gap-5'>
                <CommonBox title='Agenda'>
                  <ul className='grid min-[1160px]:grid-cols-2 max-[670px]:grid-cols-1 gap-5 py-5'>
                    {leaderData?.agendas?.map((el: any, index: any) =>
                      <AgendaDevelopmentsPost
                        {...el}
                        index={index}
                        type={el.type as any}
                        allData={el}
                        post={el.post as any}
                        userdetails={leaderData}
                      />
                    )}
                  </ul>
                </CommonBox>
              </div>
            }
          </div>
          : type == "developments" ?
            <div className='flex gap-5 w-full max-[900px]:flex-col'>
              {leaderData?.developments?.length > 0 &&
                <div className='flex-1 flex flex-col gap-5'>
                  <CommonBox title='Developments'>
                    <ul className='grid min-[1160px]:grid-cols-2 max-[670px]:grid-cols-1 gap-5 py-5'>
                      {leaderData?.developments?.map((el: any, index: any) =>
                        <AgendaDevelopmentsPost
                          {...el}
                          index={index}
                          type={el.type as any}
                          allData={el}
                          userdetails={leaderData}
                          post={el.post as any}
                          title={el.development_title}
                        />
                      )}
                    </ul>
                  </CommonBox>
                </div>
              }
            </div> : type == "following" ?
              <PeoplesComponentWrapper
                heading='following'
                searchStr={searchString}
                rightButton={null}
                setSearchStr={changeSearchString}>
                <ul className='grid grid-cols-3 max-[1160px]:grid-cols-2 max-[670px]:grid-cols-1 gap-5'>
                  {following?.length > 0 && following?.map((item: any, index: number) => {
                    return (
                      <Following other={true} item={item} key={index} name={item.name} displayImg={item.image} />
                    )
                  })}
                </ul>
              </PeoplesComponentWrapper>
              : type == "followers" ?
                <PeoplesComponentWrapper
                  heading='followers'
                  searchStr={searchString}
                  setSearchStr={changeSearchString}
                  rightButton={null}
                >
                  <ul className='grid grid-cols-3 max-[1160px]:grid-cols-2 max-[670px]:grid-cols-1 gap-5'>
                    {followers.length > 0 && followers.map((item: any, index: number) => (
                      <Follower item={item} key={index} name={item.name} displayImg={item.image} />
                    ))}
                  </ul>
                </PeoplesComponentWrapper>
                :
                <OtherTimeLinePage
                  leader_id={leader_id}
                  stories={stories}
                  posts={posts}
                />
      }
    </div>
  )
}

export default Leaderdata;