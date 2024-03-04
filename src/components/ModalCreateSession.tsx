import React from 'react'

export default function ModalCreateSession() {
  return (
    <div className='w-[582px] h-[536px] bg-white border border-darkViolet700 py-5 px-8 rounded'>
      <p className='font-medium text-base  pb-5'>Create New Session</p>
      <form className="w-[518px] h-[496px]  flex-col">
        <label className="w-4/6 h-20">
          <span className="text-gray-700">Customer journey phase name*</span>
          <select className="  border-grayLight h-8 p-2 border rounded flex items-center modal-input ">
            <option disabled >select one from drop down</option>
          </select>
        </label>
        <br />
        <label className="block">
        <span className="text-gray-700">Customer company name*</span>
          <input
          type="text"
          className="modal-input mt-1 block w-full"
          required
          name={'name'}
          placeholder="customer company name"
          />
        </label>
        <br />
        <label className="block">
          <span className="text-gray-700">Customer point of contact name*</span>
          <input
          type="text"
          className="modal-input mt-1 block w-full"
          required
          name={'title'}
          placeholder="customer point of contact name"
          />
          </label>
          <br />
          <label className="block">
            <span className="text-gray-700">Description</span>
            <textarea
              className="modal-textarea mt-1 block w-full"
              rows={2}
              name={'message'}
              placeholder="what you would like to achieve on this call"
            />
            </label>
            <br />
            <div className='flex items-center justify-center gap-4'>
              <button type="submit" className="modal-btn">
                Launch
              </button>
              <button type="submit" className="modal-btn">
                Save for later
              </button>
            </div>
              
      </form>
    </div>
  )
}
