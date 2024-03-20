import React from "react";
import { useState } from "react";

function Codearea() {
  const [data, setdata] = useState({username:"",language:"C++",stdin:"",source_code:""});
    const adddata= async(username,language,stdin,source_code)=>{
        //API call
        const response = await fetch("http://localhost:5000/snippets", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username,language,stdin,source_code})
        });
        const prof= await response.json();
        // console.log(prof);
      }
    const handleonchange=(e)=>{ 
        setdata({...data,[e.target.name]:e.target.value})
    }
    const handleonclick=(e)=>{
        e.preventDefault();
        adddata(data.username,data.language,data.stdin,data.source_code)
        setdata({username:"",language:"C++",stdin:"",source_code:""})
    }
  return (
    <div className="container mx-8 my-8">
      <form>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={handleonchange}
                    required value={data.username}
                    placeholder="write your username"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="language"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Language
              </label>
              <div className="mt-2">
                <select
                  id="language"
                  name="language"
                  autoComplete="language-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleonchange}
                >
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="Javascript">Javascript</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="stdin"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stdin
              </label>
              <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="stdin"
                  id="stdin"
                  autoComplete="given-name"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="provide the stdin"
                  onChange={handleonchange}
                  required value={data.stdin}
                />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
                  Code
              </label>
              <div className="mt-2">
                  <textarea
                      id="source_code"
                      name="source_code"
                      rows="4"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      onChange={handleonchange}
                      value={data.source_code}
                      placeholder="Write your code here"
                  ></textarea>
              </div>
            </div>
            </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleonclick}
            >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Codearea;
