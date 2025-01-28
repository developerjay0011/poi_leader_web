'use client'
import { FC, useEffect } from 'react'
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form'
import {
  LEADER_IDS,
  UserDetails,
  ParliamentaryConstituencyDetails,
  PartyDetails,
  StateDetails,
  AssemblyConstituencyDetails,
  DesignationDetails,
} from '@/utils/typesUtils'
import { YesNoField } from '@/components/YesNoField'
import { Input } from '@/components/Input'
import { cusSelector } from '@/redux_store/cusHooks'
import moment from 'moment'


interface LeaderPoliticalInfoProps {
  errors: FieldErrors<UserDetails>
  watch: UseFormWatch<UserDetails>
  register: UseFormRegister<UserDetails>
  setValue: UseFormSetValue<UserDetails>
  control: Control<UserDetails>
  designations: DesignationDetails[]
  states: StateDetails[]
  parliamentaryConstituency: ParliamentaryConstituencyDetails[]
  assemblyConstituency: AssemblyConstituencyDetails[]
  parties: PartyDetails[]
  reset: UseFormReset<UserDetails>
  ministries: PartyDetails[]
}

export const LeaderPoliticalInfo: FC<LeaderPoliticalInfoProps> = ({
  control,
  errors,
  register,
  setValue,
  watch,
  assemblyConstituency,
  designations,
  parliamentaryConstituency,
  states,
  parties,
  reset,
  ministries
}) => {
  const { leaderProfile } = cusSelector((state) => state.leader);
  const { leaderOptions } = cusSelector((state) => state.common);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ministries',
  })
  const designation_id = watch('designation_id')
  const parliamentHouse = watch('parliament_house')
  const stateid = watch('stateid')
  const rajyaSabhaNominated = watch('rajyaSabhaNominated')
  const { political_info } = leaderProfile;
  const hasMinistry = watch('hasMinistry')

  useEffect(() => {
    if (political_info) {
      reset({
        ...political_info,
        joined_date: moment(political_info?.joined_date).format("YYYY-MM-DD"),
        hasMinistry: political_info?.is_hold_ministry ? 'yes' : null,
        rajyaSabhaNominated: political_info?.is_nominated ? 'yes' : null,
      })
    }
    if (designation_id) {
      if (((designation_id === LEADER_IDS.mpID) || (designation_id === LEADER_IDS.mlaID)) && hasMinistry == "yes") {
      } else {
        if (political_info?.is_hold_ministry == false) {
          setValue("hasMinistry", 'no')
        }
      }
    }
    if (hasMinistry == 'yes' && fields?.length == 0 && ((designation_id === LEADER_IDS.mpID) || (designation_id === LEADER_IDS.mlaID))) {
      append({ ministryid: '', ministrytype: '' })
    }
  }, [political_info, leaderOptions?.is_get, reset]);

  return (
    <div className='grid grid-cols-2 gap-4 col-span-full w-full'>
      <Input
        register={register}
        errors={errors}
        title='Designation'
        type='select'
        id='designation_id'
        required
        validations={{
          required: 'Designation is required',
          onChange() {
            setValue("parliament_house", '')
            setValue("is_nominated", false)
            setValue("stateid", '')
            setValue("political_party_id", '')
            setValue("is_hold_ministry", false)
            setValue("ministries", [])
            setValue("assemblyid", '')
            setValue("parliamentaryid", '')
            setValue("hasMinistry", '')
          },
        }}
        selectField={{
          title: 'select designation',
          options: designations.map((el) => ({
            id: el.id,
            value: el.designation,
          })),
        }}
      />


      {/* Showing parliament house if designation is MP */}
      {designation_id && designation_id === LEADER_IDS.mpID && (
        <>
          <Input
            errors={errors}
            register={register}
            required
            validations={{
              required: 'Parliament House is required',
              onChange(e) {
                if (e == 'rajya sabha') {
                  setValue("is_nominated", false)
                }
              },
            }}
            id='parliament_house'
            title='Parliament House'
            type='select'
            selectField={{
              title: 'select parliament house',
              options: [
                {
                  id: LEADER_IDS.lokSabhaID,
                  value: 'lok sabha',
                },
                {
                  id: LEADER_IDS.rajyaSabhaID,
                  value: 'rajya sabha',
                },
              ],
            }}
          />

          {(parliamentHouse && parliamentHouse === LEADER_IDS.rajyaSabhaID) && (
            <>
              {/* ASKING IF User is nominated or not? */}
              <YesNoField
                errors={errors}
                id='rajyaSabhaNominated'
                question='Are you Nominated'
                register={register}
                required
                validations={{ required: 'Question is necessary' }}
              />
            </>
          )}
          {((parliamentHouse && parliamentHouse === LEADER_IDS.lokSabhaID) || (parliamentHouse == LEADER_IDS.rajyaSabhaID && rajyaSabhaNominated == 'no')) && (
            <Input
              errors={errors}
              required
              register={register}
              validations={{ required: 'State is required' }}
              id='stateid'
              title='State'
              type='select'
              selectField={{
                title: 'select state',
                options: states.map((el) => ({
                  id: el.id,
                  value: el.state,
                })),
              }}
            />
          )}

          {(stateid && parliamentHouse && parliamentHouse === LEADER_IDS.lokSabhaID) && (
            <Input
              errors={errors}
              required
              register={register}
              validations={{
                required: 'Parliament Constituency is required',
              }}
              id='parliamentaryid'
              title='Parliamentary Constituency'
              type='select'
              selectField={{
                title: 'select constituency',
                options: parliamentaryConstituency
                  .filter((el) => el.stateid === stateid)
                  .map((el) => ({
                    id: el.id,
                    value: el.parliamentary_name,
                  })),
              }}
            />
          )}

        </>
      )}

      <Input
        errors={errors}
        required
        register={register}
        validations={{ required: 'Joined Date is required' }}
        id='joined_date'
        title='Joined Date'
        type='date'
      />

      {designation_id && designation_id === LEADER_IDS.mlaID && (
        <>
          <Input
            errors={errors}
            required
            register={register}
            validations={{ required: 'State is required' }}
            id='stateid'
            title='State'
            type='select'
            selectField={{
              title: 'select state',
              options: states.map((el) => ({
                id: el.id,
                value: el.state,
              })),
            }}
          />
          {(stateid && designation_id === LEADER_IDS.mlaID) && (
            <Input
              errors={errors}
              register={register}
              validations={{ required: 'Assembly Constituency is required' }}
              id='assemblyid'
              title='Assembly Constituency'
              type='select'
              required
              selectField={{
                title: 'select constituency',
                // filtering assembly constituency based on mla State
                options: assemblyConstituency
                  .filter((el) => el.stateid === stateid)
                  .map((el) => ({ id: el.id, value: el.assembly_name })),
              }}
            />
          )}
        </>
      )
      }



      {designation_id && (
        <Input
          errors={errors}
          required
          register={register}
          validations={{ required: 'Political Party is required' }}
          id='political_party_id'
          title='Political Party'
          type='select'
          selectField={{
            title: 'select political party',
            options: parties.map((el) => ({
              id: el.id,
              value: el.party_name,
            })),
          }}
        />
      )}


      {designation_id && (designation_id === LEADER_IDS.mpID || designation_id === LEADER_IDS.mlaID) && (
        <YesNoField
          errors={errors}
          id='hasMinistry'
          question='Hold any ministry'
          register={register}
          required
          validations={{ required: 'Question is necessary' }}
        />
      )}

      {hasMinistry == "yes" && (
        <div className='col-span-full flex flex-col gap-4'>
          {fields.map((el, i) => (
            <div key={el.id} className='grid grid-cols-3 gap-x-4'>
              <Input
                errors={errors}
                register={register}
                required
                validations={{ required: 'Ministry Name is required' }}
                id={`ministries.${i}.ministryid` as keyof UserDetails}
                title='Ministry Name'
                type='select'
                selectField={{
                  title: 'select Ministry',
                  options: ministries?.map((el: any) => ({
                    id: el.id,
                    value: el.name,
                  })),
                }}
              />
              <Input
                errors={errors}
                register={register}
                required
                validations={{ required: 'Ministry Type is required' }}
                id={`ministries.${i}.ministrytype` as keyof UserDetails}
                title='Ministry Type'
                type='select'
                selectField={{
                  title: 'select ministry type',
                  options: [
                    { id: 'Cabinet', value: 'Cabinet' },
                    { value: 'MOS', id: 'MOS' },
                    { value: 'MOS(I/C)', id: 'MOS(I/C)' },
                  ],
                }}
              />
              {i !== 0 && (
                <button
                  type='button'
                  onClick={() => remove(i)}
                  className='outline-none justify-self-start self-center text-sm mt-5 capitalize py-2 px-4 rounded bg-rose-500 text-rose-50 hover:bg-rose-600 transition-all'>
                  remove ministry
                </button>
              )}
            </div>
          ))}

          <button
            type='button'
            onClick={() => append({ ministryid: '', ministrytype: '' })}
            className='outline-none self-start col-span-full text-sm mt-1 capitalize py-2 px-4 rounded bg-teal-500 text-teal-50 hover:bg-teal-600 transition-all'>
            add ministry
          </button>
        </div>
      )}
    </div>
  )
}
