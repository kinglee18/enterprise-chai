import Header from "@/components/Header";
import Image from "next/image";

export default function Support() {
  return (
    <main className="w-full px-9">
        <Header title={'Support'} subtitle={''}/>
        <section className="flex flex-col bg-darkViolet700">
          <div className="flex  items-center justify-between w-full px-8 py-12">
            <p className="w-1/2 text-3xl font-bold">How can we help?</p>
            <div className='relative w-1/2'>
              <Image
              src={'/search.svg'}
              alt='search'
              width={16}
              height={16}
              className='absolute left-3 top-1/2 transform -translate-y-1/2'
              />
              <input type="search" placeholder='Type here...' className='search-large-input pl-8  pr-4 mr-3.5'/>
            </div>
          </div>
          <div className="w-full items-center flex justify-center align-middle text-center gap-6 pb-12">
            <button className="btn-support">Getting started</button>
            <button className="btn-support">Account management</button>
            <button className="btn-support">Upgrade subscription</button>
          </div>
        </section>
        <section className="flex px-9 py-6 justify-between">
          <div className="w-2/5">
            <p className="text-2xl font-bold h-16">Technical Issue</p>
            <p className="text-sm">Having trouble?  No worries, we&apos;re here to help!  Fill out the form below and include a screenshot if possible, and we&apos;ll get you back on track in no time!&rsquo;</p>
          </div>
          <div>
          <form className="w-[592px] h-[419px]  flex-col">
            <label className="block">
            <span className="text-gray-700">email*</span>
            <input
            type="text"
            className="modal-input mt-1 block w-full"
            required
            name={'email'}
            placeholder=" account email"
            />
            </label>
            <br />
            <label className="block">
            <span className="text-gray-700">subject*</span>
            <input
            type="text"
            className="modal-input mt-1 block w-full"
            required
            name={'subject'}
            placeholder="subject"
            />
            </label>
            <br />
            <label className="block">
            <span className="text-gray-700">description*</span>
            <textarea
              className="modal-textarea mt-1 text-xs block w-full"
              rows={5}
              name={'description'}
              placeholder="Please include details of your request (steps to reproduce, device/environment) so 
              we can provide the most complete and accurate support. Screenshots are highly encouraged."
            />
            </label>
            <br />
            <label className="block">
            <span className="text-gray-700">attachment (optional)</span>
            <input
            type="text"
            className="modal-input mt-1 block w-full"
            required
            name={'file'}
            placeholder="add file"
            />
            </label>
            <br />
            <div className='flex items-center'>
              <button type="submit" className="btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
