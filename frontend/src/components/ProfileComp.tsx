import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  userEmail: string;
  userName: string;
  followers: number;
  following: number;
  about:string;
}

export const ProfileComp: React.FC<ProfileProps> = ({
  userEmail,
  userName,
  followers,
  following,
  about,
}) => {

  const [cabout, setcAbout] = useState('');
  const navigate = useNavigate()

  return (
    <div >
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="w-screen h-screen p-6 rounded-lg shadow-md bg-white">
          <div className="flex items-center">
            <div className="ml-4">
              <h1 className="text-2xl font-semibold">{userName}</h1>
              <p className="text-gray-600">{userEmail}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between ml-4">
              <div className="flex">
                <div className="mr-2">
                  <span className="font-semibold">{followers}</span>{' '}
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      navigate(`/profile/followers`);
                    }}
                  >
                    Followers
                  </button>
                </div>
          <div>
            <span className="font-semibold">{following}</span>{' '}
            <button
              className="text-blue-500"
              onClick={() => {
                navigate(`/profile/following`);
              }}
            >
              Following
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6">
      <h2 className="text-lg font-semibold">About</h2>
      <TextEditor value={about} onChange={(e) => setcAbout(e.target.value)} />
    </div>
    <button
      onClick={async () => {
        const token = localStorage.getItem('token');
        await axios.put(
          `${BACKEND_URL}/api/v1/user/profile`,
          {
            about: cabout,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        navigate(`/blogs`);
      }}
      type="submit"
      className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
    >
      Update About
    </button>
  </div>
</div>

    </div>  );
};


function TextEditor({ value, onChange }: { value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
      <div className="mt-2">
          <div className="w-full mb-4 ">
              <div className="flex items-center justify-between border">
                  <div className="my-2 bg-white rounded-b-lg w-full">
                      <label className="sr-only">Publish post</label>
                      <textarea
                          value={value} // Set value attribute to populate textarea with fetched content
                          onChange={onChange}
                          id="editor"
                          rows={8}
                          className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                          placeholder="Write a about section..."
                          required
                      />
                  </div>
              </div>
          </div>
      </div>

  )
}