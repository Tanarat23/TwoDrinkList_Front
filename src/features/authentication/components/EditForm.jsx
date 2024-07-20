export default function EditForm() {
  return (
    <>
      <h1 className=' text-[#B3B3B3] text-3xl text-center'>CREATE EVENT</h1>
      <br />
      <form onSubmit={handleSubmitForm}>
        <div className='flex flex-col items-center '>
          <br />
          <div className='w-full text-[#B3B3B3]'>
            <select
              name='locationId'
              value={input.locationId}
              onChange={handleChangeInput}
              className={`w-full rounded-full focus:outline-none focus:ring-2 bg-[#253239] border  px-2 py-2 border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]
              ${
                inputError.locationId
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]'
              }
              `}
            >
              <option>Location</option>
              {location.map((place) => (
                <option key={place.id} value={`${place.id}`}>
                  {place.name}
                </option>
              ))}
            </select>
            {inputError.locationId ? (
              <small className='text-red-500'>{inputError.locationId}</small>
            ) : null}
          </div>
          <br />
          <div className='w-full text-[#B3B3B3]'>
            <Input
              type='datetime-local'
              placeholder='Date'
              name='dueDate'
              value={input.dueDate}
              onChange={handleChangeInput}
              error={inputError.dueDate}
            />
          </div>
          <br />
          <div className='w-full'>
            <Input
              placeholder='Description'
              name='description'
              value={input.description}
              onChange={handleChangeInput}
              error={inputError.description}
            />
          </div>
          <br />
          <div className='flex gap-3 w-full text-[#B3B3B3]'>
            <Input
              placeholder={'Join limit'}
              name={'joinLimit'}
              value={input.joinLimit}
              onChange={handleChangeInput}
              error={inputError.joinLimit}
            />
            <select
              name='categoryId'
              onChange={handleChangeInput}
              className={`w-full rounded-full focus:outline-none focus:ring-2 bg-[#253239] border  px-2 py-2 border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]
              ${
                inputError.categoryId
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-gray-300 focus:border-[#1CD760] focus:ring-[#1CD760]'
              }
              `}
            >
              <option>What you drink</option>
              {category.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
            {inputError.categoryId ? (
              <small className='text-red-500'>{inputError.categoryId}</small>
            ) : null}
          </div>
          <br />
          <div className='w-full'>
            <Button>CREATE</Button>
            <Link to='/' className='text-[#B3B3B3] underline'>
              Back to homepage
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
