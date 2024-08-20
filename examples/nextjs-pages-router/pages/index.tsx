import { useState } from 'react';
import { track, identify } from "@multibase/js";

export default function Home() {
    const [address, setAddress] = useState<string>("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")

    function identifyUser() {
        identify(address)
    }

    function onClickButton() {
        track("Button Clicked")
    }

    return (
        <div className='p-4 max-w-2xl mx-auto'>
            <h1 className='text-3xl font-bold'>Multibase NextJS App Router Demo</h1>

            <h2 className='text-2xl font-bold mt-8'>💻 Track an event</h2>
            <button className='border border-gray-400 px-4 py-2 rounded bg-gray-100 mt-4' onClick={onClickButton}>Click me</button>

            <h2 className='text-2xl font-bold mt-8'>👥 Identify a user</h2>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='border border-gray-400 px-2 py-2 rounded mt-4 mr-2' />
            <button className='border border-gray-400 px-4 py-2 rounded bg-gray-100 mt-4' onClick={identifyUser}>Submit</button>
        </div>
    );
}
