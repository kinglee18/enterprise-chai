'use client';
import Navbar from "../../components/navbar";


export default function Contact() {
    const createAccount = async (formData: FormData) => {

        try {

            const response = await fetch('/api/contact', {
                method: 'post',
                body: formData,
            });

            if (!response.ok) {
                console.log("falling over")
                alert('Error, please try resubmitting the form')
            }
            const responseData = await response.json();
            console.log(responseData['message'])

            alert('Message successfully sent');
        } catch (err) {
            console.error(err);
            alert("Error, please try resubmitting the form");
        }
    };

    return (
        <main className={'xl:px-36 lg:px-24'}>
            <Navbar />
            <div className="flex py-12 items-stretch gap-x-64 ">
                <div className="self-start">
                    <h2>Get in touch</h2>
                    <p className="w-full md:w-[259px]">
                        Have a question, suggestion,
                        or just want to share some positivity?
                        We&apos;d love to hear from you!
                    </p>
                </div>
                <div className=" ">
                    <form action={createAccount} className="w-[592px] h-[502px]  flex-col">
                        <label className="w-4/6 h-20">
                            <span className="text-gray-700">email*</span>
                            <input
                                type="email"
                                className="form-input mt-1 block w-full rounded-md border border-gray-500 p-4"
                                required
                                name={'email'}
                                placeholder="email"
                            />
                        </label>
                        <br />
                        <label className="block">
                            <span className="text-gray-700">first name*</span>
                            <input
                                type="text"
                                className="form-input mt-1 block w-full border border-gray-500"
                                required
                                name={'name'}
                                placeholder="first name"
                            />
                        </label>
                        <br />
                        <label className="block">
                            <span className="text-gray-700">last name*</span>
                            <input
                                type="text"
                                className="form-input mt-1 block w-full border border-gray-500"
                                required
                                name={'title'}
                                placeholder="last name"
                            />
                        </label>
                        <br />
                        <label className="block">
                            <span className="text-gray-700">message</span>
                            <textarea
                                className="form-textarea mt-1 block w-full border border-gray-500"
                                rows={3}
                                name={'message'}
                                placeholder="message"
                            />
                        </label>
                        <br />
                        <div className="privacity-info flex flex-col gap-4">
                            <p className="h-20">
                        EnterpiseCHAI is committed to protecting and respecting your privacy, and we’ll only use your personal information to administer your account and to provide the products and services you requested from us. From time to time, we would like to contact you about our products and services, as well as other content that may be of interest to you. If you consent to us contacting you for this purpose, please tick below to say how you would like us to contact you:
                            </p>
                            <div className="flex gap-2">
                                <input type="checkbox" className="border border-gray-500"/> I agree to receive other communications from EnterpriseCHAI.
                            </div>
                            <p className="h-20">
                        You can unsubscribe from these communications at any time. For more information on how to unsubscribe, our privacy practices, and how we are committed to protecting and respecting your privacy, please review our Privacy Policy. By clicking submit below, you consent to allow EnterpriseCHAI to store and process the personal information submitted above to provide you the content requested.
                            </p>
                        </div>
                        <button type="submit" className="btn-primary">
                    Submit
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
