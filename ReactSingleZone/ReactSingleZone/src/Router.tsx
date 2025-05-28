import { createBrowserRouter } from 'react-router';

import PersonalArea from './components/PersonalArea';

import ProfileUpdate from './components/ProfileUpdate';

import Playlists from './components/PersonalPlayList';
import PlaylistSongs from './components/PlaylistSongsProps';

import HomePage from './components/HomePage';
import PersonalAreaMenu from './components/PersonalAreaMenu';
import Layout from './components/Layout';
import LoginForm from './components/Login';
import FileUploader from './components/file-uploader/FileUploader';
// import SongPlayer from './components/song-player/SongPlayer';
import RegisterForm from './components/register-form/RegisterForm';
import SongPlayer from './components/SongPlayer';


export const Router = createBrowserRouter([
  {
    path: '/',element: <>
      {/* <Header />
      <CategoryList />
      <SearchBar />
      <SongsList /> */}
      <Layout/>
       
    </>,
    children:[ 

  
      
      {path: '//HomePage',element: <HomePage/>},
     

      { index: true, element:  <HomePage/>},
      {path: '//:id',element: <SongPlayer/>},
      
        




    ]
  },
  
 
  { path:"/register", element:<RegisterForm />},
  { path:"/login", element:<LoginForm />},

  {path: '/personal-area',element: <><PersonalArea /></>,
    children: [

      { path: 'menu', element:  <PersonalAreaMenu />},
      { index: true, element:  <PersonalAreaMenu />},
      { path: 'playlist/:id', element: <PlaylistSongs /> },
      { path: 'playlists/:userId', element: <Playlists /> },
      { path: 'profile-update', element: <ProfileUpdate /> },
      { path: 'upload-song', element: <FileUploader /> },
    ],
  },
]);
